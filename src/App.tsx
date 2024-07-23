import {useState} from 'react';
import './App.css';
import {DATA} from 'consts'
import {TodoItem, TodoChildItem} from 'components'
import {DndChildItem} from './types'

function App() {
  const [state, setState] = useState<{
    data: typeof DATA,
    selectedTasks: Map<number, number[]>
  }>({
    data: DATA,
    selectedTasks: new Map()
  })

  const moveTasks = (fromIndex: number, toIndex: number) => {
    setState(prevState => {
      const tasks = [...prevState.data]

      const [movedItem] = tasks.splice(fromIndex, 1, tasks[toIndex])
      tasks.splice(toIndex, 1, movedItem)

      return {
        ...prevState,
        data: tasks
      }
    })
  }

  const moveSubTasks = (dndItem: DndChildItem, toIndex: number) => {
    setState(prevState => {
      return {
        ...prevState,
        data: prevState.data.map(task => {
          if (dndItem.parentID === task.id) {
            const children = [...task.children]
            const [movedItem] = children.splice(dndItem.index, 1, children[toIndex])
            children.splice(toIndex, 1, movedItem)

            return {
              ...task,
              children
            }
          }


          return task
        })
      }
    })
  }

  return (
    <div className="App">
      <button
        onClick={() => {

          setState(prevState => {
            let removedIDs: number[] = []

            const filtered = prevState.data.filter(task => {
              const remain = task.children.length !== prevState.selectedTasks.get(task.id)?.length

              if (!remain) {
                removedIDs.push(task.id)
              }

              return remain
            })

            const clone = new Map(prevState.selectedTasks)

            removedIDs.forEach(id => clone.delete(id))

            return {
              selectedTasks: clone,
              data: filtered
            }
          })
        }}
      >
        Clear Completed Tasks
      </button>
      {state.data.map((task, taskIndex) => {
        const childIDs = state.selectedTasks.get(task.id) || []

        return (
          <TodoItem
            {...task}
            index={taskIndex}
            key={task.id}
            moveItems={moveTasks}
            selected={childIDs.length === task.children.length}
          >
            {task.children.map((child, index) => (
              <TodoChildItem
                {...child}
                key={child.id}
                id={child.id}
                index={index}
                moveItems={moveSubTasks}
                parentID={task.id}
                selected={childIDs.includes(child.id)}
                onClick={() => {
                  setState(prevState => {
                    const clone = new Map(prevState.selectedTasks)
                    const children = clone.get(task.id)

                    if (!children) {
                      return {
                        ...prevState,
                        selectedTasks: clone.set(task.id, [child.id])
                      }
                    }

                    return {
                      ...prevState,
                      selectedTasks: clone.set(task.id, children.includes(child.id)
                        ? children.filter(id => id !== child.id)
                        : [...children, child.id]
                      )
                    }
                  })
                }}
              />
            ))}
          </TodoItem>
        )
      })}
    </div>
  );
}

export default App;

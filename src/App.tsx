import {useState} from 'react';
import './App.css';
import {DATA} from 'consts'
import {TodoItem, TodoChildItem} from 'components'
import {DndChildItem} from './types'

function App() {
  const [data, setData] = useState(DATA)
  const [selectedTasks, setSelected] = useState<Map<number, number[]>>(
    new Map()
  )

  const moveTasks = (fromIndex: number, toIndex: number) => {
    setData(prevState => {
      const tasks = [...prevState]

      const [movedItem] = tasks.splice(fromIndex, 1, tasks[toIndex])
      tasks.splice(toIndex, 1, movedItem)

      return tasks
    })
  }

  const moveSubTasks = (dndItem: DndChildItem, toIndex: number) => {
    setData(prevState => {
      return prevState.map(task => {
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
    })
  }

  return (
    <div className="App">
      <button
        onClick={() => {
          setData(prevState => {
            return prevState.filter(task => {
              return task.children.length !== selectedTasks.get(task.id)?.length
            })
          })
        }}
      >
        Clear Completed Tasks
      </button>
      {data.map((task, taskIndex) => {
        const childIDs = selectedTasks.get(task.id) || []

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
                  setSelected(prevState => {
                    const clone = new Map(prevState)
                    const children = clone.get(task.id)

                    if (!children) {
                      return clone.set(task.id, [child.id])
                    }

                    return clone.set(task.id, children.includes(child.id)
                      ? children.filter(id => id !== child.id)
                      : [...children, child.id]
                    )
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

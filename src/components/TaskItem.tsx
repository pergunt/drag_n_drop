import {FC, ReactNode} from 'react'
import styles from './Todo.module.css'
import classNames from 'classnames'
import {useDrag, useDrop} from 'react-dnd'
import {DRAG_TYPES} from 'consts'
import {DndChildItem, DndTask} from 'types'

interface TaskItemProps {
  id: number;
  index: number;
  title: string;
  selected: boolean;
  children: ReactNode;
  moveItems: (fromIndex: number, toIndex: number) => void;
}


const TaskItem: FC<TaskItemProps> = ({id, index, title, children, selected, moveItems}) => {
  const [{ isOver }, drop] = useDrop<DndChildItem | DndTask, any, any>(
    () => ({
      accept: [DRAG_TYPES.subTask, DRAG_TYPES.task],
      drop: (item) => {
        if (!('parentID' in item) && item.id !== id) {
          moveItems(item.index, index)
        }
      },
      collect: (monitor) => {
        const item = monitor.getItem()

        if (!item) {
          return {isOver: false}
        }

        if ('parentID' in item) {
          return {
            isOver: item?.parentID === id && monitor.isOver()
          }
        }

        return {
          isOver: item?.id !== id && monitor.isOver()
        }
      }
    }),
    []
  )

  const [, drag] = useDrag(() => ({
    type: DRAG_TYPES.task,
    item: {
      id,
      index
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))

    return (
        <div
          ref={ref => drop(drag(ref))}
          className={classNames(styles.task, {
            [styles.taskOver]: isOver
          })}
        >
          <h3 className={classNames(styles.title, {
            [styles.crossedOut]: selected
          })}>
            {title}
          </h3>
          {children}
        </div>
    )
}

export default TaskItem

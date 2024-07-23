import {FC} from 'react'
import styles from './Todo.module.css'
import classNames from 'classnames'
import {useDrag, useDrop} from 'react-dnd'
import {DRAG_TYPES} from 'consts'
import {DndChildItem} from "../types";

interface TodoChildItemProps {
  parentID: number;
  index: number;
  id: number;
  title: string;
  onClick: () => void;
  selected: boolean;
  moveItems: (dndItem: DndChildItem, toIndex: number) => void;
}

const TodoChildItem: FC<TodoChildItemProps> = ({title, id, index, onClick, selected, parentID, moveItems}) => {
  const [, drag] = useDrag(() => ({
    type: DRAG_TYPES.subTask,
    item: {
      id,
      parentID,
      index,
      title
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }), [index])

  const [{ isOver }, drop] = useDrop<DndChildItem, any, any>(
    () => ({
      accept: DRAG_TYPES.subTask,
      drop: (item) => {
        if (item.parentID === parentID) {
          moveItems(item, index)
        }
      },
      collect: (monitor) => {
        const item = monitor.getItem()

        return {
          isOver: item?.parentID === parentID && item?.id !== id && monitor.isOver()
        }
      }
    }),
    [index]
  )

    return (
      <p
        ref={ref => drop(drag(ref))}
        className={classNames(styles.taskItem, {
          [styles.crossedOut]: selected,
          [styles.childTaskOver]: isOver
        })}
        onClick={onClick}
      >
        {title}
      </p>
    )
}

export default TodoChildItem

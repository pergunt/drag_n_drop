
export interface DndTask {
  id: number;
  index: number;
}

export interface DndChildItem extends DndTask {
  parentID: number;
}


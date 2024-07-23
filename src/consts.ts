export const DRAG_TYPES = {
  task: 'task',
  subTask: 'subTask',
}

export const DATA = [
  {
    id: 1,
    title: 'Clean Bedroom',
    children: [
      {
        id: 1,
        title: 'Clean Bedroom',
      },
      {
        id: 2,
        title: 'Organize desk',
      },
      {
        id: 3,
        title: 'Wipe floors',
      },
    ]
  },
  {
    id: 2,
    title: 'Study',
    children: [
      {
        id: 4,
        title: 'Review Chemistry',
      },
      {
        id: 5,
        title: 'Do a react coding challenge',
      },
    ]
  },
  {
    id: 3,
    title: 'Build a website',
    children: [
      {
        id: 6,
        title: 'Choose tech stack',
      },
      {
        id: 7,
        title: 'Design pages',
      },
      {
        id: 8,
        title: 'Develop',
      },
      {
        id: 9,
        title: 'Publish',
      },
    ]
  }
]

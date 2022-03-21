
const gData = [
  {
    id: 1,
    text: "Resources",
    type: "group",
    startTime: new Date(2019, 0, 2, 0),
    endTime: new Date(2019, 0, 5, 0),
    children: [
      {
        id: 1,
        text: "Resources 1",
        type: "task",
        startTime: new Date(2019, 0, 2, 0),
        endTime: new Date(2019, 0, 5, 0),
        children: []
      },
      {
        id: 2,
        text: "Resources 2",
        type: "task",
        startTime: new Date(2019, 0, 2, 0),
        endTime: new Date(2019, 0, 5, 0),
        children: []
      }
    ]
  },
  {
    id: 2,
    text: "Milestones",
    type: "group",
    parent: 0,
    startTime: new Date(2019, 0, 2, 0),
    endTime: new Date(2019, 0, 5, 0)
  }
];

export default gData
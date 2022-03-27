const gData = {
  data: [
    {
      id: "0",
      pId: "",
      text: "root",
      type: "root",
      subType: "root",
      workLoad: 100,
      progress: 0,
      level: 0,
      expanded: false,
      startTime: new Date(2019, 0, 2, 0),
      endTime: new Date(2019, 0, 2, 0),
      children: [
        {
          id: "1",
          pId: "0",
          text: "Resources",
          type: "group",
          subType: "rootFolder",
          workLoad: 100,
          progress: 0,
          level: 0,
          startTime: new Date(2019, 0, 2, 0),
          endTime: new Date(2019, 0, 22, 0),
          children: [
            {
              id: "1_1",
              pId: "1",
              text: "Resources 1",
              type: "data",
              subType: "Task",
              workLoad: 100,
              progress: 0,
              level: 2,
              expanded: false,
              startTime: new Date(2019, 0, 2, 0),
              endTime: new Date(2019, 0, 22, 0),
              children: []
            },
            {
              id: "1_2",
              pId: "1",
              text: "Resources 2",
              type: "data",
              subType: "Task",
              workLoad: 100,
              progress: 0,
              level: 2,
              expanded: false,
              startTime: new Date(2019, 0, 2, 0),
              endTime: new Date(2019, 0, 22, 0),
              children: []
            }
          ]
        },
        {
          id: "2",
          pId: "0",
          text: "Milestones",
          type: "group",
          subType: "Folder",
          workLoad: 100,
          progress: 0,
          level: 1,
          expanded: false,
          startTime: new Date(2019, 0, 2, 0),
          endTime: new Date(2019, 0, 22, 0),
          children: [
            {
              id: "2_1",
              pId: "2",
              text: "Milestones 1",
              type: "data",
              subType: "Task",
              workLoad: 100,
              progress: 0,
              level: 2,
              expanded: false,
              startTime: new Date(2019, 0, 2, 0),
              endTime: new Date(2019, 0, 22, 0),
              children: []
            },
            {
              id: "2_2",
              pId: "2",
              text: "Milestones 2",
              type: "data",
              subType: "Task",
              workLoad: 100,
              progress: 0,
              level: 2,
              expanded: false,
              startTime: new Date(2019, 0, 2, 0),
              endTime: new Date(2019, 0, 22, 0),
              children: []
            },
            {
              id: "2_3",
              pId: "2",
              text: "Milestones 3",
              type: "data",
              subType: "Task",
              workLoad: 100,
              progress: 0,
              level: 2,
              expanded: false,
              startTime: new Date(2019, 0, 2, 0),
              endTime: new Date(2019, 0, 22, 0),
              children: []
            },
            {
              id: "2_4",
              pId: "2",
              text: "Milestones 4",
              type: "data",
              subType: "Task",
              workLoad: 100,
              progress: 0,
              level: 2,
              expanded: false,
              startTime: new Date(2019, 0, 2, 0),
              endTime: new Date(2019, 0, 22, 0),
              children: []
            }
          ]
        },
        {
          id: "3",
          pId: "0",
          text: "Snasker",
          type: "group",
          subType: "Folder",
          workLoad: 100,
          progress: 0,
          level: 1,
          expanded: false,
          startTime: new Date(2019, 0, 2, 0),
          endTime: new Date(2019, 0, 2, 0),
          children: []
        }
      ]
    }
  ],
  connectors: {
    ttr1: {
      from: "1_1",
      to: "1_2"
    }
  }
};

export default gData;

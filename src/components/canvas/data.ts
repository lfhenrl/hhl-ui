export function testData(hours: number) {
  // const domaine = ["nnn1", "nnnn2", "nnn3"];
  const testData = [];
  const startTime = new Date(2020, 9, 1, 12, 0, 0, 0);
  let endTime = new Date(2020, 10, 1, 0, 0, 0);
  const sTime = startTime.valueOf();
  let colTrue = false;

  for (let i = 0; i < hours; i++) {
    const newTime = sTime + 3600000 * i;
    const color = colTrue ? "red" : "lime";
    colTrue = !colTrue;
    endTime = new Date(newTime + 3600000);
    const item = {
      start: new Date(newTime),
      end: endTime,
      duration: 3600,
      color,
      name: "Henrik"
    };
    const item1 = {
      start: new Date(newTime),
      end: new Date(endTime.valueOf() - 1800000),
      duration: 1800,
      color,
      name: "Holte"
    };
    const item2 = {
      start: new Date(newTime + 1800000),
      end: new Date(endTime.valueOf() + 1800000),
      duration: 1800,
      color,
      name: "Larsen"
    };
    testData.push(item);
    testData.push(item1);
    testData.push(item2);
  }

  // const data = [];

  // testData.forEach((item) => {
  //   // console.log("klok", item.start)
  //   const nItem = {
  //     start: item.start,
  //     end: item.end,
  //     duration: item.duration,
  //     color: item.color
  //   };
  //   data.push(nItem);
  // });

  // data.sort(function (a, b) {
  //   if (a.start > b.start) {
  //     return -1;
  //   }
  //   if (b.start > a.start) {
  //     return 1;
  //   }
  //   return 0;
  // });

  const val = {
    x: {
      min: startTime.valueOf(),
      max: endTime.valueOf(),
      list: [],
      items: testData
    }
  };

  return val;
}

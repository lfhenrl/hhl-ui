export async function grouping(arr: any[], groupList: string[], expandList: string[]) {
  let result: any = [];
  const level0 = groupBy(groupList[0], arr);
  result = level1Data(level0, result, arr, groupList, expandList);
  return result;
}

function level1Data(Indata: any[], OutData: any[], orgData: any[], groupList: string[], expData: string[]) {
  const groupCount = groupList.length;

  Indata.forEach((item) => {
    OutData.push(item);
    if (expData.includes(item.id)) {
      if (1 <= groupCount) {
        level2Data(item, OutData, orgData, groupList, expData, groupCount);
      } else {
        itemData(item, OutData, orgData, groupList, 0);
      }
    }
  });
  return OutData;
}

function level2Data(item: any, OutData: any[], indData: any[], groupList: string[], expData: string[], groupCount: number) {
  const filterData = indData.filter((indItem) => indItem[groupList[0]] === item.id);
  const groupData = groupBy(groupList[1], filterData);
  groupData.forEach((it: any) => {
    it.level = 1;
    it.id = item.id + "/" + it.id;
    it.parent = it.title;
    OutData.push(it);
    if (expData.includes(it.id)) {
      if (2 <= groupCount) {
        level3Data(it, OutData, filterData, groupList, expData, groupCount);
      } else {
        itemData(it, OutData, filterData, groupList, 1);
      }
    }
  });
}

function level3Data(item: any, OutData: any[], indData: any[], groupList: string[], expData: string[], groupCount: number) {
  const filterData = indData.filter((indItem) => indItem[groupList[1]] === item.parent);
  const groupData = groupBy(groupList[2], filterData);
  item.count = filterData.length;
  groupData.forEach((it: any) => {
    it.level = 2;
    it.id = item.id + "/" + it.id;
    it.parent = it.title;
    OutData.push(it);
    if (expData.includes(it.id)) {
      if (3 === groupCount) {
        itemData(it, OutData, filterData, groupList, 2);
      }
    }
  });
}

function itemData(item: any, OutData: any[], indData: any[], groupList: string[], level: number) {
  const itemData = indData.filter((indItem) => indItem[groupList[level]] === item.parent);
  item.count = itemData.length;
  itemData.forEach((it: any) => {
    OutData.push(it);
  });
}

function groupBy(property: any, data: any) {
  if (!property) return data;
  const objArr = data.reduce((acc: any, obj: any) => {
    let key = obj[property];
    if (!acc[key]) {
      acc[key] = { id: key, count: 0, _type: "group", level: 0, title: key, parent: "root" };
    }
    acc[key].count++;

    return acc;
  }, {});
  return Object.values(objArr);
}

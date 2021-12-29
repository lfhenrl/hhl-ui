import { iDatagrid } from ".";
import { groupData } from "./groupData";
import { groupFlatData } from "./groupFlatData";

export function GridData(dg: iDatagrid) {
  let groupList: any = {};
  const _groups = dg.GroupBy
  console.log("2222222222", _groups)
  const expandList: string[] = [];

  dg.Event.on("groupExpanded", (data: any) => {
    console.log("groupExpanded", data);
    if (data.expanded) {
      expandList.push(data.id);
    } else {
      expandList.splice(expandList.indexOf(data.id), 1);
    }
    loadGroupFlatData(groupList);
    console.log("expandList", expandList);
  });
  function setData(data: any) {
    if (dg.GroupBy.length > 0) {
      loadGroupData(data);
    } else {
      loadFlatData(data);
    }
  }

  function loadFlatData(data: any) {
    dg.Event.emit("newdata", data);
  }

  function loadGroupData(data: any) {
    groupList = groupData(data, dg.GroupBy);
    loadGroupFlatData(groupList);
  }

  function loadGroupFlatData(data: any) {
    const group_flat = groupFlatData(data, expandList);
    console.log("nnnFlat", group_flat);
    dg.Event.emit("newdata", group_flat);
  }

  return {
    gridData: {
      setData,
      expandList
    }
  };
}

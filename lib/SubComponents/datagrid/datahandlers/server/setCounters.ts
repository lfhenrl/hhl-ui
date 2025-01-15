import { iDatahandler } from ".";

export async function setCounters(DH: iDatahandler) {
  const CountPara: any = {
    Select: "TOP 1 Count(*) over() AS count",
    Filter: JSON.stringify(DH.filterArray),
  };

  const { data, message, ok } = await DH.dataFetch.get("", CountPara);
  if (ok) {
    if (data.length > 0) {
      DH.rowsCountTotal.value = data[0].count;
    } else {
      DH.rowsCountTotal.value = 0;
      hhl.alert("warn", "Data", "No Date with this filter");
    }
  } else {
    hhl.alert("err", "Server Error", message);
    return;
  }
  if (DH.groupList.length > 0) {
    CountPara.GroupBy = JSON.stringify([DH.groupList[0]]);
    const count: any = await DH.dataFetch.get("", CountPara);
    DH.rowsLevel0_Count = count.data[0].count;
  }
}

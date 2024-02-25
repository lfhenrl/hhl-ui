import { iDatahandler } from ".";

export async function setCounters(DH: iDatahandler) {
  const CountPara: any = {
    Select: ["DISTINCT Count(*) OVER() AS count"],
    Filter: DH.filterArray,
  };

  const { data, message, ok } = await DH.dataFetch.post("", CountPara);
  if (ok) {
    if (data.length > 0) {
      DH.rowsCountTotal.value = data[0].count;
    } else {
      DH.rowsCountTotal.value = 0;
      window["hhl"].alert("warn", "Data", "No Date with this filter");
    }
  } else {
    window["hhl"].alert("err", "Server Error", message);
    return;
  }
  if (DH.groupList.length > 0) {
    CountPara.GroupBy = [DH.groupList[0]];
    const count: any = await DH.dataFetch.post("", CountPara);
    DH.rowsLevel0_Count = count.data[0].count;
  }
}

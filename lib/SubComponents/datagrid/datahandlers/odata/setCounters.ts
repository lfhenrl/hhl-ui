import { iDatahandler } from ".";

export async function setCounters(DH: iDatahandler) {
  const CountPara: any = {
    Select: ["DISTINCT Count(*) OVER() AS count"],
    Filter: DH.filterArray
  };

  const { data, message, ok } = await DH.dataFetch.post("", CountPara);
  if (ok) {
    DH.rowsCountTotal.value = data[0].count;
  } else {
    hhl.alert("err", "Server Error", message);
    return;
  }

  if (DH.groupList.length > 0) {
    CountPara.GroupBy = [DH.groupList[0]];
    const count: any = await DH.dataFetch.post("", CountPara);
    DH.rowsLevel0_Count = count.data[0].count;
  }
}

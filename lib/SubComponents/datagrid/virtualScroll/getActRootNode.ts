export default function getActRootNode(id: string, dataStore: any) {
  const idsRaw = id.split("_");
  const ids = idsRaw.filter((item: string) => item !== "");
  const filters = [];
  const n1 = "_" + ids[0];
  let n2 = "";
  let n3 = "";
  let n4 = "";
  let n5 = "";
  let index: any = ids[0];
  let rootRow = dataStore[n1];
  let actRow = dataStore[n1];
  if (actRow.type === "group") {
    filters.push({ field: actRow.groupField, value1: actRow.name, condition: "equal", type: "string" });
  }
  if (ids.length > 1) {
    index = ids[1];
    n2 = n1 + "_" + ids[1];
    actRow = rootRow.children[n2];
    if (actRow.type === "group") {
      filters.push({ field: actRow.groupField, value1: actRow.name, condition: "equal", type: "string" });
    }
  }
  if (ids.length > 2) {
    index = ids[2];
    n3 = n2 + "_" + ids[2];
    rootRow = actRow;
    actRow = rootRow.children[n3];
    if (actRow.type === "group") {
      filters.push({ field: actRow.groupField, value1: actRow.name, condition: "equal", type: "string" });
    }
  }
  if (ids.length > 3) {
    index = ids[3];
    n4 = n3 + "_" + ids[3];
    rootRow = actRow;
    actRow = rootRow.children[n4];
    if (actRow.type === "group") {
      filters.push({ field: actRow.groupField, value1: actRow.name, condition: "equal", type: "string" });
    }
  }
  if (ids.length > 4) {
    index = ids[4];
    n5 = n4 + "_" + ids[4];
    rootRow = actRow;
    actRow = rootRow.children[n5];
    if (actRow.type === "group") {
      filters.push({ field: actRow.groupField, value1: actRow.name, condition: "equal", type: "string" });
    }
  }
  return { rootRow, actRow, index: parseInt(index), filters };
}



export async function groupBy(property: any, data: any, level: number, _id: string) {
  if (!property) return data;
  const objArr = data.reduce((acc: any, obj: any) => {
    let key = obj[property];
    if (!acc[key]) {
      const parentArr = _id === "" ? [] : _id.split("/");
      parentArr.push(key);
      const id = parentArr.toString().replaceAll(",", "/");
      acc[key] = { id, count: 0, count_total:0, _type: "group", level: level, title: key, expanded: false };
    }
    acc[key].count++;
    acc[key].count_total++;

    return acc;
  }, {});
  return Object.values(objArr);
}

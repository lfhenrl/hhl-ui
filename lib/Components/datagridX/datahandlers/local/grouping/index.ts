export async function groupBy(property: any, data: any, level: number, _id: string) {
  if (!property) return data;
  const objArr = data.reduce((acc: any, obj: any) => {
    let key = obj[property];
    if (!acc[key]) {
      const parentArr = _id === "" ? [] : _id.split("/");
      parentArr.push(key);
      const __id = parentArr.toString().replaceAll(",", "/");
      acc[key] = {
        __id,
        __count: 0,
        __count_total: 0,
        __type: "group",
        __level: level,
        __title: key,
        __expanded: false,
        __pid: _id,
      };
    }
    acc[key].__count++;
    acc[key].__count_total++;

    return acc;
  }, {});
  return Object.values(objArr);
}

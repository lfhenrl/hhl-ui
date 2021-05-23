export function groupData(arr: any, properties: string[]) {
  properties = Array.from(properties);
  if (properties.length === 1) {
    return groupBy(arr, properties[0]);
  }
  const property = properties.shift();
  var grouped = groupBy(arr, property);
  for (let key in grouped) {
    grouped[key] = groupData(grouped[key], Array.from(properties));
  }
  return grouped;
}

function groupBy(conversions: any, property: any) {
  return conversions.reduce((acc: any, obj: any) => {
    let key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);

    return acc;
  }, {});
}

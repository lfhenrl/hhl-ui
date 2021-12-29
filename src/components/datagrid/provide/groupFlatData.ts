export function groupFlatData(groupList: any, expandList: string[]) {
  function makeGroupItem(item: any, name: string, level: number, index: number, parentIndex: number) {
    const id = `L${level}-${parentIndex > -1 ? parentIndex + "-" : ""}${index}`;
    return {
      id: id,
      type: "group",
      level,
      name,
      expanded: expandList.includes(id),
      count: Object.keys(item).length
    };
  }

  const group_flat: any = [];
  const L1_elements = Object.keys(groupList);

  L1_elements.forEach((L1: any, index: number) => {
    const L1_item = groupList[L1];
    const L1_FlatItem = makeGroupItem(L1_item, L1, 0, index, -1);
    group_flat.push(L1_FlatItem);
    if (!L1_FlatItem.expanded) return;

    if (Array.isArray(L1_item)) {
      group_flat.push.apply(group_flat, Object.values(L1_item));
    } else {
      const L2_elements = Object.keys(L1_item).sort();
      L2_elements.forEach((L2: string, L2_index: number) => {
        const L2_item = L1_item[L2];
        const L2_FlatItem = makeGroupItem(L2_item, L2, 1, L2_index, index);
        group_flat.push(L2_FlatItem);
        if (!L2_FlatItem.expanded) return;

        if (Array.isArray(L2_item)) {
          group_flat.push.apply(group_flat, Object.values(L2_item));
        } else {
          const L3_elements = Object.keys(L2_item).sort();
          L3_elements.forEach((L3: string, L3_index: number) => {
            const L3_item = L2_item[L3];
            group_flat.push(makeGroupItem(L3_item, L3, 2, L3_index, index));
          });
        }
      });
    }
  });
  return group_flat;
}

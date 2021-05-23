import { iDatagrid } from ".";
import { icolumnData } from "./Columns";

export function ColumnReorder(column: icolumnData, dg: iDatagrid) {
  function removeClassAllOver(className: string) {
    const source = dg.Header.querySelectorAll(`.${className}`);
    source.forEach((item: any) => {
      item.classList.remove(className);
    });
  }
  function dragStart(e: any) {
    e.srcElement.classList.add("pSave-dragActive");
    // const source = dg.Columns.value;
     const source = dg.Header.querySelectorAll(".hhl-datagrid-head-cell__menu");

    source.forEach((item: any) => {
      item.classList.add("pSave-unselectable");
    });
  }

  function dragOver(e: any) {
    e.preventDefault();
    const source = dg.Header.querySelector(".pSave-dragActive")! as any;
    const index = parseInt(source.dataset.index);
    if (column.index !== index) {
      const dragClass = column.index > index ? "pSave-dragOver_right" : "pSave-dragOver_left";
      e.srcElement.classList.add(dragClass);
      e.dataTransfer.dropEffect = "move";
      return;
    }
    e.dataTransfer.dropEffect = "none";
    return;
  }

  function dragLeave(e: any) {
    e.srcElement.classList.remove("pSave-dragOver_right");
    e.srcElement.classList.remove("pSave-dragOver_left");
  }

  function dragEnd() {
    removeClassAllOver("pSave-dragOver_right");
    removeClassAllOver("pSave-dragOver_left");
    removeClassAllOver("pSave-dragActive");
    removeClassAllOver("pSave-unselectable");
  }

  function dragDrop() {
    const source = dg.Header.querySelector(".pSave-dragActive")! as any;
    const index = parseInt(source.dataset.index);
    if (column.index === index) {
      return;
    }
    dg.columnsReorder(index, column.index);
  }

  return {
    dragStart,
    dragOver,
    dragLeave,
    dragEnd,
    dragDrop
  };
}

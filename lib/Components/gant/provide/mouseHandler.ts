import { iTask } from "../data/Task";
import { iGantt } from "./gantt";

export function mouseHandler(_GT: iGantt) {
  const GT = _GT;
  let activeTask: iTask | null = null;
  let notActive = true;
  let Typ = "";
  let PosX = 0;
  //let PosY = 0;
  let SizeX = 0;
  //let points: any = null;

  function mouseDown(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target?.dataset.type?.startsWith("task")) {
      const ID = parseInt(target.parentElement?.dataset.id ?? "-1");
      Typ = target?.dataset.type;
      if (ID > 0) {
        activeTask = GT.Tasks[ID];
        PosX = e.screenX;
        //PosY = e.screenY;
        notActive = false;
        if (Typ === "task") SizeX = activeTask?.left ?? 0;
        if (Typ === "task_adjustRight") SizeX = activeTask?.width ?? 0;
        if (Typ === "task_connectorRight") {
          GT.lineTool!.x1.baseVal.value = activeTask!.left + activeTask!.width + 2;
          GT.lineTool!.y1.baseVal.value = activeTask!.top + 10;
          GT.lineTool!.x2.baseVal.value = e.clientX + 20;
          GT.lineTool!.y2.baseVal.value = e.clientY + 20;
        }
      }
    }
  }

  function mouseMove(e: MouseEvent) {
    if (notActive) return;
    const diff = e.screenX - PosX;
    if (Typ === "task") activeTask!.setLeft(SizeX + diff);
    if (Typ === "task_adjustRight") activeTask!.setWidth(SizeX + diff);
  }

  function mouseUp() {
    if (notActive) return;
    notActive = true;
    activeTask = null;
    Typ = "";
  }

  return { mouseMove, mouseDown, mouseUp };
}

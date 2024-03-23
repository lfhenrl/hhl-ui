import { ref, watch } from "vue";
import { iColumn } from "../data/columnModel";
import { Columns } from "../data/Columns";
import { iTask } from "../data/taskModel";
import dataGrid from "../datagrid/data-grid.vue";
import { iMoveTask } from "../data/moveTaskModel";

export type iGantt = InstanceType<typeof Gantt>;
type iDataGrid = InstanceType<typeof dataGrid>;

export class Gantt {
  public MainDom?: any;
  public vScrollDom?: any;
  public dGridDom?: iDataGrid;
  public MainDomStyle?: any;
  public Data = ref<iTask[]>([]);
  public headHeight = 38;
  public Columns: iColumn[];
  public rowHeight = 30;
  public scrollHight = 200;
  public scrollTotHight = 238;
  public scrollGanttWidth = 0;
  public DragSourceRow: iMoveTask | null = null;
  public StartTime: Date = new Date();
  public EndTime: Date = new Date();
  public pixelPrSec = 0;

  constructor() {
    this.Columns = Columns;

    watch(this.Data, () => {
      this.scrollTotHight = this.dGridDom?.$el.scrollHeight;
      this.scrollHight = this.scrollTotHight - this.headHeight;
      if (this.MainDomStyle) {
        this.MainDomStyle.setProperty("--gantt-scroll-height", this.scrollHight + "px");
      }
    });
  }

  public init() {
    this.MainDomStyle = this.MainDom?.style;
    this.update();
  }

  public calcTime() {
    if (this.scrollGanttWidth < 10) return;
    const day = 24 * 60 * 60;
    const secStartToEnd = (this.EndTime.valueOf() - this.StartTime.valueOf()) / 1000;
    this.pixelPrSec = 35 / day;
    const t = {
      startDate: this.StartTime,
      endDate: this.EndTime,
      secStartToEnd,
      pixelPrSec: this.pixelPrSec,
    };
    console.log("calcTime ", t);
  }

  public newData() {
    this.update();
    this.calcTime();
  }

  update() {
    this.scrollGanttWidth = this.vScrollDom.getScrollSize();
    this.MainDomStyle.setProperty("--gantt-scroll-width", this.scrollGanttWidth + "px");
    this.MainDomStyle.setProperty("--gantt-head-height", this.headHeight + "px");
    this.MainDomStyle.setProperty("--gantt-row-height", this.rowHeight + "px");
    console.log("hhhhh ", this.scrollGanttWidth);
  }

  public findId(children: any, id: any, p: any) {
    if (Array.isArray(children)) {
      // Yes, check them
      for (const childNode of children) {
        if (childNode.Id === id) {
          // Found it
          return {
            p: p,
            item: childNode,
          };
        }
        // Look in this node's children
        const found: any = this.findId(childNode.Children, id, childNode);
        if (found) {
          // Found in this node's children
          return {
            p: childNode,
            item: found,
          };
        }
      }
    }
  }
}

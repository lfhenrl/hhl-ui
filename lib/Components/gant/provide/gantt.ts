import { ref, watch, toRaw } from "vue";
import { iColumn } from "../data/columnModel";
import { Columns } from "../data/Columns";
import { iTask } from "../data/taskModel";

export type iGantt = InstanceType<typeof Gantt>;
//type iVscroller = InstanceType<typeof H_virtualList>;

export class Gantt {
  public MainDom?: any;
  public vScrollDom?: any;
  public dGridDom?: any;
  public MainDomStyle?: any;
  public Data: iTask[] = [];
  public headHeight = 38;
  public Columns: iColumn[];
  public ActiveRows: any = ref({});
  public rowHeight = 30;
  public scrollHight = 200;
  public scrollTotHight = 238;
  public scrollGanttWidth = 1000;
  public DragSourceId: number = -1;

  constructor() {
    this.Columns = Columns;
    watch(this.ActiveRows, () => {
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

  public newData() {
    this.update();
  }

  update() {
    this.scrollGanttWidth = this.vScrollDom.getScrollSize();
    this.MainDomStyle.setProperty("--gantt-scroll-width", this.scrollGanttWidth + "px");
    this.MainDomStyle.setProperty("--gantt-head-height", this.headHeight + "px");
    this.MainDomStyle.setProperty("--gantt-row-height", this.rowHeight + "px");
    console.log("hhhhh ", this.ActiveRows.value);
  }

  public SearchTree(data: any[], id: number) {
    return data.filter((el) => {
      if (el.Id === id) return el;
      if (el.Children.length > 0) this.SearchTree(el.Children, id);
    });
    return null;
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

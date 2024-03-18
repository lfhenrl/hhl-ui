import { ref } from "vue";
import H_virtualList from "../../H_virtualList.vue";

type iVscroller = InstanceType<typeof H_virtualList>;

export type iGantt = InstanceType<typeof Gantt>;
//type iVscroller = InstanceType<typeof H_virtualList>;

export class Gantt {
  public vScrollDom?: any;
  public dGridDom?: any;
  public scrollHight = ref("");

  public init(_vScrollDom: any) {
    this.vScrollDom = _vScrollDom;
  }

  public newData() {
    const dGrid: HTMLElement = this.dGridDom.$el;
    this.scrollHight.value = dGrid.scrollHeight + 400 + "px";
  }
}

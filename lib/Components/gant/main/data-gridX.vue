<template>
  <div class="data-grid" ref="dataGrid">
    <table>
      <thead>
        <tr>
          <th>
            <div class="data-grid-Hcell">
              <div class="data-grid-Hcell-text">Name.</div>
              <div class="data-grid-Hcell-spacer" @mousedown="resize" />
            </div>
          </th>
          <th>
            <div class="data-grid-Hcell">
              <div class="data-grid-Hcell-text">Start.</div>
              <div class="data-grid-Hcell-spacer" @mousedown="resize" />
            </div>
          </th>
          <th>
            <div class="data-grid-Hcell">
              <div class="data-grid-Hcell-text">Duration.</div>
              <div class="data-grid-Hcell-spacer" @mousedown="resize" />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.Id">
          <td>
            <div>
              <span>{{ item.Name }}</span>
            </div>
          </td>
          <td>
            <div>
              <span>{{ formatDate(item.StartTime) }}</span>
            </div>
          </td>
          <td>
            <div>
              <span>{{ getDays(item) }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="gantt-space" />
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from "vue";
import { iTask } from "../data/taskModel";
import { D_01_dec_2021_HHMM } from "../../../utils/dateFormat";
import { DateDiffHours } from "../../../utils/dateFunctions";

const dataGrid = ref<HTMLElement>();

const P = defineProps({
  data: { type: Array as PropType<iTask[]> },
  scrollTop: { type: Number, default: 0 },
});

watch(
  () => P.scrollTop,
  () => {
    if (!dataGrid.value) return;
    dataGrid.value.scrollTop = P.scrollTop;
  }
);

function resize(e: MouseEvent) {
  const table: HTMLTableElement | null = dataGrid.value?.querySelector("table") ?? null;
  if (table === null) return;
  const t: any = e.target;
  const p = t.parentElement.parentElement;

  const PosX: number = e.screenX;
  const rowWidth = p.clientWidth ?? 100;
  const tWidth = table.clientWidth;
  document.addEventListener("mousemove", ResizeMouseMove, false);
  document.addEventListener("mouseup", MouseUp, false);

  function ResizeMouseMove(e: MouseEvent) {
    const diffX = e.screenX - PosX;
    const newWidth = rowWidth + diffX;
    if (newWidth > 30) {
      const newWidthString = rowWidth + diffX + 1 + "px";
      p.style.width = newWidthString;
      table!.style.width = tWidth + diffX + "px";
    }
  }

  function MouseUp() {
    document.removeEventListener("mousemove", ResizeMouseMove, false);
    document.removeEventListener("mouseup", MouseUp, false);
  }
}

function formatDate(d: Date) {
  return D_01_dec_2021_HHMM(d);
}

function getDays(item: iTask) {
  return DateDiffHours(item.StartTime, item.EndTime);
}
</script>

<style>
.data-grid {
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--col-bg-3);
  font-size: 14px;
  overflow-x: scroll;
  overflow-y: hidden;
  font-size: 12px;
  line-height: 1;
  min-width: 205px;
}

.data-grid table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 200px;
}

.data-grid table th {
  position: sticky;
  top: 0;
  background-color: var(--col-bg-1);
  border-right: 1px solid var(--col-bg-3);
  border-bottom: 1px solid var(--col-bg-3);
  height: 38px;
}

.data-grid-Hcell {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}

.data-grid-Hcell-text {
  display: block;
  align-items: center;
  padding: 3px;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}

.data-grid-Hcell-spacer {
  height: 100%;
  width: 4px;
  margin-right: -3px;
  cursor: col-resize;
}

.data-grid table td {
  border-right: 1px solid var(--col-bg-3);
  border-bottom: 1px solid var(--col-bg-3);
  padding: 0;
}

.data-grid table td div {
  display: flex;
  align-items: center;
  min-height: 29px;
  max-height: 29px;
  padding: 3px;
  margin: 0;
}

.data-grid table td div span {
  display: block;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: block-axis;
}
</style>

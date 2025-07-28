<template>
  <div class="H_datagrid" ref="datagridRef">
    <div class="flex">
      <slot name="head"></slot>
    </div>
    <div ref="header" class="H_datagrid-header h-min">
      <H_headerRow role="heading" aria-level="2" :key="DG.changeCounter.value" @click="headerClick" />
      <H_progressBar :show="DG.dataHandler?.rowsLoading.value" />
    </div>
    <div class="H_datagrid-body">
      <H_virtualList
        :item_style="rowStyle"
        :data-key="dataKey"
        @scroll="onScroll"
        :keeps="keeps"
        :overscan="overscan"
        item-class="H_dataRow"
        :data-sources="DG.dataHandler!.outData.value"
        :selectedId="selected_Id"
        :estimateSize="parseInt(row_height)"
        ref="vscroll"
        @click="bodyClick"
      >
        <template v-slot:header
          ><H_spaceRow />
          <div v-if="DG.dataHandler?.rowsCount.value === 0" class="H_datagrid-noRows">No rows loaded...</div>
        </template>
        <template v-slot="{ item }">
          <H_dataRow :row="item" :key="DG.changeCounter.value" />
          <adjustColumnsWidth :row="item" />
        </template>
      </H_virtualList>
    </div>
    <H_datagridFooter />
  </div>
</template>

<script setup lang="ts">
import { type PropType, onMounted, provide, ref, useSlots, watch } from "vue";
import H_virtualList from "../H_virtualList.vue";
import H_headerRow from "../../SubComponents/datagrid/head/H_headerRow.vue";
import H_dataRow from "../../SubComponents/datagrid/body/H_dataRow.vue";
import H_spaceRow from "../../SubComponents/datagrid/body/H_spaceRow.vue";
import H_datagridFooter from "../../SubComponents/datagrid/H_datagridFooter.vue";
import H_progressBar from "../H_progressBar.vue";
import { Dgrid } from "../../SubComponents/datagrid/provide/Dgrid";
import { datagridClickHandler } from "../../SubComponents/datagrid/provide/datagridClickHandler";
import { type iClickData } from "../../SubComponents/datagrid/provide/datagridTypes";
import { debounce } from "../../utils/debounce";

type iVscroller = InstanceType<typeof H_virtualList>;

const P = defineProps({
  dataKey: {
    type: String,
    required: true,
    default: "id",
  },
  dataHandler: {
    type: Object as PropType<any>,
    required: true,
    default: null,
  },
  pagesize: {
    type: Number,
    default: 500,
  },
  keeps: {
    type: Number,
    default: 50,
  },
  overscan: {
    type: Number,
    default: 20,
  },
  row_style: { type: Function, default: null },
  row_height: { type: String, default: "26px" },
  filterList: { type: Array as PropType<string[]>, default: [] },
  filterstring: { type: String, default: "" },
  groupList: { type: Array as PropType<string[]>, default: [] },
  stickyGroups: { type: Boolean, default: true },
  selectedId: { type: String },
});

const E = defineEmits<{
  rowClick: [data: iClickData];
  headClick: [data: iClickData];
}>();

const datagridRef = ref();
const header = ref();
const row_styleActive = P.row_style ? true : false;
const vscroll = ref<iVscroller | null>(null);
const slots = useSlots();
const DG = new Dgrid(slots, P.dataHandler, P);
const selected_Id = ref("");

watch(
  () => P.selectedId,
  () => {
    selected_Id.value = P.selectedId ?? "";
  }
);

provide("DG", DG);
const ClickHandler = new datagridClickHandler(DG);

function bodyClick(e: MouseEvent) {
  const data = ClickHandler.click(e);
  if (data && data.type.startsWith("row")) {
    selected_Id.value = data?.dataId;
    E("rowClick", data);
  }
}

function headerClick(e: MouseEvent) {
  const data = ClickHandler.click(e);
  if (data && data.type.startsWith("head")) E("headClick", data);
}

function onScroll(e: any) {
  header.value.scrollLeft = e.target.scrollLeft;
}

function rowStyle(index: any) {
  if (row_styleActive) {
    return P.row_style(index);
  }
}

function adjustColumnsWidth(row: any) {
  if (row.row.__type) return;
  DG.ColumnWidthAdjustment.findMaxAllColumns(row.row);
}
watch(
  () => P.filterstring,
  () => {
    DebounceFilterstring();
  }
);

const DebounceFilterstring = debounce(() => {
  DG.SeekString = P.filterstring?.toLocaleLowerCase() ?? "";
  DG.updateFilter();
}, 1000);

onMounted(() => {
  DG.Vscroller = vscroll.value!;
  DG.datagridRef = datagridRef.value;
});
</script>

<style>
@layer components {
  .H_datagrid {
    display: grid;
    position: relative;
    height: 100%;
    font-size: 0.875rem;
    grid-template-rows: auto auto 1fr auto;
    grid-template-columns: 1fr;
    --dgrid-row-height: v-bind(row_height);

    .H_datagrid-header {
      display: flex;
      flex-direction: column;
      position: relative;
      background-color: var(--color-bg2);
      height: 36px;
      max-height: 36px;
      overflow-x: hidden;
      overflow-y: scroll;
      border-top: 1px solid var(--color-txt6);
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      border-right: 1px solid var(--color-txt6);
      border-left: 1px solid var(--color-txt6);

      &::-webkit-scrollbar {
        border-radius: 0;
        border-top-right-radius: 4px;
      }
      &::-webkit-scrollbar-track {
        border-radius: 0;
        border-top-right-radius: 4px;
        background-color: var(--color-bg2);
      }
      &::-webkit-scrollbar-thumb {
        background-color: transparent;
        opacity: 0;
      }

      .H_headerRow {
        display: flex;
        flex: 1 1 100%;

        .H_headCell {
          display: flex;
          flex-direction: column;
          flex: 0;
          width: min-content;
          min-height: 34px;
          border-right: 1px solid var(--color-txt7);

          .H_HeadCell-space {
            height: 0;
            width: min-content;
            overflow-x: hidden;
            overflow-y: visible;
            white-space: nowrap;
            opacity: 0;
            padding: 0 0.5em;
          }

          .H_headCell__actions {
            display: flex;
            flex: 1;
            align-items: center;
            width: 100%;
            position: relative;
            font-weight: bold;

            .H_headCell__actions_title {
              width: 100%;
              overflow: hidden;
              padding: 0.375em;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .H_headCell__actions_resize {
              position: absolute;
              overflow: visible;
              right: -4px;
              height: 100%;
              width: 8px;
              cursor: ew-resize;
              z-index: 2;
            }

            .H_menuHead {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              overflow: visible;
              cursor: pointer;
              min-width: 1.5em;
              gap: 5px;
              &:hover {
                @media (hover: hover) {
                  background-color: var(--color-bg4);
                }
              }
              .H_menuHead__sorting {
                display: flex;
                flex: 1;
                align-items: flex-start;
                overflow: visible;
                font-size: 0.75em;
                max-height: 1em;

                .H_icon {
                  margin-inline: -5px;
                }
                .H_menuHead__sorting_order {
                  color: var(--color-pri);
                }
              }
            }

            .H_menuBody {
              display: flex;
              flex-direction: column;
              border-radius: 4px;
              background-color: var(--color-bg5);
              color: var(--color-txt1);
              font-weight: normal;
              font-size: 0.875em;

              .H_menuBody__item {
                display: flex;
                align-items: center;
                padding-left: 0.25em;
                padding-right: 0.75em;
                padding-block: 0.375em;
                cursor: pointer;
                gap: 0.5em;
                border-bottom: 1px solid var(--color-bg4);
                &[selected] {
                  background-color: var(--color-pri);
                  color: var(--color-priTxt);
                }
                &:hover {
                  @media (hover: hover) {
                    background-color: var(--color-bg3);
                  }
                }
                .H_menuBody__item_title {
                  pointer-events: none;
                }
                .H_icon {
                  pointer-events: none;
                }
              }
            }
          }
        }
      }
    }

    .H_progressBar {
      position: absolute;
      bottom: 0;
      z-index: 10;
    }

    .H_datagrid-noRows {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      font-size: 1.25em;
      line-height: 1.25em;
      height: 6em;
    }

    .H_datagrid-body {
      overflow: hidden;
      border-right: 1px solid var(--color-txt6);
      border-left: 1px solid var(--color-txt6);

      .H_dataRow {
        display: flex;
        flex: 1;
        height: min-content;
        width: 100%;
        min-height: var(--dgrid-row-height);
        max-height: var(--dgrid-row-height);
        height: var(--dgrid-row-height);
        background-color: var(--color-bg0);
        &:nth-child(odd) {
          background-color: var(--color-bg3);
        }
        &:nth-child(even) {
          background-color: var(--color-bg2);
        }

        &:hover {
          @media (hover: hover) {
            background-color: var(--color-bg6);
          }
        }
        &[data-selected] {
          background-color: color-mix(in oklab, var(--color-pri) 20%, transparent);
        }

        &.sticky-0 {
          position: sticky;
          top: 0;
          opacity: 1;
        }
        &.sticky-1 {
          position: sticky;
          top: var(--dgrid-row-height);
          opacity: 1;
        }
        &.sticky-2 {
          position: sticky;
          top: calc(var(--dgrid-row-height) * 2);
          opacity: 1;
        }

        .H_dataRow__cell {
          padding-block: 0.25em;
          padding-inline: 0.5em;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          text-box-trim: trim-both;
          border-right: 1px solid var(--color-txt7);
          border-bottom: 1px solid var(--color-txt7);
          &[autoheight] {
            white-space: break-spaces;
          }
        }

        .H_dataGroupRow {
          display: flex;
          flex: 1;
          align-items: center;
          gap: 0.5em;
          width: 100%;
          padding-inline: 0.25em;
          min-height: var(--dgrid-row-height);
          max-height: var(--dgrid-row-height);

          .H_dataGroupRow__icons {
            display: flex;
            align-items: center;
            padding-left: 0.25em;
          }

          .H_dataGroupRow__counts {
            font-size: 0.75em;
            color: var(--color-txt3);
          }
        }

        .H_loadMoreRows {
          display: flex;
          align-items: center;
          padding-left: 2.5em;
        }
      }

      .H_spaceRow {
        display: flex;
        max-height: 0;
        opacity: 0;
        div {
          display: inline-block;
          max-height: 0;
          overflow: hidden;
          border-right: 1px solid var(--color-bg3);
        }
      }
    }
    .H_datagridFooter {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5em;
      align-items: center;
      color: var(--color-txt3);
      background-color: var(--color-bg2);
      border: 1px solid var(--color-txt6);
      padding: 0.5em;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;

      .H_datagridFooter__info {
        display: flex;
        align-items: center;
        color: var(--color-txt2);
      }
    }
  }
}
</style>

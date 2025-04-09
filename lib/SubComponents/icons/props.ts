import type { PropType } from "vue"; export const sharedProps = {
  name: {
    type: String as PropType<| "account" | "add" | "arrow_downward" | "arrow_upward" | "cast" | "check" | "clock" | "close" | "columns" | "day" | "drag" | "edit" | "event" | "excel" | "expand_down" | "expand_horizontal" | "expand_left" | "expand_right" | "expand_up" | "filter" | "history" | "home" | "image" | "info" | "lock" | "mail" | "menu" | "menu_small" | "night" | "page_first" | "page_last" | "print" | "refresh" | "save" | "search" | "settings" | "sorting" | "split" | "tree" | "undo" | "upload" | "zoom_out_map" >,
    default: "close",
  } };
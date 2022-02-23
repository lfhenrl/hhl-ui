export declare const H_btn: typeof import("./Components/H_btn.vue")["default"];
export declare const H_icon: typeof import("./Components/H_icon.vue")["default"];
export declare const H_input: typeof import("./Components/H_input.vue")["default"];
export declare const H_inputBase: typeof import("./Components/H_inputBase.vue")["default"];
export declare const H_checkbox: typeof import("./Components/H_checkbox.vue")["default"];
export declare const H_radio: typeof import("./Components/H_radio.vue")["default"];
export declare const H_switch: typeof import("./Components/H_switch.vue")["default"];
export declare const H_pop: typeof import("./Components/popup/H_pop.vue")["default"];
export declare const H_textarea: typeof import("./Components/H_textarea.vue")["default"];
export declare const H_modal: typeof import("./Components/H_textarea.vue")["default"];
export declare const H_dialog: typeof import("./Components/H_dialog.vue")["default"];
export declare const H_dialogService: typeof import("./Components/dialogService/H_dialogService.vue")["default"];
export declare const H_select: typeof import("./Components/H_select.vue")["default"];
export declare const H_datePicker: typeof import("./Components/date/H_datePicker.vue")["default"];
export declare const H_layout: typeof import("./Components/layout/H_layout.vue")["default"];
export declare const H_tabs: typeof import("./Components/navigation/H_tabs.vue")["default"];
export declare const H_tab: typeof import("./Components/navigation/H_tab.vue")["default"];
export declare const H_virtualList: typeof import("./Components/virtualList/H_virtualList.vue")["default"];
export declare const H_column: typeof import("./Components/datagrid/H_column.vue")["default"];
export declare const H_datagrid: typeof import("./Components/datagrid/H_datagrid.vue")["default"];

export declare const H_dradDrop: typeof import("./Components/draggable/H_dragDrop.vue")["default"];

type ListenerCallback = (...data: any) => void;
declare type notifyType = "err" | "warn" | "info";

declare type dialogbuttonColor = "col-pri" | "col-ok" | "col-sec" | "col-err" | "col-info" | "col-black" | "col-white";

declare type dialogButton = {
  Text?: string;
  Color?: dialogbuttonColor;
};

declare type dialogButtons = {
  ok?: dialogButton;
  cancel?: dialogButton;
};

declare type hhl = {
  event: {
    on(event: string, callBack: ListenerCallback): void;
    off(event: string, callBack: ListenerCallback): void;
    emit(event: string, payLoad: any): void;
  };
  alert(type: notifyType, title: string, text: string, timeout?: number): void;
  dialog(title: string, info: string, buttons?: dialogButtons): Promise<boolean>;
};

declare global {
  var hhl: hhl;
}

declare var hhl: hhl;

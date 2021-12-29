<template>
  <div class="hhl-dialog-service">
    <hhl-dialog v-model="dialogPop">
      <template #header>{{ dialog.title }}</template>
      {{ dialog.info }}
      <template #footer class="col-bg-black">
        <hhl-btn size="sm" :class="dialog.buttons.ok.Color" class="mr-3" @click="dialogOk">
          {{ dialog.buttons.ok.Text }}
        </hhl-btn>
        <hhl-btn size="sm" :class="dialog.buttons.cancel.Color" small @click="dialogCancel">
          {{ dialog.buttons.cancel.Text }}
        </hhl-btn>
      </template>
    </hhl-dialog>
    <hhl-snack v-model="snackPop" :title="snack.title" :type="snack.type" :text="snack.text" @close="snackClose" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { EventHandler } from "../utils/eventHandler";

const hhl = {
  event: new EventHandler<"hhl_dialog" | "hhl_alert">(),
  dialog(title: string, info: string, buttons: any) {
    return new Promise((resolve, reject) => {
      function callback(ok: boolean) {
        if (ok) {
          resolve(true);
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject(false);
        }
      }

      hhl.event.emit("hhl_dialog", { title, info, buttons, callback });
    });
  },
  alert(type: string, title: string, text: string, timeout: number) {
    hhl.event.emit("hhl_alert", { type, title, text, timeout });
  }
};

(window as any).hhl = hhl;

function updateButtons(data: any) {
  if (!data.buttons) {
    data.buttons = { ok: {}, cancel: {} };
  }
  const but = data.buttons;
  if (!but.ok) {
    data.buttons.ok = {};
  }
  if (!but.cancel) {
    data.buttons.cancel = {};
  }
  if (!but.ok.Text) {
    data.buttons.ok.Text = "OK";
  }
  if (!but.ok.Color) {
    data.buttons.ok.Color = "col-pri";
  }
  if (!but.cancel.Text) {
    data.buttons.cancel.Text = "CANCEL";
  }
  if (!but.cancel.Color) {
    data.buttons.cancel.Color = "col-sec";
  }
  return data;
}

const HhlDialogService = defineComponent({
  name: "hhl-dialog-service",
  setup() {
    const dialogPop = ref(false);
    const snackPop = ref(false);
    const dialogs = <any>[];
    const snacks = <any>[];
    const dialog = ref({
      title: "Title",
      info: "Info",
      buttons: {
        ok: { Text: "Ok", Color: "bg-pri" },
        cancel: { Text: "Cancel", Color: "bg-sec" }
      },
      callback(ok: boolean) {
        return ok;
      }
    });
    let snackTimer: any = {};
    const snack = ref({
      type: "info",
      text: "Henrik",
      title: "Larsen",
      timeout: 3000
    });

    function dialogShow() {
      if (dialogs.length === 0) {
        return;
      }
      dialog.value = dialogs[0];
      dialogPop.value = true;
    }

    function dialogOk() {
      dialogPop.value = false;
      dialog.value.callback(true);

      setTimeout(() => {
        dialogs.shift();
        dialogShow();
      }, 400);
    }

    function dialogCancel() {
      dialogPop.value = false;
      dialog.value.callback(false);
      setTimeout(() => {
        dialogs.shift();
        dialogShow();
      }, 400);
    }

    function snackShow() {
      if (snacks.length === 0) {
        return;
      }
      snack.value = snacks[0];
      const timeout = snack.value.timeout || 3000;
      snackPop.value = true;
      snackTimer = setTimeout(() => {
        snackPop.value = false;
      }, timeout);
    }

    function snackClose() {
      clearTimeout(snackTimer);
      snacks.shift();
      snackShow();
    }

    onMounted(() => {
      hhl.event.on("hhl_dialog", (data) => {
        data = updateButtons(data);
        dialogs.push(data);
        if (dialogs.length === 1) {
          dialogShow();
        }
      });

      hhl.event.on("hhl_alert", (data) => {
        snacks.push(data);
        if (snacks.length === 1) {
          snackShow();
        }
      });
    });

    return { dialogPop, dialog, dialogOk, dialogCancel, snackPop, snack, snackClose };
  }
});

declare global {
  interface __VLS_GlobalComponents {
    "hhl-dialog-service": typeof HhlDialogService;
  }
}
export type iHhlDialogService = InstanceType<typeof HhlDialogService>;
export default HhlDialogService;
</script>

<style>
.hhl-dialog-service .hhl-dialog {
  max-width: 80vw;
}

.hhl-dialog-service .hhl-btn {
  min-width: 60px;
}

.hhl-dialog-service .hhl-dialog__footer {
  justify-content: flex-end;
}
</style>

<template>
  <div class="H_dialogService">
    <H_dialog v-model="dialogPop">
      <div moveable-drag class="H_dialogService__title">{{ dialog.title }}</div>
      <div class="H_dialogService__content p-3">
        {{ dialog.info }}
      </div>
      <div class="H_dialogService-footer">
        <H_btn size="sm" :class="dialog.buttons.cancel.Color" @click="dialogCancel">
          {{ dialog.buttons.cancel.Text }}
        </H_btn>
        <H_btn size="sm" :class="dialog.buttons.ok.Color" @click="dialogOk">
          {{ dialog.buttons.ok.Text }}
        </H_btn>
      </div>
    </H_dialog>
    <H_snack v-model="snackPop" :title="snack.title" :type="snack.type" :text="snack.text" @close="snackClose" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import H_btn from "../H_btn.vue";
import H_dialog from "../H_dialog.vue";
import H_snack from "../dialogService/H_snack.vue";

const dialogPop = ref(false);
const snackPop = ref(false);
const dialogs: any[] = [];
const snacks: any[] = [];
const dialog = ref({
  title: "Title",
  info: "Info",
  buttons: {
    ok: { Text: "Ok", Color: "col-pri" },
    cancel: { Text: "Cancel", Color: "col-sec" },
  },
  callback(ok: boolean) {
    return ok;
  },
});
let snackTimer: any = {};
const snack = ref({
  type: "info",
  text: "Henrik",
  title: "Larsen",
  timeout: 3000,
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
</script>

<script lang="ts">
import { EventHandler } from "../../utils/eventHandler";
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
  },
  ignoreEmitPropErrors(_s: any) {
    return;
  },
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
    data.buttons.ok.Text = "Ok";
  }
  if (!but.ok.Color) {
    data.buttons.ok.Color = "col-pri";
  }
  if (!but.cancel.Text) {
    data.buttons.cancel.Text = "Cancel";
  }
  if (!but.cancel.Color) {
    data.buttons.cancel.Color = "col-sec";
  }
  return data;
}
</script>
<style>
@layer components {
  .H_dialogService {
    .H_dialogService__title {
      background-color: var(--color-pri);
      color: var(--color-priTxt);
      padding-block: 0.25em;
      text-align: center;
    }

    .H_dialogService__content {
      padding: 0.75em;
      color: var(--color-txt);
    }

    .H_dialogService-footer {
      display: flex;
      justify-content: flex-end;
      gap: 1em;
      padding-inline: 0.75em;
      padding-bottom: 0.75em;
    }
  }
}
</style>

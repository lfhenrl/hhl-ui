import { defineConfig } from "vite-plugin-windicss";

export default defineConfig({
  preflight: true,
  theme: {
    colors: {
      pri: "var(--col-pri)",
      priTxt: "var(--col-txt-on-pri)",
      priLight: "var(--col-pri-light)",
      sec: "var(--col-sec)",
      secTxt: "var(--col-txt-on-sec)",
      ok: "var(--col-ok)",
      okTxt: "var(--col-txt-on-ok)",
      err: "var(--col-err)",
      errTxt: "var(--col-txt-on-err)",
      warn: "var(--col-warn)",
      warnTxt: "var(--col-txt-on-warn)",
      info: "var(--col-info)",
      infoTxt: "var(--col-txt-on-info)",
      txt0: "var(--col-txt-0)",
      txt1: "var(--col-txt-1)",
      txt2: "var(--col-txt-2)",
      txt3: "var(--col-txt-3)",
      txt4: "var(--col-txt-4)",
      txt5: "var(--col-txt-5)",
      bg0: "var(--col-bg-0)",
      bg1: "var(--col-bg-1)",
      bg2: "var(--col-bg-2)",
      bg3: "var(--col-bg-3)",
      bg4: "var(--col-bg-4)",
      bg5: "var(--col-bg-5)",
      black: "black",
      white: "white"
    }
  }
});

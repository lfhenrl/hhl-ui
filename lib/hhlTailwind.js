const plugin = require("tailwindcss/plugin");

const hhlTailwind = plugin(
  function ({ addComponents, theme }) {
    addComponents({
      ".col-pri": {
        "background-color": "var(--col-pri)",
        color: "var(--col-on-pri)",
        "--current-bg-col": "var(--col-pri)",
        "--current-txt-col": "var(--col-on-pri)",
      },
      ".col-sec": {
        "background-color": "var(--col-sec)",
        color: "var(--col-on-sec)",
        "--current-bg-col": "var(--col-sec)",
        "--current-txt-col": "var(--col-on-sec)",
      },
      ".col-ok": {
        "background-color": "var(--col-ok)",
        color: "var(--col-on-ok)",
        "--current-bg-col": "var(--col-ok)",
        "--current-txt-col": "var(--col-on-ok)",
      },
      ".col-err": {
        "background-color": "var(--col-err)",
        color: "var(--col-on-err)",
        "--current-bg-col": "var(--col-err)",
        "--current-txt-col": "var(--col-on-err)",
      },
      ".col-warn": {
        "background-color": "var(--col-warn)",
        color: "var(--col-on-warn)",
        "--current-bg-col": "var(--col-warn)",
        "--current-txt-col": "var(--col-on-warn)",
      },
      ".col-info": {
        "background-color": "var(--col-info)",
        color: "var(--col-on-info)",
        "--current-bg-col": "var(--col-info)",
        "--current-txt-col": "var(--col-on-info)",
      },
      ".col-black": {
        "background-color": "black",
        color: "white",
        "--current-bg-col": "black",
        "--current-txt-col": "white",
      },
      ".col-white": {
        "background-color": "white",
        color: "black",
        "--current-bg-col": "white",
        "--current-txt-col": "black",
      },
    });
  },
  {
    theme: {
      colors: {
        pri: "var(--col-pri)",
        priTxt: "var(--col-on-pri)",
        sec: "var(--col-sec)",
        secTxt: "var(--col-on-sec)",
        ok: "var(--col-ok)",
        okTxt: "var(--col-on-ok)",
        err: "var(--col-err)",
        errTxt: "var(--col-on-err)",
        warn: "var(--col-warn)",
        warnTxt: "var(--col-on-warn)",
        info: "var(--col-info)",
        infoTxt: "var(--col-on-info)",
        txt0: "var(--col-txt-0)",
        txt1: "var(--col-txt-1)",
        txt2: "var(--col-txt-2)",
        txt3: "var(--col-txt-3)",
        txt4: "var(--col-txt-4)",
        txt5: "var(--col-txt-5)",
        txt6: "var(--col-txt-6)",
        bg0: "var(--col-bg-0)",
        bg1: "var(--col-bg-1)",
        bg2: "var(--col-bg-2)",
        bg3: "var(--col-bg-3)",
        bg4: "var(--col-bg-4)",
        bg5: "var(--col-bg-5)",
        bg6: "var(--col-bg-6)",
        black: "black",
        white: "white",
        transparent: "transparent",
        current: "currentColor",
      },
    },
  },
);

module.exports = hhlTailwind;

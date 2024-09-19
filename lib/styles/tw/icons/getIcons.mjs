import { createRequire } from "module";
const require = createRequire(import.meta.url);
const data = require("./icons.json");

export default function () {
  console.log("start");
  let nObj = {};
  for (var attributename in data.icons) {
    nObj[".ico-" + attributename + "::after"] = {
      "--svg": `url("data:image/svg+xml;utf8,${encodeSvg(data.icons[attributename].body)}")`,
    };
  }
  return nObj;
}

function encodeSvg(svg) {
  return svg
    .replace("<svg", ~svg.indexOf("xmlns") ? "<svg" : '<svg xmlns="http://www.w3.org/2000/svg"')
    .replace(/"/g, "'")
    .replace(/%/g, "%25")
    .replace(/#/g, "%23")
    .replace(/{/g, "%7B")
    .replace(/}/g, "%7D")
    .replace(/</g, "%3C")
    .replace(/>/g, "%3E");
}

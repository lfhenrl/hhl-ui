import data from "./icons.json" with { type: "json" };
import fs from 'node:fs';
let strUtils = "";
let strRaw = "";
  for (var attributename in data.icons) {
  strUtils += `@utility ico-${attributename} {&::after {  --svg: url("data:image/svg+xml;utf8,${encodeSvg(data.icons[attributename].body)}")} }`       
  strRaw  += `.ico-${attributename}::after {  --svg: url("data:image/svg+xml;utf8,${encodeSvg(data.icons[attributename].body)}")} ` 
  }

  fs.writeFile('./lib/styles/tw/icons.css', strUtils, err => {
  if (err) {
    console.error(err);
  } else {
    console.error("file written successfully");
  }
  });

    fs.writeFile('./lib/styles/tw/iconsRaw.css', strRaw, err => {
  if (err) {
    console.error(err);
  } else {
    console.error("file written successfully");
  }
});

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


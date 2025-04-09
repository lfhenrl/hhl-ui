const testFolder = "./lib/SubComponents/icons/ico";
import fs from "node:fs";

fs.readdir(testFolder, (err, files) => {
  let endFileIcons = "export const icons: any = {";
  let endFileProps = `import type { PropType } from "vue"; export const sharedProps = {
  name: {
    type: String as PropType<`;
  files.forEach((file) => {
    const name = file.split(".")[0];
    endFileIcons += `${name}: () => import("./ico/${name}"),`;
    endFileProps += `| "${name}" `;
  });
  endFileIcons += `};`;
  endFileProps += `>,
    default: "close",
  } };`;
  fs.writeFile("./lib/SubComponents/icons/icons.ts", endFileIcons, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.error("endFileIcons written successfully");
    }
  });
  fs.writeFile("./lib/SubComponents/icons/props.ts", endFileProps, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.error("endFileProps written successfully");
    }
  });
});

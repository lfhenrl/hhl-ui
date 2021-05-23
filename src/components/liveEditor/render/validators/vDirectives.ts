import { iValidateNode, logError } from ".";

export function vDirectives(node: iValidateNode) {
  if (node.nodeType > 1) return true;
  const attr = Object.keys(node.attributes);
  if (attr.length === 0) return true;

  const v_array = [
    "v-text",
    "v-html",
    "v-show",
    "v-if",
    "v-else",
    "v-else-if",
    "v-for",
    "v-on",
    "v-bind",
    "v-model",
    "v-slot",
    "v-pre",
    "v-cloak",
    "v-once",
    "v-is"
  ];

  const isOk = attr.every((a: string) => {
    if (a.startsWith("v-slot:")) {
      return true;
    }
    if (a.startsWith("v-")) {
      return v_array.includes(a);
    }
    return true;
  });

  if (isOk) {
    return true;
  }

  node.error = "Wrong v-name??";
  logError("Wrong v-name??", node);
}

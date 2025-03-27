import { type iValidateNode, logError } from ".";

export function attributes(node: iValidateNode) {
  if (node.nodeType > 1) return true;
  const attr = Object.keys(node.attributes);
  if (attr.length === 0) return true;

  const isOk = attr.every((a: string) => {
    if (a.includes("<")) return false;
    if (a.includes(">")) return false;
    if (a.includes(",")) return false;
    if (a.includes(".")) return false;

    return true;
  });

  if (isOk) {
    return true;
  }
  node.error = "Something wrong with the attributes";
  logError("Something wrong with the attributes", node);

  return false;
}

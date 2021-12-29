import { iValidateNode, logError } from ".";

export function testContent(node: iValidateNode) {
  let isOk = true;
  const str = node.textContent;
  if (str === "") return true;
  if (str.includes(">")) isOk = false;
  if (str.includes("<")) isOk = false;

  if (isOk) return true

  logError("text er ikke rigtig", node);
}

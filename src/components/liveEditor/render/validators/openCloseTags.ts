import { type iValidateNode, logError } from ".";

export function openCloseTags(node: iValidateNode) {
  if (node.nodeType > 1) return true;

  const start_tag = `<${node.type}>`;
  const end_tag = `</${node.type}>`;
  const selvClose_start_tag = `${node.type}/>`;
  const selvClose_end_tag = `${node.type}/>`;

  if (node.html.startsWith(start_tag) && node.html.endsWith(end_tag)) {
    return true;
  }

  if (node.html.startsWith(selvClose_start_tag) && node.html.endsWith(selvClose_end_tag)) {
    return true;
  }

  if (node.html.startsWith("<input") && node.html.endsWith(">")) {
    return true;
  }

  logError("openCloseTags er ikke rigtige", node);
  return false;
}

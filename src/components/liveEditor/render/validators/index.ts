// import { openCloseTags } from "./openCloseTags";
import { attributes } from "./attributes";
// import { testContent } from "./textContent";
import { vDirectives } from "./vDirectives";

export type iValidateNode = {
  html: string;
  type: string;
  nodeType: number;
  ele: HTMLElement;
  textContent: string;
  attributes: [key: string];
  error: string;
};

export type iValidateError = {
  isOk: boolean;
  message: string;
  func: Function;
};

export function logError(error: string, node: iValidateNode) {
  if (false) {
    console.error(error, node);
  }
}

export function validate(template: string): iValidateError {
  const nodes = parseHTML(template) as Array<iValidateNode>;
  const rules: any = [vDirectives, attributes];
  const returnValue: iValidateError = {
    isOk: true,
    message: "",
    func: () => null
  };
  nodes.every((node: iValidateNode) => {
    return rules.every(function (rule: Function) {
      const ele = rule(node);
      if (!ele) {
        returnValue.isOk = false;
        returnValue.message = node.error;
      }
      return ele;
    });
  });

  return returnValue;
}

function parseHTML(str: string) {
  var tmp = document.implementation.createHTMLDocument();
  tmp.body.innerHTML = `<div>${str}</div>`;
  const collection = tmp.body.childNodes;
  const array: any = [];
  const nodeArray = allDescendants(collection[0], array);
  return nodeArray;
}

function allDescendants(node: any, array: any) {
  for (let i = 0; i < node.childNodes.length; i++) {
    var child = node.childNodes[i];
    allDescendants(child, array);
    const attributes = {};
    if (child.attributes && child.attributes.length > 0) {
      const attrs = child.attributes;
      for (let i = attrs.length - 1; i >= 0; i--) {
        attributes[attrs[i].name] = attrs[i].value;
      }
    }
    const n = {
      html: child.outerHTML,
      type: child.nodeName.toLowerCase(),
      nodeType: child.nodeType,
      ele: child,
      textContent: child.textContent,
      attributes: attributes,
      error: ""
    };
    array.push(n);
  }
  return array;
}

"use strict";

function identity(v: any) {
  return v;
}

function ignoreCase(v: any) {
  return typeof v === "string" ? v.toLowerCase() : v;
}

function makeCompareFunction(f: any, opt: any) {
  opt = typeof opt === "number" ? {
    direction: opt
  } : opt || {};

  if (typeof f !== "function") {
    const prop = f; // make unary function

    f = function f(v1: any) {
      return v1[prop] ? v1[prop] : "";
    };
  }

  if (f.length === 1) {
    // f is a unary function mapping a single item to its sort score
    const uf = f;
    const preprocess = opt.ignoreCase ? ignoreCase : identity;

 
    const cmp = opt.cmp || function(v1: any, v2: any) {
      return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
    };

    f = function f(v1: any, v2: any) {
      return cmp(preprocess(uf(v1)), preprocess(uf(v2)));
    };
  }

  if (opt.direction === -1) {
    return function(v1: any, v2: any) {
      return -f(v1, v2);
    };
  }
  return f;
}

function tb(func: any, opt: any) {
  // @ts-ignore
  const x = typeof this === "function" && !this.firstBy ? this : false;
  const y = makeCompareFunction(func, opt);

  const f = x ? function(a: any, b: any) {
    return x(a, b) || y(a, b);
  } : y;
  f.thenBy = tb;
  return f;
}

const firstBy = tb;
export { firstBy };

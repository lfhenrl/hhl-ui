// support node and browsers
const getComputedStyle = window.getComputedStyle;
const atob = window.atob;

const util = newUtil();
const inliner = newInliner();
const fontFaces = newFontFaces();
var images = newImages();

// Default impl options
const defaultOptions = {
  // Default is to fail on error, no placeholder
  imagePlaceholder: undefined,
  // Default cache bust is false, it will use the cache
  cacheBust: false,
  // Use (existing) authentication credentials for external URIs (CORS requests)
  useCredentials: false,
  // Default resolve timeout
  httpTimeout: 30000,
};

function toSvg(node: any, options: any) {
  options = options || {};
  copyOptions(options);
  return Promise.resolve(node)
    .then(function (clonee) {
      const root = true;
      return cloneNode(clonee, options.filter, root, !options.raster);
    })
    .then(embedFonts)
    .then(inlineImages)
    .then(applyOptions)
    .then(function (clone) {
      return makeSvgDataUri(
        clone,
        options.width || util.width(node),
        options.height || util.height(node),
      );
    });

  function applyOptions(clone: any) {
    if (options.bgcolor) clone.style.backgroundColor = options.bgcolor;
    if (options.width) clone.style.width = options.width + "px";
    if (options.height) clone.style.height = options.height + "px";

    if (options.style)
      Object.keys(options.style).forEach(function (property) {
        clone.style[property] = options.style[property];
      });

    const style = document.createElement("style");
    clone.prepend(style);
    const css = "*::-webkit-scrollbar {display: none !important}";
    style.appendChild(document.createTextNode(css));

    var onCloneResult = null;

    if (typeof options.onclone === "function")
      onCloneResult = options.onclone(clone);

    return Promise.resolve(onCloneResult).then(function () {
      return clone;
    });
  }
}

/**
 * @param {Node} node - The DOM Node object to render
 * @param {Object} options - Rendering options, @see {@link toSvg}
 * @return {Promise} - A promise that is fulfilled with a Uint8Array containing RGBA pixel data.
 * */
function toPixelData(node: any, options: any) {
  options = options || {};
  options.raster = true;
  return draw(node, options).then(function (canvas) {
    return canvas
      .getContext("2d")
      ?.getImageData(0, 0, util.width(node), util.height(node)).data;
  });
}

/**
 * @param {Node} node - The DOM Node object to render
 * @param {Object} options - Rendering options, @see {@link toSvg}
 * @return {Promise} - A promise that is fulfilled with a PNG image data URL
 * */
function toPng(node: any, options: any) {
  options = options || {};
  options.raster = true;
  return draw(node, options).then(function (canvas) {
    return canvas.toDataURL();
  });
}

/**
 * @param {Node} node - The DOM Node object to render
 * @param {Object} options - Rendering options, @see {@link toSvg}
 * @return {Promise} - A promise that is fulfilled with a JPEG image data URL
 * */
function toJpeg(node: any, options: any) {
  options = options || {};
  options.raster = true;
  return draw(node, options).then(function (canvas) {
    return canvas.toDataURL("image/jpeg", options.quality || 1.0);
  });
}

/**
 * @param {Node} node - The DOM Node object to render
 * @param {Object} options - Rendering options, @see {@link toSvg}
 * @return {Promise} - A promise that is fulfilled with a PNG image blob
 * */
function toBlob(node: any, options: any) {
  options = options || {};
  options.raster = true;
  return draw(node, options).then(util.canvasToBlob);
}

/**
 * @param {Node} node - The DOM Node object to render
 * @param {Object} options - Rendering options, @see {@link toSvg}
 * @return {Promise} - A promise that is fulfilled with a canvas object
 * */
function toCanvas(node: any, options: any) {
  return draw(node, options || {});
}

function copyOptions(options: any) {
  // Copy options to impl options for use in impl
  if (typeof options.imagePlaceholder === "undefined") {
    domtoimage.impl.options.imagePlaceholder = defaultOptions.imagePlaceholder;
  } else {
    domtoimage.impl.options.imagePlaceholder = options.imagePlaceholder;
  }

  if (typeof options.cacheBust === "undefined") {
    domtoimage.impl.options.cacheBust = defaultOptions.cacheBust;
  } else {
    domtoimage.impl.options.cacheBust = options.cacheBust;
  }

  if (typeof options.useCredentials === "undefined") {
    domtoimage.impl.options.useCredentials = defaultOptions.useCredentials;
  } else {
    domtoimage.impl.options.useCredentials = options.useCredentials;
  }
}

function draw(domNode: any, options: any) {
  return toSvg(domNode, options)
    .then(util.makeImage)
    .then(util.delay(0))
    .then(function (image) {
      const scale = typeof options.scale !== "number" ? 1 : options.scale;
      const canvas = newCanvas(domNode, scale);
      const ctx: any = canvas.getContext("2d");
      ctx.mozImageSmoothingEnabled = false;
      ctx.msImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;
      if (image) {
        ctx.scale(scale, scale);
        ctx.drawImage(image, 0, 0);
      }
      return canvas;
    });

  function newCanvas(node: any, scale: any) {
    var canvas = document.createElement("canvas");
    canvas.width = (options.width || util.width(node)) * scale;
    canvas.height = (options.height || util.height(node)) * scale;

    if (options.bgcolor) {
      const ctx: any = canvas.getContext("2d");
      ctx.fillStyle = options.bgcolor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    return canvas;
  }
}

function cloneNode(node: any, filter: any, root: any, vector: any) {
  if (!root && filter && !filter(node)) return Promise.resolve();

  return Promise.resolve(node)
    .then(makeNodeCopy)
    .then(function (clone) {
      return cloneChildren(node, clone);
    })
    .then(function (clone) {
      return processClone(node, clone, vector);
    });

  function makeNodeCopy(original: any) {
    if (original instanceof HTMLCanvasElement)
      return util.makeImage(original.toDataURL());
    // if (original.nodeName === "IFRAME") {
    //   return html2canvas(original.contentDocument.body)
    //     .then((canvas: any) => {
    //       return canvas.toDataURL();
    //     })
    //     .then(util.makeImage);
    // }
    return original.cloneNode(false);
  }

  function cloneChildren(original: any, clone: any) {
    var children = original.childNodes;
    if (children.length === 0) return Promise.resolve(clone);

    return cloneChildrenInOrder(clone, util.asArray(children)).then(
      function () {
        return clone;
      },
    );

    function cloneChildrenInOrder(parent: any, childs: any) {
      var done = Promise.resolve();
      childs.forEach(function (child: any) {
        done = done
          .then(function () {
            return cloneNode(child, filter, false, vector);
          })
          .then(function (childClone) {
            if (childClone) parent.appendChild(childClone);
          });
      });
      return done;
    }
  }

  function processClone(original: any, clone: any, vector: any) {
    if (!(clone instanceof Element)) return clone;

    return Promise.resolve()
      .then(cloneStyle)
      .then(clonePseudoElements)
      .then(copyUserInput)
      .then(fixSvg)
      .then(function () {
        return clone;
      });

    function cloneStyle() {
      if (vector) {
        copyStyle(getUserComputedStyle(original, root), clone.style);
      } else {
        copyStyle(getComputedStyle(original), clone.style);
      }

      function copyFont(source: any, target: any) {
        target.font = source.font;
        target.fontFamily = source.fontFamily;
        target.fontFeatureSettings = source.fontFeatureSettings;
        target.fontKerning = source.fontKerning;
        target.fontSize = source.fontSize;
        target.fontStretch = source.fontStretch;
        target.fontStyle = source.fontStyle;
        target.fontVariant = source.fontVariant;
        target.fontVariantCaps = source.fontVariantCaps;
        target.fontVariantEastAsian = source.fontVariantEastAsian;
        target.fontVariantLigatures = source.fontVariantLigatures;
        target.fontVariantNumeric = source.fontVariantNumeric;
        target.fontVariationSettings = source.fontVariationSettings;
        target.fontWeight = source.fontWeight;
      }

      function copyStyle(source: any, target: any) {
        if (source.cssText) {
          target.cssText = source.cssText;
          copyFont(source, target); // here we re-assign the font props.
        } else copyProperties(source, target);

        function copyProperties(from: any, to: any) {
          util.asArray(from).forEach(function (name) {
            to.setProperty(
              name,
              from.getPropertyValue(name),
              from.getPropertyPriority(name),
            );
          });

          // Remove positioning of root elements, which stops them from being captured correctly
          if (root) {
            ["inset-block", "inset-block-start", "inset-block-end"].forEach(
              (prop) => target.removeProperty(prop),
            );
            ["left", "right", "top", "bottom"].forEach((prop) => {
              if (target.getPropertyValue(prop)) {
                target.setProperty(prop, "0px");
              }
            });
          }
        }
      }
    }

    function clonePseudoElements() {
      [":before", ":after"].forEach(function (element) {
        clonePseudoElement(element);
      });

      function clonePseudoElement(element: any) {
        var style = getComputedStyle(original, element);
        var content = style.getPropertyValue("content");

        if (content === "" || content === "none") return;

        var className = util.uid();
        var currentClass = clone.getAttribute("class");
        if (currentClass) {
          clone.setAttribute("class", currentClass + " " + className);
        }

        var styleElement = document.createElement("style");
        styleElement.appendChild(formatPseudoElementStyle());
        clone.appendChild(styleElement);

        function formatPseudoElementStyle() {
          var selector = "." + className + ":" + element;
          var cssText = style.cssText ? formatCssText() : formatCssProperties();
          return document.createTextNode(selector + "{" + cssText + "}");

          function formatCssText() {
            return (
              style.cssText +
              " content: " +
              style.getPropertyValue("content") +
              ";"
            );
          }

          function formatCssProperties() {
            return util.asArray(style).map(formatProperty).join("; ") + ";";

            function formatProperty(name: any) {
              return (
                name +
                ": " +
                style.getPropertyValue(name) +
                (style.getPropertyPriority(name) ? " !important" : "")
              );
            }
          }
        }
      }
    }

    function copyUserInput() {
      if (original instanceof HTMLTextAreaElement)
        clone.innerHTML = original.value;
      if (original instanceof HTMLInputElement)
        clone.setAttribute("value", original.value);
    }

    function fixSvg() {
      if (!(clone instanceof SVGElement)) return;
      clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");

      if (!(clone instanceof SVGRectElement)) return;
      ["width", "height"].forEach(function (attribute) {
        var value = clone.getAttribute(attribute);
        if (!value) return;

        clone.style.setProperty(attribute, value);
      });
    }
  }
}

function embedFonts(node: any) {
  return fontFaces.resolveAll().then(function (cssText) {
    var styleNode = document.createElement("style");
    node.appendChild(styleNode);
    styleNode.appendChild(document.createTextNode(cssText));
    return node;
  });
}

function inlineImages(node: any) {
  return images.inlineAll(node).then(function () {
    return node;
  });
}

function makeSvgDataUri(node: any, width: any, height: any) {
  return Promise.resolve(node)
    .then(function (svg) {
      svg.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
      return new XMLSerializer().serializeToString(svg);
    })
    .then(util.escapeXhtml)
    .then(function (xhtml) {
      return (
        '<foreignObject x="0" y="0" width="100%" height="100%">' +
        xhtml +
        "</foreignObject>"
      );
    })
    .then(function (foreignObject) {
      return (
        '<svg xmlns="http://www.w3.org/2000/svg" width="' +
        width +
        '" height="' +
        height +
        '">' +
        foreignObject +
        "</svg>"
      );
    })
    .then(function (svg) {
      return "data:image/svg+xml;charset=utf-8," + svg;
    });
}

function newUtil() {
  return {
    escape: escape,
    parseExtension: parseExtension,
    mimeType: mimeType,
    dataAsUrl: dataAsUrl,
    isDataUrl: isDataUrl,
    canvasToBlob: canvasToBlob,
    resolveUrl: resolveUrl,
    getAndEncode: getAndEncode,
    uid: uid(),
    delay: delay,
    asArray: asArray,
    escapeXhtml: escapeXhtml,
    makeImage: makeImage,
    width: width,
    height: height,
  };

  function mimes(): any {
    /*
     * Only WOFF and EOT mime types for fonts are 'real'
     * see http://www.iana.org/assignments/media-types/media-types.xhtml
     */
    var WOFF = "application/font-woff";
    var JPEG = "image/jpeg";

    return {
      woff: WOFF,
      woff2: WOFF,
      ttf: "application/font-truetype",
      eot: "application/vnd.ms-fontobject",
      png: "image/png",
      jpg: JPEG,
      jpeg: JPEG,
      gif: "image/gif",
      tiff: "image/tiff",
      svg: "image/svg+xml",
    };
  }

  function parseExtension(url: string) {
    var match = /\.([^\.\/]*?)(\?|$)/g.exec(url);
    if (match) return match[1];
    else return "";
  }

  function mimeType(url: string) {
    var extension = parseExtension(url).toLowerCase();
    return mimes()[extension] || "";
  }

  function isDataUrl(url: string) {
    return url.search(/^(data:)/) !== -1;
  }

  function asBlob(canvas: any) {
    return new Promise(function (resolve) {
      var binaryString = atob(canvas.toDataURL().split(",")[1]);
      var length = binaryString.length;
      var binaryArray = new Uint8Array(length);

      for (var i = 0; i < length; i++)
        binaryArray[i] = binaryString.charCodeAt(i);

      resolve(
        new Blob([binaryArray], {
          type: "image/png",
        }),
      );
    });
  }

  function canvasToBlob(canvas: any) {
    if (canvas.toBlob)
      return new Promise(function (resolve) {
        canvas.toBlob(resolve);
      });

    return asBlob(canvas);
  }

  function resolveUrl(url: string, baseUrl: string) {
    var doc = document.implementation.createHTMLDocument();
    var base = doc.createElement("base");
    doc.head.appendChild(base);
    var a = doc.createElement("a");
    doc.body.appendChild(a);
    base.href = baseUrl;
    a.href = url;
    return a.href;
  }

  function uid() {
    var index = 0;

    return function () {
      return "u" + fourRandomChars() + index++;

      function fourRandomChars() {
        /* see http://stackoverflow.com/a/6248722/2519373 */
        return (
          "0000" + ((Math.random() * Math.pow(36, 4)) << 0).toString(36)
        ).slice(-4);
      }
    };
  }

  function makeImage(uri: string) {
    if (uri === "data:,") return Promise.resolve();
    return new Promise(function (resolve, reject) {
      var image = new Image();
      if (domtoimage.impl.options.useCredentials) {
        image.crossOrigin = "use-credentials";
      }
      image.onload = function () {
        resolve(image);
      };
      image.onerror = reject;
      image.src = uri;
    });
  }

  function getAndEncode(url: string) {
    if (domtoimage.impl.options.cacheBust) {
      // Cache bypass so we dont have CORS issues with cached images
      // Source: https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache
      url += (/\?/.test(url) ? "&" : "?") + new Date().getTime();
    }

    return new Promise(function (resolve) {
      var httpTimeout = domtoimage.impl.options.httpTimeout;
      var request = new XMLHttpRequest();

      request.onreadystatechange = done;
      request.ontimeout = timeout;
      request.responseType = "blob";
      request.timeout = httpTimeout;
      if (domtoimage.impl.options.useCredentials) {
        request.withCredentials = true;
      }
      request.open("GET", url, true);
      request.send();

      let placeholder: any;
      if (domtoimage.impl.options.imagePlaceholder) {
        var split = domtoimage.impl.options.imagePlaceholder.split(/,/);
        if (split && split[1]) {
          placeholder = split[1];
        }
      }

      function done() {
        if (request.readyState !== 4) return;

        if (request.status !== 200) {
          if (placeholder) {
            resolve(placeholder);
          } else {
            fail(
              "cannot fetch resource: " + url + ", status: " + request.status,
            );
          }

          return;
        }

        const encoder: any = new FileReader();
        encoder.onloadend = function () {
          var content = encoder.result?.split(/,/)[1];
          resolve(content);
        };
        encoder.readAsDataURL(request.response);
      }

      function timeout() {
        if (placeholder) {
          resolve(placeholder);
        } else {
          fail(
            "timeout of " +
              httpTimeout +
              "ms occured while fetching resource: " +
              url,
          );
        }
      }

      function fail(message: any) {
        console.error(message);
        resolve("");
      }
    });
  }

  function dataAsUrl(content: any, type: any) {
    return "data:" + type + ";base64," + content;
  }

  function escape(string: string) {
    return string.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  }

  function delay(ms: number) {
    return function (arg: any) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve(arg);
        }, ms);
      });
    };
  }

  function asArray(arrayLike: any) {
    var array = [];
    var length = arrayLike.length;
    for (var i = 0; i < length; i++) array.push(arrayLike[i]);
    return array;
  }

  function escapeXhtml(string: any) {
    return string
      .replace(/%/g, "%25")
      .replace(/#/g, "%23")
      .replace(/\n/g, "%0A");
  }

  function width(node: any) {
    var leftBorder = px(node, "border-left-width");
    var rightBorder = px(node, "border-right-width");
    return node.scrollWidth + leftBorder + rightBorder;
  }

  function height(node: any) {
    var topBorder = px(node, "border-top-width");
    var bottomBorder = px(node, "border-bottom-width");
    return node.scrollHeight + topBorder + bottomBorder;
  }

  function px(node: any, styleProperty: any) {
    var value = getComputedStyle(node).getPropertyValue(styleProperty);
    return parseFloat(value.replace("px", ""));
  }
}

function newInliner() {
  var URL_REGEX = /url\(['"]?([^'"]+?)['"]?\)/g;

  return {
    inlineAll: inlineAll,
    shouldProcess: shouldProcess,
    impl: {
      readUrls: readUrls,
      inline: inline,
    },
  };

  function shouldProcess(string: any) {
    return string.search(URL_REGEX) !== -1;
  }

  function readUrls(string: any) {
    var result = [];
    var match;
    while ((match = URL_REGEX.exec(string)) !== null) {
      result.push(match[1]);
    }
    return result.filter(function (url) {
      return !util.isDataUrl(url);
    });
  }

  function inline(string: any, url: any, baseUrl: any, get: any) {
    return Promise.resolve(url)
      .then(function (urlValue) {
        return baseUrl ? util.resolveUrl(urlValue, baseUrl) : urlValue;
      })
      .then(get || util.getAndEncode)
      .then(function (data) {
        return util.dataAsUrl(data, util.mimeType(url));
      })
      .then(function (dataUrl) {
        return string.replace(urlAsRegex(url), "$1" + dataUrl + "$3");
      });

    function urlAsRegex(urlValue: any) {
      return new RegExp(
        "(url\\(['\"]?)(" + util.escape(urlValue) + ")(['\"]?\\))",
        "g",
      );
    }
  }

  function inlineAll(string: any, baseUrl: any, get: any) {
    if (nothingToInline()) return Promise.resolve(string);

    return Promise.resolve(string)
      .then(readUrls)
      .then(function (urls) {
        var done = Promise.resolve(string);
        urls.forEach(function (url) {
          done = done.then(function (prefix) {
            return inline(prefix, url, baseUrl, get);
          });
        });
        return done;
      });

    function nothingToInline() {
      return !shouldProcess(string);
    }
  }
}

function newFontFaces() {
  return {
    resolveAll: resolveAll,
    impl: {
      readAll: readAll,
    },
  };

  function resolveAll() {
    return readAll()
      .then(function (webFonts) {
        return Promise.all(
          webFonts.map(function (webFont: any) {
            return webFont.resolve();
          }),
        );
      })
      .then(function (cssStrings) {
        return cssStrings.join("\n");
      });
  }

  function readAll() {
    return Promise.resolve(util.asArray(document.styleSheets))
      .then(getCssRules)
      .then(selectWebFontRules)
      .then(function (rules) {
        return rules.map(newWebFont);
      });

    function selectWebFontRules(cssRules: any) {
      return cssRules
        .filter(function (rule: any) {
          return rule.type === CSSRule.FONT_FACE_RULE;
        })
        .filter(function (rule: any) {
          return inliner.shouldProcess(rule.style.getPropertyValue("src"));
        });
    }

    function getCssRules(styleSheets: any) {
      var cssRules: any = [];
      styleSheets.forEach(function (sheet: any) {
        if (Object.getPrototypeOf(sheet).hasOwnProperty("cssRules")) {
          try {
            util
              .asArray(sheet.cssRules || [])
              .forEach(cssRules.push.bind(cssRules));
          } catch (e: any) {
            console.log(
              "Error while reading CSS rules from " + sheet.href,
              e.toString(),
            );
          }
        }
      });
      return cssRules;
    }

    function newWebFont(webFontRule: any) {
      return {
        resolve: function resolve() {
          var baseUrl = (webFontRule.parentStyleSheet || {}).href;
          return inliner.inlineAll(webFontRule.cssText, baseUrl, null);
          // HHL NULL
        },
        src: function () {
          return webFontRule.style.getPropertyValue("src");
        },
      };
    }
  }
}

function newImages() {
  return {
    inlineAll: inlineAll,
    impl: {
      newImage: newImage,
    },
  };

  function newImage(element: any) {
    return {
      inline: inline,
    };

    function inline(get: any) {
      if (util.isDataUrl(element.src)) return Promise.resolve();

      return Promise.resolve(element.src)
        .then(get || util.getAndEncode)
        .then(function (data) {
          return util.dataAsUrl(data, util.mimeType(element.src));
        })
        .then(function (dataUrl) {
          return new Promise(function (resolve) {
            element.onload = resolve;
            // for any image with invalid src(such as <img src />), just ignore it
            element.onerror = resolve;
            element.src = dataUrl;
          });
        });
    }
  }

  function inlineAll(node: any): any {
    if (!(node instanceof Element)) return Promise.resolve(node);

    return inlineBackground(node).then(function () {
      if (node instanceof HTMLImageElement) return newImage(node).inline(null);
      // HHL null
      else
        return Promise.all(
          util.asArray(node.childNodes).map(function (child) {
            return inlineAll(child);
          }),
        );
    });

    function inlineBackground(backgroundNode: any) {
      var background: any = backgroundNode.style.getPropertyValue("background");

      if (!background) return Promise.resolve(backgroundNode);

      return (
        inliner
          .inlineAll(background, null, null)
          // HHL null
          .then(function (inlined) {
            backgroundNode.style.setProperty("background", inlined, background);
          })
          .then(function () {
            return backgroundNode;
          })
      );
    }
  }
}

function getUserComputedStyle(element: any, root: any) {
  var clonedStyle = document.createElement(element.tagName).style;
  var computedStyles: any = getComputedStyle(element);
  var inlineStyles = element.style;

  for (var style of computedStyles) {
    var value = computedStyles.getPropertyValue(style);
    var inlineValue = inlineStyles.getPropertyValue(style);

    inlineStyles.setProperty(style, root ? "initial" : "unset");
    var initialValue = computedStyles.getPropertyValue(style);

    if (initialValue !== value) {
      clonedStyle.setProperty(style, value);
    } else {
      clonedStyle.removeProperty(style);
    }

    inlineStyles.setProperty(style, inlineValue);
  }

  return clonedStyle;
}

export const domtoimage = {
  toSvg: toSvg,
  toPng: toPng,
  toJpeg: toJpeg,
  toBlob: toBlob,
  toPixelData: toPixelData,
  toCanvas: toCanvas,
  impl: {
    fontFaces: fontFaces,
    images: images,
    util: util,
    inliner: inliner,
    options: {} as any,
  },
};

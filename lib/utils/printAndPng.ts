let domI: any;

async function getDomI() {
  if (domI) {
    return domI;
  } else {
    return import("./domToImage").then((di) => {
      return di.domtoimage;
    });
  }
}

export async function savePng(dom: HTMLElement, name: string = "Dom Image") {
  const di = await getDomI();
  di.toPng(dom, null).then(function (dataUrl: any) {
    var link = document.createElement("a");
    link.download = name + ".png";
    link.href = dataUrl;
    link.click();
  });
}

export async function printDom(dom: HTMLElement, name: string = "Dom Image") {
  const di = await getDomI();
  di.toPng(dom, null).then(function (dataUrl: any) {
    const WinPrint: any = window.open("", "", "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0");

    WinPrint.document.write(`<!DOCTYPE html>
  <html>
    <head>
      <style>
        img {
          width:100%;
          height:100%;
        }
        div.printFooter {
          padding: 0 0 3px 2px;
        }
      </style>
    </head>
    <body>
    <div class="printFooter">${name}</div>
    </body>
  </html>`);
    var img = new Image();
    img.src = dataUrl;
    WinPrint.document.body.appendChild(img);
    setTimeout(() => {
      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      setTimeout(() => {
        WinPrint.close();
      }, 90);
    }, 90);
  });
}

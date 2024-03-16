## main.ts

This is how I define my main.css when using Tailwind.<br>

<br>


```js

    @import "tailwindcss/preflight" layer(base);
    @import "hhl-ui/styles/tailwind.css" layer(hhl-components);
    @import "tailwindcss/utilities" layer(utilities);
    @import "tailwindcss/theme" layer(theme);

    @theme {
      --color-*: initial;
      --color-pri: var(--col-pri, #027bfd);
      --color-sec: var(--col-sec, #6c757d);
      --color-ok: var(--col-ok, #28a745);
      --color-err: var(--col-err, #dc3545);
      --color-warn: var(--col-warn, #ffc107);
      --color-info: var(--col-info, #17a2b8);

      --color-txt0: var(--col-txt-0);
      --color-txt1: var(--col-txt-1);
      --color-txt2: var(--col-txt-2);
      --color-txt3: var(--col-txt-3);
      --color-txt4: var(--col-txt-4);
      --color-txt5: var(--col-txt-5);
      --color-txt6: var(--col-txt-6);

      --color-bg0: var(--col-bg-0);
      --color-bg1: var(--col-bg-1);
      --color-bg2: var(--col-bg-2);
      --color-bg3: var(--col-bg-3);
      --color-bg4: var(--col-bg-4);
      --color-bg5: var(--col-bg-5);
      --color-bg6: var(--col-bg-6);
      --color-black: black;
      --color-white: white;
    }

    html,
    body {
      margin: 0;
      padding: 0;
      background-color: var(--col-bg-0);
      height: 100vh;
      color: var(--col-txt-0);
      border-radius: 4px;
    }


```

## Tsconfig

```js
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ESNext", "DOM", "DOM.Iterable"],
    "types": ["hhl-ui", "unplugin-vue-router/client"],
    "skipLibCheck": true,

    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",

    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": [
    "env.d.ts",
    "src/**/*",
    "src/**/*.vue",
    "hhl-ui/**/*.vue",
    "components.d.ts",
    "auto-imports.d.ts",
    "./typed-router.d.ts"
  ],
  "references": [{ "path": "./tsconfig.node.json" }]
}


```
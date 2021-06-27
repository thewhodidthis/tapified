## about

A test harness that is smaller than [tape](https://github.com/substack/tape) and can be used in-browser directly.

## setup

Download from the _npm_ registry for Node.js:

```sh
# Add to package.json
npm install tapeless --save-dev
```

Source from an [import map](https://github.com/WICG/import-maps) for Deno:

```json
{
  "imports": {
    "likewise": "https://cdn.jsdelivr.net/npm/likewise@latest/main.js",
    "tapeling": "https://cdn.jsdelivr.net/npm/tapeling@latest/main.js"
  }
}
```

## usage

The assertions provided are `ok()` and `equal()` plus counterparts. Add [kpow](https://npm.im/kpow) and [cutaway](https://npm.im/cutaway) to run browser-side. For example, given a test script like:

```js
// Sample test.js
import "cutaway"
import { assert, report } from "tapeless"

const { equal: same, ok } = assert

const sample = { a: "a", b: "b" }
const id = (input = sample) => input

same.test(typeof id, "function")
ok.test(sample)
same.test(sample, id())

report()
```

Bundling along the lines of:

```sh
npx -p kpow -p rollup -p @rollup/plugin-node-resolve -c \
'rollup -p node-resolve -f iife test.js | kpow'
```

Produces the following report:

![TAP in HTML sample](https://i.imgur.com/A2bwjDX.png)

## see also

- [likewise](https://github.com/thewhodidthis/likewise)
- [tapeling](https://github.com/thewhodidthis/tapeling)

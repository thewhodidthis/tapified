## about

A [tape](https://github.com/substack/tape) inspired test harness to combine the Node.js built-in [assert](https://nodejs.org/api/assert.html) module with [likewise](https://npm.im/likewise) on the browser side using the [tapeling](https://npm.im/tapeling) [TAP](https://testanything.org) reporter.

## setup

Download the [latest stable version](https://npm.im/tapeless) from the _npm_ registry:

```sh
# Add to 'package.json' development dependencies
npm install tapeless --save-dev
```

## usage

In Node.js all of `assert` is wrapped a-la [tapjs/tapsert](https://github.com/tapjs/tapsert) making a range of involved checks available. For example,

```js
const { deepStrictEqual, equal, doesNotThrow, ok } = require('tapeless')
const sample = { a: 'a', b: 'b' }
const id = (input = sample) => input

equal.test(typeof id, 'function')
doesNotThrow.test(id)
ok.test(sample)
deepStrictEqual.test(sample, id())
```

Giving TAP results of:

```console
TAP version 13
ok 1 - equal
ok 2 - doesNotThrow
ok 3 - ok
ok 4 - deepStrictEqual

1..4
# tests 4
# pass  4
```

Assertions provided on the browser side include just the basics `ok()` and `equal()` plus counterparts. Add [kpow](https://npm.im/kpow) and [cutaway](https://npm.im/cutaway) to generate HTML formatted TAP output. For example, given a test script like:

```js
// Sample test.js
import 'cutaway'
import { report, assert } from 'tapeless/browser'

const { equal: same, ok } = assert

const sample = { a: 'a', b: 'b' }
const id = (input = sample) => input

same.test(typeof id, 'function')
ok.test(sample)
same.test(sample, id())

report()
```

Bundling along the lines of:

```sh
npx -p kpow -p rollup -p @rollup/plugin-node-resolve -c \
'rollup -p node-resolve -f iife test.js | kpow'
```

Results in the following HTML report:

![TAP in HTML sample](https://i.imgur.com/A2bwjDX.png)

## see also

- [likewise](https://github.com/thewhodidthis/likewise)
- [tapeling](https://github.com/thewhodidthis/tapeling)

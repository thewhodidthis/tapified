## about

Combines the Node.js built-in [assert](https://nodejs.org/api/assert.html) module with [likewise](https://npm.im/likewise) on the browser side using [tapeling](https://npm.im/tapeling) to produce [TAP](https://testanything.org) reports; [substack/tape](https://github.com/substack/tape) inspired, but smaller.

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

Assertions provided browser side include just the basics `ok()` and `equal()` plus counterparts. Add [cutaway](https://npm.im/cutaway) to generate HTML formatted TAP output. Given the following document for example,

```html
<!-- test.html -->
<body>
  <script src="test.js"></script>
</body>
```

With a test script of:

```js
// Sample test.js
import 'cutaway'
import { report, assert } from 'tapeless'

const { equal: same, ok } = assert

const sample = { a: 'a', b: 'b' }
const id = (input = sample) => input

same.test(typeof id, 'function')
ok.test(sample)
same.test(sample, id())

report()
```

Run `npx parcel test.html` to get something like:

![TAP in HTML sample](https://i.imgur.com/OGTDwYc.png)

## see also

- [likewise](https://github.com/thewhodidthis/likewise)
- [tapeling](https://github.com/thewhodidthis/tapeling)

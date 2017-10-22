'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tapeling = require('tapeling');
var likewise = require('likewise');

const tap = tapeling.tape(likewise.assert, 2);

for (const fn in likewise.assert) {
  const t = likewise.assert[fn];

  tap[fn] = tapeling.tape(t, t.length + 1);
}

exports.report = tapeling.bill;
exports.assert = tap;

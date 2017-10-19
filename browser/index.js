'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var assert = require('likewise');
var tapeling = require('tapeling');

const tap = tapeling.tape(assert);

for (const fn in assert) {
  tap[fn] = tapeling.tape(assert[fn]);
}

exports.assert = tap;
exports.report = tapeling.bill;

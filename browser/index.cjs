'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const tapeling = require('tapeling');
const likewise = require('likewise');

const tap = tapeling.tape(likewise.assert);

for (const fn in likewise.assert) {
  tap[fn] = tapeling.tape(likewise.assert[fn]);
}

exports.report = tapeling.exit;
exports.assert = tap;

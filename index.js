'use strict';

var tapeling = require('tapeling');
var assert = require('assert');

process.on('exit', tapeling.bill);

const tap = tapeling.tape(assert);

for (const fn in assert) {
  tap[fn] = tapeling.tape(assert[fn]);
}

module.exports = tap;

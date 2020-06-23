'use strict';

const tapeling = require('tapeling');
const assert = require('assert');

const tap = tapeling.tape(assert);

for (const fn in assert) {
  tap[fn] = tapeling.tape(assert[fn]);
}

process.on('exit', tapeling.exit);

module.exports = tap;

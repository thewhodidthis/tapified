'use strict';

var tapeling = require('tapeling');
var assert = require('assert');

process.on('exit', (code) => {
  const { flops } = tapeling.stat();

  tapeling.bill(code);

  if (!code && flops) {
    process.exit(flops);
  }
});

const tap = tapeling.tape(assert);

for (const fn in assert) {
  tap[fn] = tapeling.tape(assert[fn]);
}

module.exports = tap;

'use strict'

// Adapted from tapjs/tapsert
const { execFile } = require('child_process')
const { execPath } = process

const assert = require('./')

const assertHeader = (stdout, extra) => {
  assert(stdout.startsWith('TAP version 13'), 'TAP version header comes on top', extra)
}

assert(assert, 'assert exists')
assert(assert.equal, 'assert.equal exists')

assert('truthy, not a description')

assert.equal('skip description', 'skip description')
assert.equal(typeof assert.strictEqual, 'function', 'assert.strictEqual is a function')

assert.doesNotThrow(() => {
  assert.throws(() => {
    throw Error('expected!')
  }, /expected/, 'supports assert.throws')
}, Error, 'are nested asserts really that weird?')

const ego = require.resolve('./')

execFile(execPath, [ego], (error, stdout, stderr) => {
  assertHeader(stdout, 'no assertions')

  assert.equal(stderr, '', 'does not write to stderr')

  assert.equal(stdout.includes('Bail out!'), false, 'does not exit prematurely')
  assert.equal(error, null, 'unlike tapsert no assertions ran is no failure')
  assert(stdout.includes('# tests 0'), 'includes bill')
})

const bad = require.resolve('./example/bail.js')

execFile(execPath, [bad], (error, stdout, stderr) => {
  assertHeader(stdout, 'example bails (bad)')

  assert.notEqual(stderr, '', 'does not clear stderr')

  assert(stdout.includes('Bail out!'), 'does exit prematurely')
  assert(error, 'does exit with a non-zero error code')

  assert.equal(stdout.includes('# tests 0'), false, 'excludes bill')
})

const tip = require.resolve('./example')

execFile(execPath, [tip], (error, stdout, stderr) => {
  assertHeader(stdout, 'example fails')

  assert.equal(stderr, '', 'does not write to stderr')

  assert(stdout.includes('1..6'), 'has TAP plan')
  assert(stdout.includes('# tests 6'), 'has 6 tests total')
  assert(stdout.includes('# pass  5'), 'has 5 passing tests')
  assert(stdout.includes('# fail  1'), 'has 1 failing test')

  assert.equal(error, null, 'unlike tapsert mess not with exit code on failure')
})

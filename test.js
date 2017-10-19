'use strict'

// Stolen from tapjs/tapsert
const { execFile } = require('child_process')
const { execPath } = process

const assert = require('./')

const assertHeader = (stdout, extra) => {
  assert(stdout.startsWith('TAP version 13'), 'TAP version header comes on top', extra)
}

assert(assert, 'assert exists')
assert(assert.equal, 'assert.equal exists')

assert('truthy, not a description')

assert.equal('auto description', 'auto description')
assert.equal(typeof assert.strictEqual, 'function', 'assert.strictEqual is a function')

assert.doesNotThrow(() => {
  assert.throws(() => {
    throw Error('expected!')
  }, /expected/, 'supports assert.throws')
}, 'nested asserts are weird')

const ego = require.resolve('./')

execFile(execPath, [ego], (error, stdout, stderr) => {
  assertHeader(stdout, 'no assertions')
  assert(error, 'not unlike tapsert no assertions run is no failure')

  assert.equal(stderr, '', 'does not write to stderr')
  assert.equal(stdout.includes('Bail out!'), false, 'does not exit prematurely')

  assert(stdout.includes('# tests 0'), 'includes bill')
})

const tip = require.resolve('./example/dump.js')

execFile(execPath, [tip], (error, stdout, stderr) => {
  assertHeader(stdout, 'failing example')

  assert(error, 'example fails and exits with non-zero error code')
  assert.equal(stderr, '', 'does not write to stderr')

  assert(stdout.includes('1..6'), 'has TAP plan')
  assert(stdout.includes('# tests 6'), 'has 6 tests total')
  assert(stdout.includes('# pass  5'), 'has 5 passing tests')
  assert(stdout.includes('# fail  1'), 'has 1 failing test')
})

const bad = require.resolve('./example/bail.js')

execFile(execPath, [bad], (error, stdout, stderr) => {
  assertHeader(stdout, 'bad file')
  assert(error, 'bad file does exit with a non-zero error code')
  assert(stdout.includes('Bail out!'), 'does exit prematurely')

  assert.notEqual(stderr, '', 'does not clear stderr')
  assert(!stdout.includes('# tests 0'), 'excludes bill')
})

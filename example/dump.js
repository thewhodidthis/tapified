const assert = require('../')

assert(assert, 'assert exists')
assert(assert.equal, 'assert.equal exists')
assert.equal(typeof assert.strictEqual, 'function', 'assert.strictEqual is a function')

assert.ok(false, 'really want false to be true')

const nested = () => {
  assert.throws(() => {
    throw Error('expected!')
  }, /expected/, 'supports assert.throws')
}

assert.doesNotThrow(nested, 'nested asserts are weird')

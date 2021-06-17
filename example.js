import assert from "./main.js"

assert
  .describe("assert exists")
  .test(assert)
  .describe("assert.equal exists")
  .test(assert.equal)

assert.equal
  .describe("assert.strictEqual is a function")
  .test(typeof assert.strictEqual.test, "function")

assert.ok
  .describe("really want false to be true")
  .test(false)

const nested = () =>
  assert.throws
    .describe("support assert.throws")
    .test(() => {
      throw Error("expected!")
    }, /expected/)

assert.doesNotThrow
  .describe("nested asserts come last, so this gets ignored")
  .test(nested, Error)

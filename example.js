import { assert, report } from "./main.js"

assert
  .describe("assert exists")
  .test(assert)
  .describe("assert.equal exists")
  .test(assert.equal)

assert.equal
  .describe("assert.notOk is a function")
  .test(typeof assert.notOk.test, "function")

assert.ok
  .describe("really want false to be true")
  .test(false)

report()

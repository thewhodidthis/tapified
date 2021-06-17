// Adapted from tapjs/tapsert
import { execFile } from "child_process"
import { createRequire } from "module"
import { execPath } from "process"
import assert from "tapeless"

assert
  .describe("assert exists")
  .test(assert)
  .describe("assert.equal exists")
  .test(assert.equal)
  .test("truthy, not a description")

assert.equal
  .test("skip description", "skip description")
  .describe("assert.strictEqual is a function")
  .test(typeof assert.strictEqual.test, "function")

assert.doesNotThrow
  .describe("are nested asserts really that weird?")
  .test(() => {
    assert.throws
      .describe("support assert.throws")
      .test(() => {
        throw Error("expected!")
      }, /expected/)
  }, Error)

const require = createRequire(import.meta.url)
const main = require.resolve("./main.js")

execFile(execPath, [main], (error, stdout, stderr) => {
  assert
    .describe("TAP version header comes on top")
    .test(stdout.startsWith("TAP version 13"))
    .test(stdout.includes("# tests 0"))

  assert.equal
    .describe("does not write to stderr")
    .test(stderr, "")
    .describe("does not exit prematurely")
    .test(stdout.includes("Bail out!"), false)
    .describe("unlike tapsert no assertions ran is no failure", "no assertions")
    .test(error, null)
})

const bail = require.resolve("./bail.js")

execFile(execPath, [bail], (error, stdout, stderr) => {
  assert.notEqual
    .describe("does not clear stderr")
    .test(stderr, "")

  assert
    .describe("TAP version header comes on top")
    .test(stdout.startsWith("TAP version 13"))
    .describe("does exit prematurely")
    .test(stdout.includes("Bail out!"))
    .describe("does exit with a non-zero error code")
    .test(error)

  assert.equal
    .describe("excludes bill", "example bails (bad)")
    .test(stdout.includes("# tests 0"), false)
})

const example = require.resolve("./example.js")

execFile(execPath, [example], (error, stdout, stderr) => {
  assert.equal
    .describe("does not write to stderr")
    .test(stderr, "")

  assert
    .describe("has TAP plan")
    .test(stdout.includes("1..6"))
    .describe("has 6 tests total")
    .test(stdout.includes("# tests 6"))
    .describe("has 5 passing tests")
    .test(stdout.includes("# pass  5"))
    .describe("has 1 failing test")
    .test(stdout.includes("# fail  1"))

  assert.equal
    .describe("unlike tapsert mess not with exit code on failure", "example fails")
    .test(error, null)
})

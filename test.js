// Adapted from tapjs/tapsert
import { execFile } from "child_process"
import { createRequire } from "module"
import { execPath } from "process"
import { assert, report } from "./main.js"

process.on("exit", report)

assert
  .describe("assert exists")
  .test(assert)
  .describe("assert.equal exists")
  .test(assert.equal)
  .test("truthy, not a description")

assert.equal
  .test("skip description", "skip description")
  .describe("assert.ok is a function")
  .test(typeof assert.ok.test, "function")

const require = createRequire(import.meta.url)
const main = require.resolve("./main.js")

execFile(execPath, [main], (error, stdout, stderr) => {
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
    .test(stdout.includes("1..4"))
    .describe("has 4 tests total")
    .test(stdout.includes("# tests 4"))
    .describe("has 3 passing tests")
    .test(stdout.includes("# pass  3"))
    .describe("has 1 failing test")
    .test(stdout.includes("# fail  1"))

  assert.equal
    .describe("unlike tapsert mess not with exit code on failure", "example fails")
    .test(error, null)
})

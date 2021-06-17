import assert from "assert"
import process from "process"
import { exit, tape } from "tapeling"

process.on("exit", exit)

const tap = tape(assert)

for (const fn in assert) {
  if (fn !== "CallTracker" || fn !== "AssertionError") {
    tap[fn] = tape(assert[fn])
  }
}

export default tap

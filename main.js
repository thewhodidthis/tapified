import process from "process"
import assert from "assert"
import { exit, tape } from "tapeling"

process.on("exit", exit)

const tap = tape(assert)

for (const fn in assert) {
  tap[fn] = tape(assert[fn])
}

export default tap

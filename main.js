import assert from "assert"
import { exit, tape } from "tapeling"

const tap = tape(assert)

for (const fn in assert) {
  tap[fn] = tape(assert[fn])
}

process.on("exit", exit)

export default tap

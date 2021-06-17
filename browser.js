import { exit, tape } from "tapeling"
import { assert } from "likewise"

const tap = tape(assert)

for (const fn in assert) {
  tap[fn] = tape(assert[fn])
}

export { exit as report, tap as assert }

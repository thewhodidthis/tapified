import { assert } from "likewise"
import { exit, tape } from "tapeling"

const tap = tape(assert)

for (const fn in assert) {
  tap[fn] = tape(assert[fn])
}

export { exit as report, tap as assert }

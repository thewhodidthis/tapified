import { assert as axxert, reassert } from "likewise"
import { exit as report, tape } from "tapeling"

const assert = tape(axxert)

for (const x in axxert) {
  assert[x] = tape(axxert[x])
}

export { assert, reassert, report, tape }

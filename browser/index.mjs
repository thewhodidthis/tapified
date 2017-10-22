import { tape, bill } from 'tapeling'
import { assert } from 'likewise'

const tap = tape(assert, 2)

for (const fn in assert) {
  const t = assert[fn]

  tap[fn] = tape(t, t.length + 1)
}

export { bill as report, tap as assert }

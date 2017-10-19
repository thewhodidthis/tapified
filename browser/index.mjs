import assert from 'likewise'
import { tape, bill } from 'tapeling'

const tap = tape(assert)

for (const fn in assert) {
  tap[fn] = tape(assert[fn])
}

export { tap as assert, bill as report }

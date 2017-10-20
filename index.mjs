import { tape, bill } from 'tapeling'
import assert from 'assert'

process.on('exit', bill)

const tap = tape(assert)

for (const fn in assert) {
  tap[fn] = tape(assert[fn])
}

export default tap

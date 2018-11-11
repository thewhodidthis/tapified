import { tape, exit } from 'tapeling'
import assert from 'assert'

const tap = tape(assert)

for (const fn in assert) {
  tap[fn] = tape(assert[fn])
}

process.on('exit', exit)

export default tap

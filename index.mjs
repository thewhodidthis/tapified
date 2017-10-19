import { tape, bill, stat } from 'tapeling'
import assert from 'assert'

process.on('exit', (code) => {
  const { flops } = stat()

  bill(code)

  if (!code && flops) {
    process.exit(flops)
  }
})

const tap = tape(assert)

for (const fn in assert) {
  tap[fn] = tape(assert[fn])
}

export default tap

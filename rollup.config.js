const output = { file: 'index.js', format: 'cjs', interop: false }
const external = ['tapeling', 'assert', 'likewise']

const main = { output, input: 'index.mjs', external, preferConst: true }
const browser = { ...main, output: { ...output, dir: 'browser' }, input: 'browser/index.mjs' }

export default [main, browser]

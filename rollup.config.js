// Skip bundling these imports
const external = ['tapeling', 'assert', 'likewise']

const outputOptions = {
  format: 'cjs',
  externalLiveBindings: false,
  interop: false,
  preferConst: true
}

const main = {
  external,
  input: './index.mjs',
  output: {
    file: './index.js',
    ...outputOptions
  }
}

const browser = {
  external,
  input: './browser/index.mjs',
  output: {
    file: './browser/index.js',
    ...outputOptions
  }
}

export default [main, browser]

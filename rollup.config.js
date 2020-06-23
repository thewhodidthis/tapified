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
  input: './index.js',
  output: {
    file: './index.cjs',
    ...outputOptions
  }
}

const browser = {
  external,
  input: './browser/index.js',
  output: {
    file: './browser/index.cjs',
    ...outputOptions
  }
}

export default [main, browser]

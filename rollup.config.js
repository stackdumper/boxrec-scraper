import babel from 'rollup-plugin-babel'
import minify from 'rollup-plugin-babel-minify'
import externalBuiltins from 'builtin-modules'


export default {
  input: 'src/index.js',
  output: {
    file: 'build/index.js',
    format: 'cjs',
    interop: false,
    // sourcemap: 'inline',
  },
  external: [
    ...externalBuiltins,
    ...Object.keys(require('./package.json').dependencies)
  ],
  plugins: [
    babel(),
    (process.env.NODE_ENV === 'production' && minify()),
  ],
};

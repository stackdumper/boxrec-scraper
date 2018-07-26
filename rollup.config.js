import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';


export default {
  input: 'src/index.js',
  output: {
    file: 'build/index.js',
    format: 'cjs',
    interop: false,
  },
  plugins: [
    babel(),
    (process.env.NODE_ENV === 'production' && minify()),
  ],
};

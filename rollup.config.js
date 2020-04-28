import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const config = {
	input: 'index.js',
	output: [
		{
			file: 'bundle.js',
      format: 'cjs'
		},
	],
	plugins: [
    resolve({browser: true }),
    commonjs({
      namedExports: {
        // left-hand side can be an absolute path, a path
        // relative to the current directory, or the name
        // of a module in node_modules
        'phoenix': [ 'Socket' ]
      }
    }),
    babel({
      // exclude: 'node_modules/**'
    })
  ],
};

export default config;

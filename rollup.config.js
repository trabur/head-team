import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import builtins from 'rollup-plugin-node-builtins';

const config = {
	input: 'index.js',
	output: [
		{
			file: 'bundle.js',
      format: 'iife'
		},
		{
			file: 'node.js',
      format: 'umd'
		}
	],
	plugins: [
    builtins(),
    json(),
    replace({
      phoenix: 'phoenix-channels',
      exclude: 'bundle.js'
    }),
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

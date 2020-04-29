import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import builtins from 'rollup-plugin-node-builtins';

const browser = {
	input: 'index.js',
	output: [
		{
			file: 'bundle.js',
      format: 'iife'
		}
	],
	plugins: [
    replace({
      ['phoenix-channels']: 'phoenix'
    }),
    json(),
    builtins(),
    resolve({ browser: true }),
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

export default browser;

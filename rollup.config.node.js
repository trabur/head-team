import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import builtins from 'rollup-plugin-node-builtins';

const node = {
	input: 'index.js',
  external: [
    'liferaft',
    'phoenix-channels'
  ],
	output: [
		{
			file: 'node.js',
      format: 'umd',
      // globals: [ 'phoenix-channels', 'liferaft' ]
      globals: {
        'liferaft': 'Raft',
        'phoenix-channels': 'Phoenix'
      },
		}
	],
	plugins: [
    json(),
    replace({
      phoenix: 'phoenix-channels',
      exclude: 'bundle.js'
    }),
    builtins(),
    commonjs({
      namedExports: {
        // left-hand side can be an absolute path, a path
        // relative to the current directory, or the name
        // of a module in node_modules
        'phoenix-channels': [ 'Socket' ]
      }
    }),
    babel({
      // exclude: 'node_modules/**'
    })
  ],
};

export default node;

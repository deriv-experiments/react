import esbuild from 'esbuild';
import chokidar from 'chokidar';
import debounce from 'debounce';

async function build() {
  esbuild.buildSync({
    bundle: true,
    entryPoints: ['./src/worker.ts'],
    outdir: 'dist',
    loader: {
      '.ts': 'ts',
      '.tsx': 'tsx',
    },
    define: {
      'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"',
      'process.env.DERIV_WS_URL': '"' + process.env.DERIV_WS_URL + '"',
    },
    sourcemap: true
  });
}

if (process.argv[2] === '--watch' || process.argv[2] === '-w') {
  chokidar.watch('src/**/*', { ignoreInitial: false }).on('all', debounce(build, 100));
  console.log('watching for changes');
} else {
  build();
}

module.exports = {
  proxy: 'http://localhost:3000',
  files: [
    'public/**/*.css',
    'src/**/*.njk',
    'src/**/*.js',
    'src/**/*.html',
  ],
  port: 3001,
  open: false,
  notify: false,
  reloadOnRestart: true,
  reloadDelay: 1000, // Wait 1 second after server restarts
  reloadDebounce: 300,
  watchOptions: {
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 300,
      pollInterval: 100,
    },
  },
  // Force reload on all file changes
  injectChanges: false,
  // Watch for server restarts
  watch: true,
};


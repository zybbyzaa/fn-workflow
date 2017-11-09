var proxy = require('http-proxy-middleware');

module.exports = function(gulp, common) {
  gulp.task('start_server', function() {
    common.plugins.util.log('启动服务');
    common.browserSync.init({
      server: {
        baseDir: [
          common.config.paths.dist.root,
          `${common.config.paths.dist.root}/WEB-INF`
        ]
      },
      port: common.config['livereload']['port'] || 8080,
      middleware: [
        proxy(common.config['proxy']['path'], {
          target: common.config['proxy']['target'],
          changeOrigin: true, // for vhosted sites, changes host header to match to target's host
          logLevel: 'debug',
          pathRewrite: {}
        })
      ],
      startPath: common.config['livereload']['startPath'] || '/WEB-INF',
      reloadDelay: 0,
      notify: {
        //自定制livereload 提醒条
        styles: [
          'margin: 0',
          'padding: 5px',
          'position: fixed',
          'font-size: 10px',
          'z-index: 9999',
          'bottom: 0px',
          'right: 0px',
          'border-radius: 0',
          'border-top-left-radius: 5px',
          'background-color: rgba(60,197,31,0.5)',
          'color: white',
          'text-align: center'
        ]
      }
    });
  });
};

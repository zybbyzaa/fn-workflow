// 编译html文件
var lib = require('../util/lib');
var argv = require('yargs').argv;
var posthtmlPx2rem = require('posthtml-px2rem');
var path = require('path');
var merge2 = require('merge2');

module.exports = function(gulp, common) {
  gulp.task('compile_html', function(cb) {
    common.plugins.util.log('开始编译html');
    var srcPath = `${common.config.paths.src.root}${common.config.paths.src
      .json}/*.json`;
    var srcMobilePath = `${common.config.paths.src.root}${common.config.paths
      .src.jsonMobile}/*.json`;
    var distPath = `${common.config.paths.dist.root}${common.config.paths.dist
      .json}`;
    var distMobilePath = `${common.config.paths.dist.root}${common.config.paths
      .dist.jsonMobile}`;

    var htmlStream = gulp
      .src(srcPath)
      .pipe(common.plugins.plumber(lib.handleErrors))
      .pipe(common.plugins.changed(distPath))
      .pipe(common.plugins.logger({
        showChange: true
      }))
      .pipe(
        common.plugins.freemarker({
          viewRoot: path.join(process.cwd(), `src/pages/`),
          options: {}
        })
      )
      .pipe(
        common.plugins.rename({
          extname: '.htm'
        })
      )
      .pipe(gulp.dest(distPath));
    var htmlMobileStream = gulp
      .src(srcMobilePath)
      .pipe(common.plugins.plumber(lib.handleErrors))
      .pipe(common.plugins.changed(distMobilePath))
      .pipe(common.plugins.logger({
        showChange: true
      }))
      .pipe(
        common.plugins.freemarker({
          viewRoot: path.join(process.cwd(), `src/pages/`),
          options: {}
        })
      )
      .pipe(
        common.plugins.if(
          common.config.supportREM,
          common.plugins.posthtml(
            posthtmlPx2rem({
              rootValue: 100,
              minPixelValue: 2
            })
          )
        )
      )
      .pipe(
        common.plugins.if(
          argv.env == 'prod',
          common.plugins.rename({
            extname: '.shtml'
          })
        )
      )
      .pipe(gulp.dest(distMobilePath));
    return merge2(htmlStream, htmlMobileStream).on('end', function() {
      lib.task_log('compile_html');
      lib.reloadhandle();
    });
  });
};
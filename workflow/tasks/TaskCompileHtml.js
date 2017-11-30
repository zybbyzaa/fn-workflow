// 编译html文件
var path = require('path');
var merge2 = require('merge2');
var platform = require('yargs').argv.platform || 'all';
var lib = require('../util/lib');

module.exports = function(gulp, common) {
  gulp.task('compile_html', function(cb) {
    common.plugins.util.log('开始编译html');
    var changedFileName = common.changeFileName || '';
    var srcPath = `${common.config.paths.src.root}${changedFileName === ''
      ? common.config.paths.src.json
      : common.config.paths.src.json.replace(
          /\*\.json$/,
          `${changedFileName}.json`
        )}`;
    var srcMobilePath = `${common.config.paths.src.root}${changedFileName === ''
      ? common.config.paths.src.jsonMobile
      : common.config.paths.src.jsonMobile.replace(
          /\*\.json$/,
          `${changedFileName}.json`
        )}`;
    var srcCommonPath = [
      `${common.config.paths.src.root}${common.config.paths.src.htmlCommon}`
    ];
    var srcMobileCommonPath = [
      `${common.config.paths.src.root}${common.config.paths.src
        .htmlMobileCommon}`
    ];
    var distPath = `${common.config.paths.dist.root}${common.config.paths.dist
      .html}`;
    var distMobilePath = `${common.config.paths.dist.root}${common.config.paths
      .dist.htmlMobile}`;
    var distCommonPath = `${common.config.paths.dist.root}${common.config.paths
      .dist.htmlCommon}`;
    var distMobileCommonPath = `${common.config.paths.dist.root}${common.config
      .paths.dist.htmlMobileCommon}`;
    var htmlCommonStream = gulp
      .src(srcCommonPath)
      .pipe(common.plugins.plumber(lib.handleErrors))
      .pipe(common.plugins.changed(distCommonPath))
      .pipe(gulp.dest(distCommonPath));
    var htmlMobileCommonStream = gulp
      .src(srcMobileCommonPath)
      .pipe(common.plugins.plumber(lib.handleErrors))
      .pipe(common.plugins.changed(distMobileCommonPath))
      .pipe(gulp.dest(distMobileCommonPath));
    var htmlStream =
      platform !== 'mobile'
        ? gulp
            .src(srcPath)
            .pipe(common.plugins.plumber(lib.handleErrors))
            .pipe(common.plugins.changed(distPath))
            .pipe(
              common.plugins.logger({
                showChange: true
              })
            )
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
            .pipe(gulp.dest(distPath))
        : null;
    var htmlMobileStream =
      platform !== 'pc'
        ? gulp
            .src(srcMobilePath)
            .pipe(common.plugins.plumber(lib.handleErrors))
            .pipe(common.plugins.changed(distMobilePath))
            .pipe(
              common.plugins.logger({
                showChange: true
              })
            )
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
            .pipe(gulp.dest(distMobilePath))
        : null;

    if (platform === 'mobile') {
      return htmlMobileStream.on('end', onStreamEnd);
    } else if (platform === 'pc') {
      return htmlStream.on('end', onStreamEnd);
    } else {
      return merge2(
        htmlCommonStream,
        htmlMobileCommonStream,
        htmlStream,
        htmlMobileStream
      ).on('end', onStreamEnd);
    }
  });
};

function onStreamEnd() {
  lib.task_log('compile_html');
  lib.reloadhandle();
}

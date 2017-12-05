// 编译html文件
var path = require('path');
var merge2 = require('merge2');
var through = require('through2');
var argv = require('yargs').argv,
  platform = argv.platform || 'all';
var lib = require('../util/lib');

module.exports = function(gulp, common) {
  var config = common.config,
    plugins = common.plugins,
    changedFileName = common.changeFileName || '';
  gulp.task('compile_html', function(cb) {
    common.plugins.util.log('开始编译html');
    var isProd = argv.env === 'prod';
    var srcPath = isProd
      ? `${config.paths.src.root}/pages/**/*.{shtml,ftl}`
      : `${config.paths.src.root}/pages/**/*.json`;
    var destPath = `${config.paths.dist.root}/WEB-INF`;
    var changedFilter = plugins.filter(file => {
      return changedFileName === '' || file.path.indexOf(changedFileName) > 0;
    });
    return gulp
      .src(srcPath)
      .pipe(plugins.plumber(lib.handleErrors))
      .pipe(plugins.changed(destPath))
      .pipe(plugins.logger({ showChange: true }))
      .pipe(changedFilter)
      .pipe(
        plugins.if(
          !isProd,
          plugins.freemarker({
            viewRoot: path.join(process.cwd(), `src/pages/`),
            options: {}
          })
        )
      )
      .pipe(plugins.if(!isProd, plugins.rename({ extname: '.htm' })))
      .pipe(
        plugins.if(
          isProd,
          through.obj(function(file, enc, cb) {
            if (file.isNull()) {
              this.push(file);
              return cb();
            }
            if (file.isStream()) {
              return cb();
            }
            var content = file.contents
              .toString()
              .replace('<#import "/common/common.ftl" as s>', '');
            var reg = new RegExp(common.config.contentPath, 'g');
            content = content.replace(reg, '');
            file.contents = new Buffer(content);
            this.push(file);
            cb();
          })
        )
      )
      .pipe(gulp.dest(destPath))
      .on('end', function() {
        lib.task_log('compile_html');
        lib.reloadhandle();
      });
  });
};

// 编译js文件
var path = require('path');
var merge2 = require('merge2');
var through = require('through2');
var argv = require('yargs').argv,
  platform = argv.platform || 'all';
var lib = require('../util/lib');

module.exports = function(gulp, common) {
  var config = common.config,
    plugins = common.plugins;
  gulp.task('compile_js', function() {
    plugins.util.log('开始编译js');
    var isProd = argv.env === 'prod';
    var srcPath = `${config.paths.src.root}/js/**/*`;
    var destPath = `${config.paths.dist.root}/js`;
    var libFilter = plugins.filter(
      file => {
        return !/\\lib\\/.test(file.path);
      },
      { restore: true }
    );
    var modFilter = plugins.filter(
      file => {
        return !/(\\m)?\\mod\\/.test(file.path);
      },
      { restore: true }
    );
    var revFilter = plugins.filter(file => {
      return !/((\\m)?\\mod\\)|\\lib\\/.test(file.path);
    });

    return gulp
      .src(srcPath)
      .pipe(plugins.plumber(lib.handleErrors))
      .pipe(plugins.changed(destPath))
      .pipe(plugins.logger({ showChange: true }))
      .pipe(libFilter)
      .pipe(plugins.if(isProd, plugins.uglify()))
      .pipe(modFilter)
      .pipe(plugins.if(isProd, plugins.rev()))
      .pipe(
        through
          .obj(function(file, enc, cb) {
            if (file.isNull()) {
              this.push(file);
              return cb();
            }
            if (file.isStream()) {
              return cb();
            }
            cb();
          })
          .pipe(modFilter.restore)
          .pipe(libFilter.restore)
      )
      .pipe(gulp.dest(destPath))
      .pipe(revFilter)
      .pipe(plugins.if(isProd, plugins.rev.manifest()))
      .pipe(
        plugins.if(
          isProd,
          gulp.dest(`${config.paths.src.root}${config.paths.src.revDist}/js`)
        )
      )
      .on('end', function() {
        lib.task_log('compile_js');
        lib.reloadhandle();
      });
  });
};

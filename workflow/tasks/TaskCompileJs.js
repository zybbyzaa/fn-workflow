// 编译js文件
var path = require('path');
var merge2 = require('merge2');
var through = require('through2');
var argv = require('yargs').argv,
  platform = argv.platform || 'all';
var lib = require('../util/lib');

module.exports = function(gulp, common) {
  gulp.task('compile_js', function() {
    common.plugins.util.log('开始编译js');
    var isProd = argv.env === 'prod';
    var srcPath = `${common.config.paths.src.root}/js/**/*`;
    var distPath = `${common.config.paths.dist.root}/js`;
    var libFilter = common.plugins.filter(
      file => {
        return !/\\lib\\/.test(file.path);
      },
      { restore: true }
    );
    var modFilter = common.plugins.filter(
      file => {
        return !/(\\m)?\\mod\\/.test(file.path);
      },
      { restore: true }
    );
    var revFilter = common.plugins.filter(file => {
      return !/((\\m)?\\mod\\)|\\lib\\/.test(file.path);
    });

    return gulp
      .src(srcPath)
      .pipe(common.plugins.plumber(lib.handleErrors))
      .pipe(common.plugins.changed(distPath))
      .pipe(libFilter)
      .pipe(common.plugins.if(isProd, common.plugins.uglify()))
      .pipe(modFilter)
      .pipe(common.plugins.if(isProd, common.plugins.rev()))
      .pipe(
        through
          .obj(function(file, enc, cb) {
            if (file.isNull()) {
              this.push(file);
              return cb();
            }
            if (file.isStream()) {
              this.emit(
                'error',
                new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported')
              );
              return cb();
            }
            cb();
          })
          .pipe(modFilter.restore)
          .pipe(libFilter.restore)
      )
      .pipe(gulp.dest(distPath))
      .pipe(revFilter)
      .pipe(
        common.plugins.if(
          isProd,
          //   through.obj(function(file, enc, cb) {
          //     if (file.isNull()) {
          //       this.push(file);
          //       return cb();
          //     }
          //     if (file.isStream()) {
          //       this.emit(
          //         'error',
          //         new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported')
          //       );
          //       return cb();
          //     }
          //     console.log(file.path);
          //     var mobileReg = new RegExp(/\\m$/);
          //     if (mobileReg.test(file.base)) {
          //       file.base = file.base.replace(mobileReg, '');
          //     }
          //     this.push(file);
          //     cb();
          //   })
          // ),
          common.plugins.rev.manifest(),
          gulp.dest(
            `${common.config.paths.src.root}${common.config.paths.src
              .revDist}/js`
          )
        )
      )
      .pipe(common.plugins.if(isProd, common.plugins.rev.manifest()))
      .pipe(
        common.plugins.if(
          isProd,
          gulp.dest(
            `${common.config.paths.src.root}${common.config.paths.src
              .revDist}/js`
          )
        )
      )
      .on('end', onStreamEnd);
  });
};

function onStreamEnd() {
  lib.task_log('compile_js');
  lib.reloadhandle();
}

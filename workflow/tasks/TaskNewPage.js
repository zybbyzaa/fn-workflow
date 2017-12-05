var path = require('path');
var argv = require('yargs').argv;
var through = require('through2');
var lib = require('../util/lib');

module.exports = function(gulp, common) {
  var config = common.config,
    plugins = common.plugins;
  var name = argv.name,
    isMobile = argv.m,
    projectName = argv.projectName || config.projectName;
  var srcHtmlPath = isMobile ? config.paths.tpl.mhtml : config.paths.tpl.html,
    srcCssPath = isMobile ? config.paths.tpl.mcss : config.paths.tpl.css,
    srcJsPath = config.paths.tpl.js,
    srcJsonPath = config.paths.tpl.json;
  // var htmlName = `${name}.shtml`,
  //   cssName = `style-${name}.scss`,
  //   jsName = `${name}.js`,
  //   jsonName = `${name}.json`;
  var htmlPath = `${config.paths.src.root}${isMobile
      ? config.paths.src.htmlMobile
      : config.paths.src.html}`,
    cssPath = `${config.paths.src.root}${isMobile
      ? config.paths.src.cssMobile
      : config.paths.src.css}`,
    jsPath = `${config.paths.src.root}${isMobile
      ? config.paths.src.jsMobile
      : config.paths.src.js}`,
    jsonPath = `${config.paths.src.root}${isMobile
      ? config.paths.src.jsonMobile
      : config.paths.src.json}`;
  gulp.task('new_page', function() {
    if (
      lib.fileExist(htmlPath) ||
      lib.fileExist(cssPath) ||
      lib.fileExist(jsPath) ||
      lib.fileExist(jsonPath)
    ) {
      return;
    }
    gulp
      .src(srcHtmlPath)
      .pipe(
        plugins.ejs({
          name: name,
          projectName: projectName,
          contextPath: '${rc.contextPath}',
          common: '<#import "/common/common.ftl" as s>'
        })
      )
      .pipe(plugins.rename(lib.getFileBaseName(htmlPath)))
      .pipe(gulp.dest(lib.getFileDir(htmlPath)))
      .on('end', function() {
        plugins.util.log('创建文件' + htmlPath + '成功！');
      });
    gulp
      .src(srcCssPath)
      .pipe(plugins.rename(lib.getFileBaseName(cssPath)))
      .pipe(gulp.dest(lib.getFileDir(cssPath)))
      .on('end', function() {
        plugins.util.log('创建文件' + cssPath + '成功！');
      });
    gulp
      .src(srcJsPath)
      .pipe(plugins.rename(lib.getFileBaseName(jsPath)))
      .pipe(gulp.dest(lib.getFileDir(jsPath)))
      .on('end', function() {
        plugins.util.log('创建文件' + jsPath + '成功！');
      });
    gulp
      .src(srcJsonPath)
      .pipe(plugins.rename(lib.getFileBaseName(jsonPath)))
      .pipe(
        through.obj(function(file, enc, cb) {
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

          var content = file.contents
            .toString()
            .replace(
              '{name}',
              isMobile ? `m/${projectName}/${name}` : `${projectName}/${name}`
            );
          file.contents = new Buffer(content);

          this.push(file);

          cb();
        })
      )
      .pipe(gulp.dest(lib.getFileDir(jsonPath)))
      .on('end', function() {
        plugins.util.log('创建文件' + jsonPath + '成功！');
      });
  });
};

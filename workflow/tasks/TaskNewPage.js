var argv = require('yargs').argv;
var through = require('through2');

module.exports = function(gulp, common) {
  var name = argv.name,
    isMobile = argv.m,
    projectName = argv.projectName || 'xunleijr';
  var srcHtmlPath = isMobile ? common.config.paths.tpl.mhtml : common.config.paths.tpl.html,
    srcCssPath = isMobile ? common.config.paths.tpl.mcss : common.config.paths.tpl.css,
    srcJsPath = common.config.paths.tpl.js,
    srcJsonPath = common.config.paths.tpl.json;
  var htmlName = `${name}.shtml`,
    cssName = `style-${name}.scss`,
    jsName = `${name}.js`,
    jsonName = `${name}.json`;
  var htmlPath = `${common.config.paths.src.root}${isMobile ? common.config.paths.src.htmlMobile : common.config.paths.src.html}`,
    cssPath = `${common.config.paths.src.root}${isMobile ? common.config.paths.src.cssMobile : common.config.paths.src.css}`,
    jsPath = `${common.config.paths.src.root}${isMobile ? common.config.paths.src.jsMobile : common.config.paths.src.js}`,
    jsonPath = `${common.config.paths.src.root}${isMobile ? common.config.paths.src.jsonMobile : common.config.paths.src.json}`;
  gulp.task('new_page', function() {
    gulp.src(srcHtmlPath)
      .pipe(common.plugins.ejs({
        name: name,
        projectName: projectName,
        contextPath: '${rc.contextPath}',
        common: '<#import "/common/common.ftl" as s>'
      }))
      .pipe(common.plugins.rename(htmlName))
      .pipe(gulp.dest(htmlPath))
      .on('end', function() {
        common.plugins.util.log('创建文件' + htmlPath + '/' + htmlName + '成功！');
      });
    gulp.src(srcCssPath)
      .pipe(common.plugins.rename(cssName))
      .pipe(gulp.dest(cssPath))
      .on('end', function() {
        common.plugins.util.log('创建文件' + cssPath + '/' + cssName + '成功！');
      });
    gulp.src(srcJsPath)
      .pipe(common.plugins.rename(jsName))
      .pipe(gulp.dest(jsPath))
      .on('end', function() {
        common.plugins.util.log('创建文件' + jsPath + '/' + jsName + '成功！');
      });
    gulp.src(srcJsonPath)
      .pipe(common.plugins.rename(jsonName))
      .pipe(through.obj(function(file, enc, cb) {
        if (file.isNull()) {
          this.push(file);
          return cb();
        }

        if (file.isStream()) {
          this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
          return cb();
        }

        var content = file.contents.toString().replace('{name}', isMobile ? `m/${projectName}/${name}` : `${projectName}/${name}`);
        file.contents = new Buffer(content);

        this.push(file);

        cb();
      }))
      .pipe(gulp.dest(jsonPath))
      .on('end', function() {
        common.plugins.util.log('创建文件' + jsonPath + '/' + jsonName + '成功！');
      });
  });
};
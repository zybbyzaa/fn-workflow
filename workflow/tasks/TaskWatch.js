// 监听文件变动
var runSequence = require('run-sequence');

function watchHandler (type, file) {
    var target = file.match(/^src[\/|\\](.*?)[\/|\\]/)[1];

    switch (target) {
        case 'img':
            if (type === 'removed') {
                var tmp = file.replace(/src/, 'dev');
                // del([tmp]);
            } else {
                // copyHandler('img', file);
            }
            break;

        case 'slice':
            if (type === 'removed') {
                var tmp = file.replace('src', 'dev');
                // del([tmp]);
            } else {
                // copyHandler('slice', file);
            }
            break;

        case 'js':
            if (type === 'removed') {
                var tmp = file.replace('src', 'dev');
                // del([tmp]);
            } else {
                // compileJs();
            }
            break;

        case 'media':
            if (type === 'removed') {
                var tmp = file.replace('src', 'dev');
                // del([tmp]);
            } else {
                // copyHandler('media', file);
            }
            break;

        case 'css':

            var ext = path.extname(file);

            if (type === 'removed') {
                var tmp = file.replace('src', 'dev').replace(ext, '.css');
                // del([tmp]);
            } else {
                if (ext === '.less') {
                    // compileLess();
                } else {
                    // compileSass();
                }
            }

            break;

        case 'html':
            if (type === 'removed') {
                // var tmp = file.replace('src', 'dev');
                // del([tmp]).then(function () {
                //     util.loadPlugin('build_dev');
                // });
            } else {
                // compileHtml();
            }

            if (type === 'add') {
                // setTimeout(function () {
                //     util.loadPlugin('build_dev');
                // }, 500);
            }

            break;
    }

};

module.exports = function (gulp, common) {
  gulp.task('watch', function() {
    gulp.watch([common.config.paths.src.img,
                common.config.paths.src.slice,
                common.config.paths.src.js,
                common.config.paths.src.media,
                common.config.paths.src.lessAll,
                common.config.paths.src.sassAll,
                common.config.paths.src.htmlAll],function(event) {
        common.plugins.util.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        console.log(event.path);
        watchHandler(event.type, event.path);
    })
  });
};

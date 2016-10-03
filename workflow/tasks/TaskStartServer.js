module.exports = function (gulp, common) {
    gulp.task('start_server', function() {
        common.plugins.util.log('启动服务');
        common.browserSync.init({
            server: common.config.paths.dist.dir,
            port: common.config['livereload']['port'] || 8080,
            startPath: common.config['livereload']['startPath'] || '/html',
            reloadDelay: 0,
            notify: {      //自定制livereload 提醒条
                styles: [
                    "margin: 0",
                    "padding: 5px",
                    "position: fixed",
                    "font-size: 10px",
                    "z-index: 9999",
                    "bottom: 0px",
                    "right: 0px",
                    "border-radius: 0",
                    "border-top-left-radius: 5px",
                    "background-color: rgba(60,197,31,0.5)",
                    "color: white",
                    "text-align: center"
                ]
            }
        });
    });
};

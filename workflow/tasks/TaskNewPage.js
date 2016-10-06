var newPage = require('../util/newPage'),
    argv = require('yargs').argv;
module.exports = function (gulp, common) {
    gulp.task('new_page', function() {
        newPage(argv,common);
    });
};
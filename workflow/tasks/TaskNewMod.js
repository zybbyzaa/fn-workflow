var newMod = require('../util/newMod'),
    argv = require('yargs').argv;
module.exports = function (gulp, common) {
    gulp.task('new_mod', function() {
        newMod(argv,common);
    });
};
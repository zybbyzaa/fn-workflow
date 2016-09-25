/**
 * gulpfile.js Web Gulp 工作流
 *
 * @date 2016-09-08
 */

var gulp = require('gulp'),
    fs = require('fs'),
    common = require('./workflow/util/common.js');

// 载入任务
var taskPath = 'workflow/tasks';

fs.readdirSync(taskPath).filter(function (file) {
  return (file.indexOf(".") !== 0) && (file.indexOf('Task') === 0);
}).forEach(function (_file) {
  require('./' + taskPath + '/' + _file)(gulp, common);
});
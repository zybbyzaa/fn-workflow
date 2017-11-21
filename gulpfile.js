var fs = require('fs'),
  gulp = require('gulp'),
  common = require('./workflow/util/common.js');

// 载入任务
var taskPath = 'workflow/tasks';

fs
  .readdirSync(taskPath)
  .filter(function(file) {
    return file.indexOf('.') !== 0 && file.indexOf('Task') === 0;
  })
  .forEach(function(_file) {
    require('./' + taskPath + '/' + _file)(gulp, common);
  });

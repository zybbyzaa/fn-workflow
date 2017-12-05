// 工具方法

var fs = require('fs');
var path = require('path');
var del = require('del');
var updateRule = require('postcss-sprites/lib/core').updateRule;
var makeSpritesheetPath = require('postcss-sprites/lib/core')
  .makeSpritesheetPath;
var common = require('./common.js');
var util = common.plugins.util;

var lib = {
  log: function(task_name) {
    util.log.apply(util, arguments);
  },
  task_log: function(task_name) {
    this.log(util.colors.magenta(task_name), util.colors.green.bold('√'));
  },
  loadPlugin: function(name, cb) {
    name = name + 'After';

    if (
      common.config['plugins'] &&
      common.config['plugins'][name] &&
      common.config['plugins'][name].length
    ) {
      var plugins = common.config['plugins'][name];

      plugins.every(function(plugin) {
        if (plugin.indexOf('.js') === -1) {
          plugin += '.js';
        }

        var filepath = path.resolve(__dirname, plugin);

        if (fs.existsSync(filepath)) {
          require(filepath)(common.config);
          typeof cb === 'function' && cb();
        } else {
          console.log('The ' + filepath + ' is not found!');
          typeof cb === 'function' && cb();
        }
      });
    }
  },
  colors: util.colors,
  dirExist: function(dirPath) {
    try {
      var stat = fs.statSync(dirPath);
      if (stat.isDirectory()) {
        common.plugins.util.log('文件夹已存在：', dirPath);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      if (err.code === 'ENOENT') {
        return false;
      } else {
        throw new Error(err);
      }
    }
  },
  fileExist: function(filePath) {
    try {
      var stat = fs.statSync(filePath);
      if (stat.isFile()) {
        common.plugins.util.log('文件已存在：', filePath);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      if (err.code === 'ENOENT') {
        return false;
      } else {
        throw new Error(err);
      }
    }
  },
  delFile: function(filePath) {
    if (lib.fileExist(filePath)) {
      del([filePath]).then(function() {
        common.plugins.util.log(
          common.plugins.util.colors.red('删除' + filePath + '成功')
        );
      });
    } else {
      common.plugins.util.log(
        common.plugins.util.colors.red('找不到文件：' + filePath)
      );
    }
  },
  getFileBaseName: function(filePath) {
    return path.parse(filePath).base;
  },
  getFileDir: function(filePath) {
    return path.parse(filePath).dir;
  },
  checkDateFormat: function(_date) {
    if (_date < 10) {
      _date = '0' + _date;
    }
    return _date;
  },
  handleErrors: function(errorObject, cb) {
    common.plugins.notify
      .onError(
        errorObject
          .toString()
          .split(': ')
          .join(':\n')
      )
      .apply(this, arguments);
    if (typeof this.emit === 'function') {
      this.emit('end');
    }
  },
  getCurrentTime: function() {
    var _time = new Date(),
      _timeResult =
        lib.checkDateFormat(_time.getHours()) +
        ':' +
        lib.checkDateFormat(_time.getMinutes()) +
        ':' +
        lib.checkDateFormat(_time.getSeconds());
    return _timeResult;
  },
  reloadhandle: function() {
    common.config.livereload && common.reload();
  },
  spritesGroupBy: function(image) {
    let groups = /\/images\/sprites\/(.*?)\/.*/gi.exec(image.url);
    let groupName = groups ? groups[1] : group;
    image.retina = true;
    image.ratio = 1;
    if (groupName) {
      let ratio = /@(\d+)x$/gi.exec(groupName);
      if (ratio) {
        ratio = ratio[1];
        while (ratio > 10) {
          ratio /= 10;
        }
        image.ratio = ratio;
      }
    }
    return Promise.resolve(groupName);
  },
  spritesOnUpdateRule: function(rule, comment, image) {
    updateRule(rule, comment, image);
  },
  spritesOnSaveSpritesheet: function(opts, groups) {
    return makeSpritesheetPath(opts, groups);
  }
};

module.exports = lib;

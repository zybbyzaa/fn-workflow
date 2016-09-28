// 工具方法

var fs = require('fs');
var path = require('path');
var common = require('./common.js');
var util = common.plugins.util;

var lib = {
    log: function (task_name) {
        util.log.apply(util, arguments);
    },
    task_log: function (task_name) {
        this.log(util.colors.magenta(task_name), util.colors.green.bold('√'));
    },
    loadPlugin: function (name, cb) {
        name = name + 'After';

        if (common.config['plugins'] && common.config['plugins'][name] && common.config['plugins'][name].length) {
            var plugins = common.config['plugins'][name];

            plugins.every(function (plugin) {
                if (plugin.indexOf('.js') === -1) {
                    plugin += '.js';
                }

                var filepath = path.resolve(__dirname, plugin);

                if (fs.existsSync(filepath)) {
                    require(filepath)(common.config);
                    (typeof cb === 'function') && cb();
                } else {
                    console.log('The ' + filepath + ' is not found!');
                    (typeof cb === 'function') && cb();
                }
            });
        }
    },
    colors: util.colors,
    dirExist: function (dirPath) {
        try {
            var stat = fs.statSync(dirPath);
            if (stat.isDirectory()) {
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
    fileExist: function (filePath) {
        try {
            var stat = fs.statSync(filePath);
            if (stat.isFile()) {
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
    checkDateFormat: function(_date) {
        if (_date < 10) {
            _date = '0' + _date;
        }
        return _date;
    },
    getCurrentTime: function(){
    var _time = new Date(),
        _timeResult = lib.checkDateFormat(_time.getHours()) + ':' + lib.checkDateFormat(_time.getMinutes()) + ':' + lib.checkDateFormat(_time.getSeconds());
    return _timeResult;
    },
    // 判断一个元素是否存在于某个数组中
    isElementInArray: function(_array, _element) {
        for(var _i = 0; _i < _array.length; _i++) {
            if(_element === _array[_i]) {
                return true;
            }
        }
        return false;
    },
    // 删除数组中的某个元素并返回一个新数组
    deleteElementInArray: function(_array, _element) {
        for(var _i = 0; _i < _array.length; _i++) {
            if(_element === _array[_i]) {
                return  _array.slice(0, _i).concat(_array.slice(_i + 1, _array.length));
            }
        }
    },
    reloadhandle: function(){
        common.config.livereload && common.reload();
    }
};

module.exports = lib;

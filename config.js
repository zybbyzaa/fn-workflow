var argv = require('yargs').argv;
var projectName = argv.projectName !== 'all' ? argv.projectName : '*';
var fileName = typeof argv.name === 'string' ? argv.name : '*';
var projectDir = projectName === '*' ? '' : `/${argv.projectName}`;
var isMobile = argv.m;

module.exports = {
  projectName: '',
  contentPath: '',
  paths: {
    src: {
      root: './src',
      css: `/css/${projectName}/style-${fileName}.scss`,
      cssMod: `/css/mod/mod-${fileName}.scss`,
      cssLib: '/css/lib/*/*.css',
      cssMobile: `/css/m/${projectName}/style-${fileName}.scss`,
      cssModMobile: `/css/m/mod/mod-${fileName}.scss`,
      img: '/images/**/**/*.{jpg,png,gif,svg}',
      imgSprites: '/images/sprites/*/*.{jpg,png,gif,svg}',
      html: `/pages/${projectName}/${fileName}.shtml`,
      htmlCommon: `/pages/common/${fileName}.shtml`,
      htmlMobile: `/pages/m/${projectName}/${fileName}.shtml`,
      htmlMobileCommon: `/pages/m/common/${fileName}.shtml`,
      js: `/js/${projectName}/${fileName}.js`,
      jsMod: `/js/mod/${fileName}.js`,
      jsMobile: `/js/m/${projectName}/${fileName}.js`,
      jsModMobile: `/js/m/mod/${fileName}.js`,
      jsLib: '/js/lib/**/*',
      json: `/pages/${projectName}/${fileName}.json`,
      jsonMobile: `/pages/m/${projectName}/${fileName}.json`,
      revSrc: `/rev/*/*.json`,
      revSrcMobile: `/rev/*/m/*.json`,
      revDist: '/rev'
    },
    dist: {
      root: './dist',
      css: `/css${projectDir}`,
      cssMobile: `/css/m${projectDir}`,
      cssLib: '/css/lib',
      img: '/images',
      html: `/WEB-INF${projectDir}`,
      htmlCommon: '/WEB-INF/common',
      htmlMobile: `/WEB-INF/m${projectDir}`,
      htmlMobileCommon: '/WEB-INF/m/common',
      js: '/js${projectDir}',
      jsMobile: '/js/m${projectDir}',
      jsLib: '/js/lib'
    },
    watch: {
      root: './src',
      css: '/css/**/*.{scss,css}',
      img: '/images/**/*.{jpg,png,gif,svg}',
      html: '/pages/**/*.{html,json,shtml}',
      js: '/js/**/*.js'
    },
    tpl: {
      html: './workflow/template/pageTemplate.html',
      mhtml: './workflow/template/mobilePageTemplate.html',
      css: './workflow/template/cssTemplate.scss',
      mcss: './workflow/template/mobileCssTemplate.scss',
      js: './workflow/template/jsTemplate.js',
      json: './workflow/template/jsonTemplate.json',
      modhtml: './workflow/template/modHtmlTemplate.html',
      modcss: './workflow/template/modCssTemplate.scss',
      modjs: './workflow/template/modJsTemplate.js'
    }
  },
  //browerSync配置
  livereload: {
    available: true,
    port: 3030,
    startPath: 'WEB-INF/TmTIndex.htm'
  },
  //后端接口代理配置
  proxy: {
    path: [],
    target: '',
    pathRewrite: {}
  },
  //路径相对于 workflow/lib 目录
  plugins: {
    build_devAfter: ['TmTIndex'],
    build_distAfter: []
  },
  //pistcss配置
  postcss: {
    autoprefixer: {
      mobile: ['Android >= 4', 'iOS >= 6'],
      pc: [
        'last 3 versions',
        'Explorer >= 8',
        'Chrome >= 21',
        'Firefox >= 1',
        'Edge 13'
      ]
    },
    pxtorem: {
      root_value: '100', // 基准值 html{ font-zise: 20px; }
      prop_white_list: [], // 对所有 px 值生效
      minPixelValue: 2 // 忽略 1px 值
    },
    sprites: function() {
      var fs = require('fs');
      var path = require('path');
      var hash = require('rev-hash');
      var lib = require('./workflow/util/lib');
      return {
        retina: false,
        verbose: true,
        spritePath: './dist/images', // 雪碧图合并后存放地址
        stylesheetPath: '../dist/css',
        basePath: './',
        spritesmith: {
          padding: 2
        },
        filterBy(image) {
          if (image.url.indexOf('/images/sprites/') === -1) {
            return Promise.reject();
          }
          return Promise.resolve();
        },
        groupBy(image) {
          return lib.spritesGroupBy(image);
        },
        hooks: {
          onUpdateRule(rule, comment, image) {
            var spriteUrl = image.spritePath.replace('dist', '../..');
            image.spriteUrl =
              `${spriteUrl}?v=` +
              hash(fs.readFileSync(path.resolve(image.spritePath)));
            return lib.spritesOnUpdateRule(rule, comment, image);
          },
          onSaveSpritesheet(opts, groups) {
            return lib.spritesOnSaveSpritesheet(opts, groups);
          }
        }
      };
    }
  }
};

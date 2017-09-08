var argv = require('yargs').argv;
var projectName = argv.projectName !== 'all' ? argv.projectName : '**';
var projectDir = projectName === '**' ? '' : `/${argv.projectName}`;
var isMobile = argv.m;

module.exports = {
  projectName: '',
  cssplatform: 'sass',
  contentPath: '',
  paths: {
    src: {
      root: './src',
      css: `/css/${projectName}`,
      cssMobile: `/css/m/${projectName}`,
      cssMod: `/css/mod`,
      cssModMobile: `/css/m/mod`,
      cssLib: '/css/lib/**/*.css',
      img: '/images/**/**/*.{jpg,png,gif,svg}',
      imgSprites: '/images/sprites/**/*.{jpg,png,gif,svg}',
      html: `/pages/${projectName}`,
      htmlMobile: `/pages/m/${projectName}`,
      htmlCommon: '/pages/common',
      htmlMobileCommon: '/pages/m/common',
      js: `/js/${projectName}`,
      jsMobile: `/js/m/${projectName}`,
      jsLib: '/js/lib/**/**/*.{js,css}',
      json: `/pages/${projectName}`,
      jsonMobile: `/pages/m/${projectName}`
    },
    dist: {
      root: './dist',
      css: `/css${projectDir}`,
      cssMobile: `/css/m${projectDir}`,
      cssLib: '/css/lib',
      img: '/images',
      html: `/WEB-INF${projectDir}`,
      htmlMobile: `/WEB-INF/m${projectDir}`,
      htmlCommon: '/WEB-INF',
      js: '/js',
      json: `/WEB-INF${projectDir}`,
      jsonMobile: `/WEB-INF/m${projectDir}`
    },
    watch: {
      root: './src',
      css: '/css/**/**/*.{scss,css}',
      img: '/images/**/**/*.{JPG,jpg,png,gif,svg}',
      html: '/pages/**/**/*.{html,json,shtml}',
      js: '/js/**/**/*.js'
    },
    tpl: {
      html: './workflow/template/pageTemplate.html',
      mhtml: './workflow/template/mobilePageTemplate.html',
      css: './workflow/template/cssTemplate.scss',
      mcss: './workflow/template/mobileCssTemplate.scss',
      js: './workflow/template/jsTemplate.js',
      json: './workflow/template/jsonTemplate.json',
      modhtml: './workflow/template/modHtmlTemplate.html',
      modcss: './workflow/template/modCssTemplate.scss'
    }
  },
  livereload: {
    available: true,
    //开启自动刷新
    port: 3030,
    startPath: 'WEB-INF/TmTIndex.htm'
  },
  //路径相对于 workflow/lib 目录
  plugins: {
    build_devAfter: ['TmTIndex'],
    build_distAfter: []
  },
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
  postcssPxtorem: {
    root_value: '100', // 基准值 html{ font-zise: 20px; }
    prop_white_list: [], // 对所有 px 值生效
    minPixelValue: 2 // 忽略 1px 值
  }
};

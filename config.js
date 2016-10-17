module.exports = {
	"projectName": "fn-workflow",
	"platform": "all",
	"cssplatform": "sass",
	"paths": {
		"src": {
			"dir": './src',
			"img": './src/images/**/**/*.{JPG,jpg,png,gif,svg}',
			"slice": './src/slice/**/**/*.png',
			"js": './src/js/**/**',
			"css": './src/css',
			"cssAll": './src/css/**/*.{scss,less}',
			"html": './src/html',
			"htmlAll": './src/html/**/**/*.html'
		},
		"tmp": {
			"dir": './tmp',
			"css": './tmp/css',
			"img": './tmp/images',
			"html": './tmp/html',
			"sprite": './tmp/sprite',
			"js": './tmp/js'
		},
		"dist": {
			"dir": './dist',
			"css": './dist/css',
			"discss": './dist/distcss',
			"img": './dist/images',
			"html": './dist/html',
			"sprite": './dist/images/sprite',
			"js": './dist/js'
		},
		"tpl": {
			"html": './workflow/template/pageTemplate.html',
			"mhtml": './workflow/template/mobilePageTemplate.html',
			"css": './workflow/template/cssTemplate.scss',
			"js": './workflow/template/jsTemplate.js',
			"modhtml": './workflow/template/modHtmlTemplate.html',
			"modcss": './workflow/template/modCssTemplate.scss'
		}
	},
	"livereload": {
		"available": true,
		//开启自动刷新
		"port": 3030,
		"startPath": "html/TmTIndex.html"
	},
	//路径相对于 workflow/lib 目录
	"plugins": {
		"build_devAfter": [
			"TmTIndex"
		],
		"build_distAfter": []
	},
	"autoprefixer": {
		"mobile": ['Android >= 4','iOS >= 6'],
		"pc": ['last 3 versions','Explorer >= 8','Chrome >= 21','Firefox >= 1','Edge 13'],
		"all": ['Android >= 4','iOS >= 6','last 3 versions','Explorer >= 8','Chrome >= 21','Firefox >= 1','Edge 13']
	},
	"postcssPxtorem": {
		"root_value": '100', // 基准值 html{ font-zise: 20px; }
		"prop_white_list": [], // 对所有 px 值生效
		"minPixelValue": 2 // 忽略 1px 值
	},
    //gulp-lazyImageCSS 寻找目录(https://github.com/weixin/gulp-lazyimagecss)
	"lazyDir": [
		"../slice"
	],
	"supportREM": true
}

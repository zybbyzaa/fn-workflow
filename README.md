# fn-workflow

> 一个基于 [Gulp](https://github.com/gulpjs/gulp/tree/master) 与微信开发的前端工作流 [tmt-workflow](https://github.com/weixin/tmt-workflow)的前端工作流程构建工具，结合了项目实际需求进行修改与定制。

## 功能特性

####1. HTML
- [x] freemarker语法解析（gulp-freemarker）
- [x] 文件后缀重命名（gulp-rename）

####2. CSS
- [x] sass编译（gulp-sass）
- [x] postcss预处理（gulp-postcss）
    * 自动添加浏览器前缀 （autoprefixer）
    * 雪碧图处理 （postcss-sprites）
    * css图片处理 （postcss-assets）
    * 图片路径加hash （postcss-urlrev）
    * css像素转rem （postcss-pxtorem）
- [x] css图片转base64（gulp-base64）
- [x] css文件防缓存（gulp-rev）
- [ ] css文件压缩（gulp-cssnano）

####3. JS
- [x] js压缩（gulp-uglify
- [x] js文件防缓存（gulp-rev）

####4. IMAGE
- [ ] 图片压缩

####5. SERVER
- [x] server热重启，浏览器自动刷新（brower-sync）
- [x] 测试环境接口代理（http-proxy-middleware）

## 快速开始
 1. 将项目 clone 到本地
    ```
    git clone git@github.com:zybbyzaa/fn-workflow.git
    ```

 2. 进入项目文件夹并安装依赖
    ```
    cd fn-workfow && npm i
    ```

 3. 运行本地开发命令
    ```
    npm run watch all
    ```

 4. 打开浏览器访问（默认自动打开页面）
    ```
    http://localhost:3030/WEB-INF/TmTIndex.htm
    ```

## 目录结构

<pre>
├── README.md
├── package.json            // 构建项目与工具包依赖
├── gulpfile.js             // 引入gulp任务
├── workflow
│   ├── npm_fixed             // 存放修改过的npm模块
│   ├── plugins               // 自定义插件
│   ├── task                  // 定义项目使用的gulp任务（文件名以Task开头）
│   ├── template              // 项目使用的模板文件
│   └── utils                 // gulp编译过程使用的工具函数
├── src                       // 项目代码源目录
│   ├── css
│   │   ├── *                 // pc页面scss文件（style-*.scss）
│   │   ├── lib               // 第三方插件css与项目公共scss文件
│   │   ├── mod               // pc页面模块scss文件（mod-*.scss）
│   │   └── m                 // 移动端样式文件，结构与pc样式文件相同
│   ├── images
│   │   ├── *                 // pc页面图片文件
│   │   ├── sprites           // 雪碧图文件，按文件夹分组
│   │   └── m                 // 移动端图片文件
│   ├── js                    // 自定义插件
│   │   ├── *                 // pc页面js文件
│   │   ├── lib               // 第三方插件js
│   │   ├── mod               // pc页面模块js文件
│   │   └── m
│   └── pages                 // gulp编译过程使用的工具函数
│   │   ├── *                 // pc页面文件
│   │   ├── common            // 页面公共模块
│   │   └── m
├── node_modules            // 工具包模块
└── config
    └── default.js          // 项目配置文件
</pre>

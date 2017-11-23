require.config({
  baseUrl: contextPath + '/js',
  paths: {
    jquery: 'lib/jquery-1.10.2.min',
    layer: 'lib/layer/layer',
    swiper: 'lib/swiper/swiper-2.7.6.min',
    template: 'lib/template-web',
    utils: 'mod/utils'
  }
});

require(['jquery', 'utils'], function($, utils) {
  $(function() {
    var App = function() {};
    App.prototype = {
      contructor: App,
      init: function() {
        this.data = {};
        this.element = {};
        this.initPage();
        this.bindEvent();
      },
      initPage: function() {
        //init page
      },
      bindEvent: function() {}
    };

    new App().init();
  });
});

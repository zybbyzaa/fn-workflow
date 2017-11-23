define([], function() {
  var Mod = function() {};
  Mod.prototype = {
    contructor: Mod,
    init: function() {
      this.data = {};
      this.element = {};
      this.initMod();
      this.bindEvent();
    },
    initMod: function() {
      //init mod
    },
    bindEvent: function() {}
  };

  return Mod;
});

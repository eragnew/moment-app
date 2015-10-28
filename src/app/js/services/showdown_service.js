module.exports = function(app) {

  "use strict";

  app.service("ShowdownService", [function() {

    var showdown = require ('showdown');

    var MDconverter = new showdown.Converter();

    MDconverter.makeHtml = function makeHtml(markdown) {
      console.log(markdown);
      return MDconverter.makeHtml(markdown);
    };

    return MDconverter;

  }]);

};

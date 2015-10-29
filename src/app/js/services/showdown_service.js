module.exports = function(app) {

  "use strict";

  app.service("ShowdownService", [function() {

    var showdown = require ('showdown');

    var MDconverter = new showdown.Converter();

    var convertHTML = {
      makeHtml: function(text) {
        console.log(text);
        MDconverter.setOption('tables', true);
        return MDconverter.makeHtml(text);
      }
    };


    return convertHTML;

  }]);

};

module.exports = function(app) {

  "use strict";

  app.service("ShowdownService", [function() {

    var showdown = require ('showdown');
    showdown.setOption('tables', true);
    showdown.setOption('strikethrough', true);


    var MDconverter = new showdown.Converter();

    var convertHTML = {
      makeHtml: function(text) {
        return MDconverter.makeHtml(text);
      }
    };

    return convertHTML;

  }]);

};

module.exports = function(app) {

  'use strict';

  angular.module("momentApp").filter("markdown", ['ShowdownService', function (ShowdownService) {
    return function (text) {
      if (text.length > 172) {
        var ellipsis = text + '...';
        return ShowdownService.makeHtml(ellipsis);
      } else {
        return ShowdownService.makeHtml(text);
      }
    };
  }]);
};

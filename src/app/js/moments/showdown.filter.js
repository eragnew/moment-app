module.exports = function(app) {

  'use strict';

  angular.module("momentApp").filter("markdown", ['ShowdownService', function (ShowdownService) {
    return function (text) {
      return ShowdownService.makeHtml(text);
    };
  }]);

  angular.module("momentApp").filter("ellipsis", function () {
    return function (text) {
      if(text.length > 175) {
        return text + '<span>...</span>';
      } else {
        return text;
      }
    };
  });
};

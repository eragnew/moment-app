module.exports = function(app) {

  'use strict';

  angular.module("momentApp").filter("markdown", ['ShowdownService', function (ShowdownService) {
    return function (text) {
      return ShowdownService.makeHtml(text);
    };
  }]);
};

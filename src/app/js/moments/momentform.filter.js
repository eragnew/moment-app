(function() {

  'use strict';

  angular.module("momentApp").filter("offset", function ($filter) {
    return function(input, start) {
      if (input) {
        start = parseInt(start, 10);
        return input.slice(start);
      }
    };
  });

  angular.module("momentApp").filter("pager", function ($filter) {
    return function (results, pagerObj) {
      var filteredResults;
      filteredResults = $filter("offset")(results, pagerObj.getOffset());
      filteredResults = $filter("limitTo")(filteredResults, pagerObj.perPage);
      return filteredResults;
    };
  });

})();

(function() {

  'use strict';

  angular.module("momentApp").filter("offset", function ($filter) {
    return function(input, start) {
      if (input) {
        start = parseInt(start);
        console.log(input.slice(start));
        return input.slice(start);
      }
    };
  });

  angular.module("momentApp").filter("pager", function ($filter) {
    return function (results, pagerObj) {
      var filteredResults;
      // Get back an array of three
      filteredResults = $filter("offset")(results, pagerObj.getOffset());
      filteredResults = $filter("limitTo")(filteredResults, pagerObj.perPage);
      return filteredResults;
    };
  });
})();

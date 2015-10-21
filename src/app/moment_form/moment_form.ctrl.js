require('../app.js');

(function momentFormController() {

  "use strict";

  angular.module('momentApp').controller("MomentFormCtrl", ["SpotifySearchService", "$anchorScroll", "$location", "$routeParams", "$log", "$filter", function(SpotifySearchService, $anchorScroll, $location, $routeParams, $log, $filter) {

    var vm = this;

    vm.search = searchSpotify;

    vm.date = $filter("date")(Date.now(), 'yyyy-MM-dd');


    // var formHeader = document.getElementById("h1");

    // window.onload = fadeIn(formHeader);

    // function fadeIn (element) {
    //   var op = 0.1;  // initial opacity
    //   var timer = setInterval(function () {
    //       if (op >= 1){
    //           clearInterval(timer);
    //       }
    //       element.style.opacity = op;
    //       element.style.filter = 'alpha(opacity=' + op * 100 + ")";
    //       op += op * 0.1;
    //       alert("here");
    //   }, 10);
    // }

    vm.contentExpand = function() {
      var content = document.getElementById('moment-textarea');
      var scrollHeight = content.scrollHeight -60;
        content.style.height = content.scrollHeight + "px";
    };

    function searchSpotify (q) {
      $log.info(q);
      // Run the get method from the GistsService service
      // Then (or success) send in a callback with the response (from promise)
      SpotifySearchService.get(q).then(successHandler, errorHandler);

      function successHandler(response) {
        // Store the data in the gists array
        // Set the property 'gists' (array) equal to an array of objects

        vm.results = response.data.tracks.items;

        $log.info("response", response);
        $log.info(vm.results);
      }

      function errorHandler(response) {
        $log.error("Error", response);
      }
    }
  }]);
})();

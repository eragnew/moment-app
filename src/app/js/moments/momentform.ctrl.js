require('./momentform.filter.js');

module.exports = function(app) {
  app.controller('MomentFormController', ['SpotifySearchService', '$anchorScroll', '$location', '$routeParams', '$log', '$filter', function(SpotifySearchService, $anchorScroll, $location, $routeParams, $log, $filter) {
    var vm = this;

    vm.search = searchSpotify;

    vm.date = $filter('date')(Date.now(), 'yyyy-MM-dd');

    vm.track = {};

    vm.addTrack = function addTrack(data) {
      vm.track = data;
      $log.info(vm.track);
    };

    vm.contentExpand = function() {
      var content = document.getElementById('moment-textarea');
      var scrollHeight = content.scrollHeight - 60;
      content.style.height = content.scrollHeight + 'px';
    };

    function searchSpotify(q) {
      $log.info(q);
      SpotifySearchService.get(q).then(successHandler, errorHandler);

      function successHandler(response) {
        vm.results = response.data.tracks.items;

        $log.info('response', response);
        $log.info(vm.results);
      }

      function errorHandler(response) {
        $log.error('Error', response);
      }
    }

    vm.pagination = {
      currentPage: 0,
      perPage: 3,
      getOffset: function () {
        return vm.pagination.currentPage * vm.pagination.perPage;
      },
      prevPage: function () {
        vm.pagination.currentPage--;
      },
      nextPage: function () {
        vm.pagination.currentPage++;
      }
    };

  }]);
};


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

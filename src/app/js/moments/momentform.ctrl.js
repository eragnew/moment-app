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
      perPage: (window.innerWidth > 320 ? 3 : 2),
      getOffset: function () {
        return vm.pagination.currentPage * vm.pagination.perPage;
      },
      prevPage: function () {
        if (vm.pagination.currentPage > 0)
          vm.pagination.currentPage--;
      },
      nextPage: function () {
        if (vm.pagination.currentPage + 1 <= (Math.floor(vm.results.length / vm.pagination.perPage)))
          vm.pagination.currentPage++;
      }
    };

  }]);
};

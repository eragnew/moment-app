module.exports = function(app) {
  app.controller('MomentFormController', ['SpotifySearchService', '$anchorScroll', '$location', '$routeParams', '$log', '$filter', function(SpotifySearchService, $anchorScroll, $location, $routeParams, $log, $filter) {
    var vm = this;

    vm.search = searchSpotify;

    vm.date = $filter('date')(Date.now(), 'yyyy-MM-dd');

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
  }]);
};

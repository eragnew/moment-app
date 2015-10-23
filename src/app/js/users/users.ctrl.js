module.exports = function(app) {
  app.controller('UserController', ['$scope', '$location', '$cookies', 'SpotifySearchService', '$filter', '$log', function($scope, $location, $cookies, SpotifySearchService, $filter, $log) {

    var vm = this;



    var getYear = function() {

      var today = $filter('date')(Date.now(), 'yyyy-MM-dd');

        return today.split('-');

    };

    var year = getYear();

    vm.initPage = function searchSpotify() {

      SpotifySearchService.getAlbums(year[0]).then(successHandler, errorHandler);

      function successHandler(response) {
        vm.results = response.data.albums.items;
        $log.info(vm.results);
      }

      function errorHandler(response) {
        $log.error('Error', response);
      }
    };

    vm.initPage();

  }]);
};

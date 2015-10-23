module.exports = function(app) {
  app.controller('UserController', ['$scope', '$location', '$cookies', 'SpotifySearchService', '$filter', function($scope, $location, $cookies, SpotifySearchService, $filter) {

    var vm = this;



    var year = function() {

      var today = $filter('date')(Date.now(), 'yyyy-MM-dd');
      today.split("-");
      return today;
    };

    console.log(year());

    // vm.initPage = function searchSpotify() {
    //   SpotifySearchService.get().then(successHandler, errorHandler);

    //   function successHandler(response) {
    //     vm.results = response.data.tracks.items;
    //   }

    //   function errorHandler(response) {
    //     $log.error('Error', response);
    //   }
    // };

    // vm.initPage();

  }]);
};

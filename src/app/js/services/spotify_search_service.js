module.exports = function(app) {
  app.service('SpotifySearchService', ['$http', function($http) {
    var urlRoot = 'https://api.spotify.com/v1/search?q=track:';

    var searchSpotify = {
      get: function(q) {
        if (angular.isDefined(q)) {
          return $http.get(urlRoot + q + '&type=track');
        }
      }
    };

    return searchSpotify;
  }]);
};

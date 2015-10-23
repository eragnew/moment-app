module.exports = function(app) {
  app.service('SpotifySearchService', ['$http', function($http) {
    var urlRoot = 'https://api.spotify.com/v1/search?q=';

    var searchSpotify = {
      getTrack: function(q) {
        if (angular.isDefined(q)) {
          return $http.get(urlRoot + 'track:' + q + '&type=track');
        }
      },
      getAlbums: function(q) {
        if (angular.isDefined(q)) {
          return $http.get(urlRoot + 'year:' + q + '&type=album');
        }
      }
    };

    return searchSpotify;
  }]);
};

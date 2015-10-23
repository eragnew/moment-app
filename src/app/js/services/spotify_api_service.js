module.exports = function(app) {
  app.service('SpotifyAPI', ['MomentsAPI', '$http', '$location', '$cookies', function(MomentsAPI, $http, $location, $cookies) {

    var token = $cookies.get('token');
    if (!(token && token.length)) {
      $cookies.remove('token');
      $location.path('/login');
    }

    var urlRoot = 'https://api.spotify.com/v1';

    var apiSpotify = {
      me: function() {
        var req = {
          method: 'GET',
          url: urlRoot + '/me',
          headers: {
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('access_token')
          }
        };
        return $http(req);
      },
      getTrack: function(spotifyID) {
        var req = {
          method: 'GET',
          url: urlRoot + '/tracks/' + spotifyID,
          headers: {
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('access_token')
          }
        };
        return $http(req);
      }
    };

    return apiSpotify;
  }]);
};

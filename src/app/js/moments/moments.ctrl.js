module.exports = function(app) {
  app.controller('MomentsController', ['MomentsAPI', 'SpotifyAPI', '$scope', '$location', '$cookies', '$log', function(MomentsAPI, SpotifyAPI, $scope, $location, $cookies, $log) {
    var vm = this;

    vm.user = [];

    vm.currentPath = $location.path();

    var token = $cookies.get('token');
    if (!(token && token.length))
      $location.path('/login');

    var momentsAPI = new MomentsAPI();

    vm.me = momentsAPI.me(token, function(err, data) {
      if (err) return errorHandler(err);
      window.sessionStorage.setItem('access_token', data.accessToken);
      window.sessionStorage.setItem('profile', JSON.stringify(data.profile));
    });

    vm.moments = momentsAPI.getAll(token, function(err, data) {
      if (err) return errorHandler(err);
      return data;
    });

    vm.spotifyMe = SpotifyAPI.me(token).then(function(response) {
      console.log(response);
      return response;
    }, errorHandler);

    function errorHandler(response) {
      $log.error('Error', response);
    }

    function getProfile() {
      SpotifyAPI.me(token).then(function(resp) {
        var name = resp.data.display_name.split(' ');

        vm.user = [
          name[0],
          resp.data.images[0]
        ];
      });
    }

    getProfile();

  }]);
};

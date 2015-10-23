module.exports = function(app) {
  app.controller('MomentsController', ['MomentsAPI', 'SpotifyAPI', '$scope', '$location', '$cookies', '$log', '$q', function(MomentsAPI, SpotifyAPI, $scope, $location, $cookies, $log, $q) {
    var vm = this;

    vm.user = {};
    vm.moments = [];
    vm.resources = [];
    vm.albumArts = [];
    vm.currentPath = $location.path();

    var token = $cookies.get('token');
    if (!(token && token.length))
      $location.path('/login');

    var momentsAPI = new MomentsAPI();

    vm.initPage = function() {
      if (!token) return;
      vm.me = momentsAPI.me(token, function(err, data) {
        if (err) return errorHandler(err);
        window.sessionStorage.setItem('access_token', data.accessToken);
        window.sessionStorage.setItem('profile', JSON.stringify(data.profile));
        SpotifyAPI.me(token).then(function(resp) {
          var name = resp.data.display_name.split(' ');
          vm.user.name = name[0];
          vm.user.profile_image = resp.data.images[0];
        });
        momentsAPI.getAll(token, function(err, data) {
          if (err) return errorHandler(err);
          for (var i = 0; i < data.length; i++) {
            vm.moments.push(data[i]);
            vm.resources.push(data[i].spotifyResource);
          }
          angular.forEach(vm.resources, function(value, index) {
            SpotifyAPI.getTrack(value).then(
                function(resp) {
                    vm.moments[index].album_art = resp.data.album.images[1].url;
                }
              );
          });

        return data.profile;
      });

      vm.stats = momentsAPI.stats(token, function(err, data) {
        console.log(data);
        vm.momentCount = data[0];
        vm.tagCount = data[1];
      });
    });
  };

    vm.initPage();

    function errorHandler(response) {
      $log.error('Error', response);
    }

  }]);
};

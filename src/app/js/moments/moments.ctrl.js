module.exports = function(app) {
  app.controller('MomentsController', ['MomentsAPI', 'SpotifyAPI', '$scope', '$location', '$cookies', '$log', function(MomentsAPI, SpotifyAPI, $scope, $location, $cookies, $log) {
    var vm = this;

    vm.user = {};
    vm.moments = [];
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
            // SpotifyAPI.getTrack(data[i].spotifyResource).then(function(resp) {
            //   vm.moments[i].album_cover = resp.data.album.images[resp.data.album.images.length - 1].url;
            // });
          }
        });
        // SpotifyAPI.getTrack(vm.moment.spotifyResource).then(function(resp) {
        //     console.log(resp.data);
        //     vm.spotifyDeats = resp.data;
        //   });
        return data.profile;
      });

      vm.stats = momentsAPI.stats(token, function(err, data) {
        vm.momentCount = data[0];
        vm.tagCount = data[1];
      });
    };

    vm.initPage();

    function errorHandler(response) {
      $log.error('Error', response);
    }

  }]);
};

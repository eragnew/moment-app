module.exports = function(app) {
  app.controller('MomentsController', ['MomentsAPI', 'SpotifyAPI', '$scope', '$location', '$cookies', '$log', '$q', function(MomentsAPI, SpotifyAPI, $scope, $location, $cookies, $log, $q) {
    var vm = this;

    vm.user = {};
    vm.moments = [];
    vm.months = [];
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
          data.sort(function(a,b) {
            if (parseInt(a.dateModified.slice(5,7)) > parseInt(b.dateModified.slice(5,7))) {
              return 1;
            }
            if (parseInt(b.dateModified.slice(5,7)) > parseInt(a.dateModified.slice(5,7))) {
              return -1;
            }
            return 0;
          });
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
          var monthChecker = [];
          var firstMomentDate = new Date(vm.moments[0].dateModified);
          var firstMonth = firstMomentDate.getMonth();
          monthChecker.push(firstMonth);
          for (i = 1; i < vm.moments.length; i++) {
            var createDate = new Date(vm.moments[i].dateModified);
            var month = createDate.getMonth();
            monthChecker.push(month);
            console.log(month);
            if (month !== monthChecker[i - 1]) {
              var monthChunk = vm.moments.slice(monthChecker.indexOf(monthChecker[i - 1]), i);
              vm.months.push(monthChunk);
              if (i === vm.moments.length - 1) {
                vm.months.push(vm.moments.slice(vm.moments.indexOf(month)));
              }
            } else if (i === vm.moments.length - 1) {
              vm.months.push(vm.moments.slice(monthChecker.indexOf(month)));
            }
          }
          vm.months.reverse();
          console.log(monthChecker);
          console.log(vm.moments);
          console.log(vm.months);
          return data.profile;
        });

        vm.stats = momentsAPI.stats(token, function(err, data) {
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
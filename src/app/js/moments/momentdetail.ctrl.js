module.exports = function(app) {
  app.controller('MomentDetailController', ['MomentsAPI', 'SpotifyAPI', '$location', '$routeParams', '$cookies', '$log', function(MomentsAPI, SpotifyAPI, $location, $routeParams, $cookies, $log) {

      var vm = this;

      var token = $cookies.get('token');
        if (!(token && token.length))
        $location.path('/login');

      var momentAPI = new MomentsAPI();

      function start() {
        momentAPI.getOne(token, $routeParams.id, function(err, resp){
          vm.moment = resp;
          $log.info(resp);
          SpotifyAPI.getTrack(vm.moment.spotifyResource).then(function(resp) {
            console.log(resp.data);
            vm.spotifyDeats = resp.data;
          });
        });
      }

      start();

    }
  ]);
};

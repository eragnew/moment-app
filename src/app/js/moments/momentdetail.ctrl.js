module.exports = function(app) {
  app.controller('MomentDetailController', ['MomentsAPI', 'SpotifyAPI', '$location', '$routeParams', '$cookies', '$log', 'ShowdownService', function(MomentsAPI, SpotifyAPI, $location, $routeParams, $cookies, $log, ShowdownService) {

      var vm = this;

      var toHtml = function(text) {
        ShowdownService.makeHtml(text);
      };

      var token = $cookies.get('token');
        if (!(token && token.length))
        $location.path('/login');

      var momentAPI = new MomentsAPI();

      function start() {
        momentAPI.getOne(token, $routeParams.id, function(err, resp){
          vm.moment = resp;
          vm.momentContent = ShowdownService.makeHtml(resp.content);
          SpotifyAPI.getTrack(vm.moment.spotifyResource).then(function(resp) {
            vm.spotifyDeats = resp.data;
          });
        });
      }

      start();

      vm.deleteMoment = function() {
        if (confirm("Are you sure you want to delete this moment?")) {
          var formattedToken = token.replace(/"/g, '');
          momentAPI.remove(formattedToken, vm.moment, function(err, resp) {
            console.log('moment removed');
            $location.path('/moments');
          });
        }
      };

    }
  ]);
};

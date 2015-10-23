module.exports = function(app) {
  app.controller('MomentDetailController', ['MomentsAPI', '$location', '$routeParams', '$cookies', '$log', function(MomentsAPI, $location, $routeParams, $cookies, $log) {

      var vm = this;

      var token = $cookies.get('token');
        if (!(token && token.length))
        $location.path('/login');

      var momentAPI = new MomentsAPI();

      start();

      function start() {
        momentAPI.getOne(token, $routeParams.id, function(err, resp){
          vm.moment = resp;
          $log.info(resp);
        });
      }
    }
  ]);
};

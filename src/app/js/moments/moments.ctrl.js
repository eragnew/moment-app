module.exports = function(app) {
  app.controller('MomentsController', ['$scope', '$location', '$cookies', function($scope, $location, $cookies) {
    var vm = this;

    vm.currentPath = $location.path();

    var token = $cookies.get('token');
    if (!(token && token.length))
      $location.path('/login');
  }]);
};

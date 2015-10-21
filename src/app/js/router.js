module.exports = function(momentApp) {
  momentApp.config(['$routeProvider', function($route) {
    $route
      .when('/moments', {
        templateUrl: 'views/moments.html',
        controller: 'MomentsController as vm'
      })
      .when('/moments/new', {
        templateUrl: 'views/moment_form.html',
        controller: 'MomentFormController as vm'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'UserController as vm'
      })
      .otherwise({
        redirectTo: '/moments'
      });
  }]);
};

module.exports = function(momentApp) {
  momentApp.config(['$routeProvider', function($route) {
    $route
      .when('/moments', {
        templateUrl: 'views/moments.html',
        controller: 'MomentsController'
      })
      .when('/moments/new', {
        templateUrl: 'views/moment_form.html',
        controller: 'MomentFormController'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'UserController'
      })
      .otherwise({
        redirectTo: '/moments'
      });
  }]);
};

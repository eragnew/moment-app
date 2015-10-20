module.exports = function(momenteApp) {
  momenteApp.config(['$routeProvide', function($route) {
    $route
      .when('/app', {
        templateUrl: '/templates/views/app_view.html'
      })
      .when('/signin', {
        templateUrl: '/templates/views/signin_view.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
};

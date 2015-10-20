require('angular');
// require('ng-showdown');
require('angular-route');

(function appFile() {

  "use strict";

  var app = angular.module('momentApp', ['ngRoute']);

  app.config(["$routeProvider", function($routeProvider) {

      $routeProvider.when('/moments', {
        templateUrl: "views/moments.html",
        controller: "MomentsCtrl as vm"
      }).
      when('/moments/new', {
        templateUrl: "views/posts/blog-post-form.html",
        controller: "BlogFormCtrl as vm",
      }).
      when('/moments/:gist_id', {
        templateUrl: "views/posts/blog-post-detail.html",
        controller: "BlogCtrl as vm"
      }).
       when('/moments/:gist_id/edit', {
        templateUrl: "views/posts/blog-post-form.html",
        controller: "BlogFormCtrl as vm"
      }).
       when('/moments/:gist_id/destroy', {
        templateUrl: "views/posts/blog-post-detail.html",
        controller: "BlogFormCtrl as vm"
      }).
       otherwise({
        redirectTo: "/moments"
      });
    }]);
})();

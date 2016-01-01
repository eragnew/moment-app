require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-sanitize');
require('showdown');

var momentApp = angular.module('momentApp', ['ngRoute', 'ngCookies', 'ngSanitize']);

require('./js/services/services')(momentApp);
require('./js/moments/moments')(momentApp);
require('./js/users/users')(momentApp);
require('./js/router')(momentApp);

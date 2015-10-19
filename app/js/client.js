require('angular/angular');
require('angular-route');

var momenteApp = angular.module('momenteApp', ['ngRoute']);

require('./router')(momenteApp);

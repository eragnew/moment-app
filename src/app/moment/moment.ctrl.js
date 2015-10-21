require('../app.js');

(function momentController() {

  "use strict";

  angular.module('momentApp').controller("MomentCtrl", ["$anchorScroll", "$location", "$routeParams", "$log", "$filter", function($anchorScroll, $location, $routeParams, $log, $filter) {

    var vm = this;

    vm.date = $filter("date")(Date.now(), '');

  }]);
})();

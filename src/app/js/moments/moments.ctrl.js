module.exports = function(app) {
  app.controller('MomentsController', ['$scope', '$location', '$cookies', function($scope, $location, $cookies) {
    var token = $cookies.get('token');
    if (!(token && token.length))
      console.log('oh no! we are not logged in!');
  }]);
};



// require('../app.js');

// (function momentsController() {

//   "use strict";

//   angular.module('momentApp').controller("MomentsCtrl", ["MomentsService", "$anchorScroll", "$location", "$routeParams", "$log", function(MomentsService, $anchorScroll, $location, $routeParams, $log) {

//     var vm = this;

//     vm.currentPath = $location.path();

//     // Initialize the controller
//     initialize();

//     // vm.pagination = {
//     //   currentPage: 0,
//     //   perPage: 5,
//     //   getOffset: function () {
//     //     return vm.pagination.currentPage * vm.pagination.perPage;
//     //   },
//     //   prevPage: function () {
//     //     vm.pagination.currentPage--;
//     //     toBreadcrumbs();
//     //   },
//     //   nextPage: function () {
//     //     vm.pagination.currentPage++;
//     //     toBreadcrumbs();
//     //   }
//     // };

//     function initialize () {
//       getMoments();
//     }

//     function getMoments () {
//       // Run the get method from the MomentsService service
//       // Then (or success) send in a callback with the response (from promise)
//       MomentsService.get($routeParams.gist_id).then(successHandler, errorHandler);

//       function successHandler(response) {
//         // Store the data in the gists array
//         // Set the property 'gists' (array) equal to an array of objects

//         vm.moments = response.data;

//         $log.info("response", response);
//       }

//       function errorHandler(response) {
//         $log.error("response", response);
//       }
//     }
//   }]);
// })();

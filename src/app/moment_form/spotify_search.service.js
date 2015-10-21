require('../app.js');

// Organize and share code around out app
(function () {

  "use strict";

  // Name the service and specify the $http service as a dependency -- inject it to use it
  angular.module("momentApp").service("SpotifySearchService", ["$http", function ($http) {

    // Declare urlRoot
    var urlRoot = "https://api.spotify.com/v1/search?q=";

    // Declare blog object with 4 methods
    var searchSpotify = {
      // Get function with  gist ID as argument
      // Function will return a promise
      get: function (q) {
        // Determine if a reference (gist ID) is defined
        if (angular.isDefined(q)) {
          // Send in the URL with ID to the get method
          return $http.get(urlRoot + q + "&type=track");
        }

      }
      // update: function (model) {
      //   return $http.put(urlRoot + "/" + model._id, model);
      // },
      // create: function (model) {
      //   return $http.post(urlRoot, model);
      // },
      // delete: function (model) {
      //   return $http.delete(urlRoot + "/" + model._id);
      // }
    };
    return searchSpotify;
  }]);
}());

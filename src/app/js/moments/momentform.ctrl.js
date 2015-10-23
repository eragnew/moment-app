require('./momentform.filter.js');

module.exports = function(app) {

  app.controller('MomentFormController', ['SpotifySearchService', 'MomentsAPI','$anchorScroll', '$location', '$routeParams', '$log', '$filter', '$cookies', function(SpotifySearchService, MomentsAPI, $anchorScroll, $location, $routeParams, $log, $filter, $cookies) {

    var vm = this;

    var token = $cookies.get('token');
    if (!(token && token.length))
      $location.path('/login');

    vm.search = searchSpotify;

    vm.save = submitMoment;

    vm.date = $filter('date')(Date.now(), 'yyyy-MM-dd');

    vm.moment = {};
    vm.track = {};

    var pageNumber;

    vm.addTrack = function addTrack(data) {
      vm.track = data;
    };

    vm.contentExpand = function() {
      var content = document.getElementById('moment-textarea');
      var scrollHeight = content.scrollHeight - 60;
      content.style.height = content.scrollHeight + 'px';
    };

    function searchSpotify(q) {
      SpotifySearchService.get(q).then(successHandler, errorHandler);

      function successHandler(response) {
        vm.results = response.data.tracks.items;
      }

      function errorHandler(response) {
        $log.error('Error', response);
      }
    }

    function submitMoment() {
      var momentAPI = new MomentsAPI();
      vm.moment.title = vm.track.name;
      vm.moment.spotifyResource = vm.track.id;
      vm.moment.dateCreated = vm.date;
      vm.moment.dateModified = vm.date;
      var formattedToken = token.replace(/"/g, '');
      vm.moment.tags = vm.tags.split(',');
      momentAPI.create(formattedToken, vm.moment, function(err, data){
        if (err) $log.error('Error', err);
        $log.info(data);
        $location.path('/moments/' + data._id);
      });
    }

    vm.pagination = {
      currentPage: 0,
      perPage: (window.innerWidth > 320 ? 3 : 2),
      getOffset: function () {
        return vm.pagination.currentPage * vm.pagination.perPage;
      },
      prevPage: function () {
        if (vm.pagination.currentPage > 0)
          vm.pagination.currentPage--;
      },
      nextPage: function () {
        if (vm.pagination.currentPage + 1 <= (Math.floor(vm.results.length / vm.pagination.perPage)))
          vm.pagination.currentPage++;
      }
    };

  }]);
};

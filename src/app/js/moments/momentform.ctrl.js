require('./momentform.filter.js');

module.exports = function(app) {

  app.controller('MomentFormController', ['SpotifySearchService', 'MomentsAPI','SpotifyAPI', '$anchorScroll', '$location', '$routeParams', '$log', '$filter', '$cookies', function(SpotifySearchService, MomentsAPI, SpotifyAPI, $anchorScroll, $location, $routeParams, $log, $filter, $cookies) {

    var vm = this;

    var token = $cookies.get('token');
    if (!(token && token.length))
      $location.path('/login');

    vm.search = searchSpotify;
    vm.save = submitMoment;
    vm.update = updateMoment;
    vm.date = $filter('date')(Date.now(), 'yyyy-MM-dd');
    vm.dateNow = Date.now();
    vm.today = new Date(vm.dateNow);
    vm.moment = {};
    vm.track = {};
    vm.tab = 1;

    showDate();

    function showDate () {
      console.log(vm.date);
      console.log(vm.today);
    }

    function start() {
      var momentAPI = new MomentsAPI();
      momentAPI.getOne(token, $routeParams.id, function(err, resp){
        vm.moment = resp;
        if (vm.moment.tags) {
          var output = "";
          for (var i=0; i < vm.moment.tags.length; i++) {
            output += vm.moment.tags[i] + ",";
          }
          vm.moment.tags = output.substring(0, output.length -1);
        }
        $log.info(resp);
        SpotifyAPI.getTrack(vm.moment.spotifyResource).then(function(resp) {
          console.log(resp.data);
          vm.spotifyDeats = resp.data;
        });
      });
    }

    start();

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
      SpotifySearchService.getTrack(q).then(successHandler, errorHandler);

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
      vm.moment.dateCreated = vm.today;
      vm.moment.dateModified = vm.today;
      var formattedToken = token.replace(/"/g, '');
      if (vm.tags)
        vm.moment.tags = vm.tags.split(',');
      momentAPI.create(formattedToken, vm.moment, function(err, data){
        if (err) $log.error('Error', err);
        $log.info(data);
        $location.path('/moments/' + data._id);
      });
    }

    function updateMoment(){
      var momentAPI = new MomentsAPI();

      vm.moment.dateModified = vm.date;
      var formattedToken = token.replace(/"/g, '');
      if (vm.moment.tags) {
        vm.moment.tags = vm.moment.tags.split(',');
      }
      momentAPI.update(formattedToken, vm.moment, function(err, data){
        if (err) $log.error('Error', err);
        $log.info(data);
        $location.path('/moments/' + vm.moment._id);
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

    vm.isSelected = function(tabNumber) {
      return vm.tab === tabNumber;
    };

    vm.selectTab = function(setTab) {
      vm.tab = setTab;
    };

  }]);
};
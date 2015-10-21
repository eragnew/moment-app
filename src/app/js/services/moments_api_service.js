var handleSuccess = function(callback) {
  return function(res) {
    callback(null, res.data);
  };
};

var handleFailure = function(callback) {
  return function(data) {
    callback(data);
  };
};

module.exports = function(app) {
  app.factory('MomentsAPI', ['$http', function($http) {
    var MomentsAPI = function() {};

    MomentsAPI.prototype.create = function(data, callback) {
      $http.post('/api/moments/new', data)
        .then(handleSuccess(callback), handleFailure(callback));
    };

    MomentsAPI.prototype.getAll = function(callback) {
      $http.get('/api/moments')
        .then(handleSuccess(callback), handleFailure(callback));
    };

    MomentsAPI.prototype.update = function(data, callback) {
      $http.put('/api/moments/' + data._id, data)
        .then(handleSuccess(callback), handleFailure(callback));
    };

    MomentsAPI.prototype.remove = function(data, callback) {
      $http.delete('/api/moments/' + data._id)
        .then(handleSuccess(callback), handleFailure(callback));
    };

    return function() {
      return new MomentsAPI();
    };
  }]);
};

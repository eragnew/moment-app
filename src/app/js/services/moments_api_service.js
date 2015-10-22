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

    MomentsAPI.prototype.create = function(token, data, callback) {
      // $http.post('/api/moments/new', data)
      //   .then(handleSuccess(callback), handleFailure(callback));
      $http({
        method: 'POST',
        url: '/api/moments/new',
        data: data,
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(handleSuccess(callback), handleFailure(callback));
    };

    MomentsAPI.prototype.getOne = function(token, _id, callback) {
      $http.get('/api/moments/' + _id + '?access_token=' + token)
        .then(handleSuccess(callback), handleFailure(callback));
    };

    MomentsAPI.prototype.getAll = function(token, callback) {
      $http.get('/api/moments?access_token=' + token)
        .then(handleSuccess(callback), handleFailure(callback));
    };

    MomentsAPI.prototype.update = function(token, data, callback) {
      // $http.put('/api/moments/' + data._id, data)
      //   .then(handleSuccess(callback), handleFailure(callback));
      $http({
        method: 'PUT',
        url: '/api/moments/' + data._id,
        data: data,
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(handleSuccess(callback), handleFailure(callback));
    };

    MomentsAPI.prototype.remove = function(token, data, callback) {
      // $http.delete('/api/moments/' + data._id)
      //   .then(handleSuccess(callback), handleFailure(callback));
      $http({
        method: 'DELETE',
        url: '/api/moments/' + data._id,
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(handleSuccess(callback), handleFailure(callback));
    };

    MomentsAPI.prototype.me = function(token, callback) {
      $http.get('/api/users/me?access_token=' + token)
        .then(handleSuccess(callback), handleFailure(callback));
    };

    return function() {
      return new MomentsAPI();
    };
  }]);
};

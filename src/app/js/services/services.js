module.exports = function(app) {
  require('./moments_api_service')(app);
  require('./spotify_search_service')(app);
  require('./spotify_api_service')(app);
  require('./showdown_service')(app);
};

module.exports = function(app) {
  require('./moments.ctrl')(app);
  require('./momentform.ctrl')(app);
  require('./momentdetail.ctrl')(app);
};

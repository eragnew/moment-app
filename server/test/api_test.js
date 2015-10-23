var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/moments_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var User = require(__dirname + '/../api/user/user.model');
var Moment = require(__dirname + '/../api/moment/moment.model');
var auth = require(__dirname + '/../auth/auth.service');

describe('auth test', function() {
  it('should be able to make a request to Spotify', function(done) {
    chai.request('localhost:3000/auth')
      .get('/spotify')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        done();
      });
  });
});

describe('user test', function() {
  var token, userID;

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a User', function(done) {
    var newUser = new User();
    newUser.save(function(err, user) {
      expect(err).to.eql(null);
      expect(user._id).to.not.eql(null);
      userID = user._id;
      done();
    });
  });

  it('should be able to get a token', function(done) {
    token = auth.signToken(userID);
    expect(token).to.not.eql(null);
    done();
  });

  describe('moments test', function() {
    it('should be able to create a moment', function(done) {
      chai.request('localhost:3000/api')
        .post('/moments/new')
        .set('Authorization', 'Bearer ' + token)
        .send({title: 'hello world'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.status).to.eql(200);
          done();
        });
    });

    it('should be able to get all moments', function(done) {
      chai.request('localhost:3000/api')
        .get('/moments')
        .set('Authorization', 'Bearer ' + token)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.status).to.eql(200);
          done();
        });
    });
  });
});

var assert = require('chai').assert
var request = require('supertest')(require('../app'))
var urlPath = '/api/users'
var validNewUser = require('./valid-new-user')

describe('new user registration', function () {
  it('should require email', function (done) {
    request.post(urlPath).send({}).expect(400).end(done);
  });

  it('should require password', function (done) {
    request.post(urlPath).send({
      email: 'blah@blah.com'
    }).expect(400).end(done);
  });

  it('should require password at least 4 characters', function (done) {
    request.post(urlPath).send({
      email: 'blah@blah.com',
      password: 'bad'
    }).expect(400).end(done);
  });

  it('should work with 201', function (done) {
    request.post(urlPath).send({
      email: 'blah@blah.com',
      password: 'goodpass'
    }).expect(201).end(done);
  });

  it('should detect duplicate registration attempts', function (done) {
    request.post(urlPath).send({
      email: 'blah@blah.com',
      password: 'goodpass'
    }).expect(201).end(function () {
      request.post(urlPath).send({
        email: 'blah@blah.com',
        password: 'diffpass'
      }).expect(400).end(done);
    });

  });
});

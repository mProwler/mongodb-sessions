var request = require('supertest')(require('../app'));
var assert = require('chai').assert;
var cheerio = require('cheerio');

describe('the home page', function () {
  it('should not set a cookie before login', function (done) {
    request.get('/').expect(200).end(function(err, res) {
      assert.notProperty(res.headers, 'set-cookie');
      done();
    });
  });

  it('should show login form', function (done) {
    request.get('/').expect(200).end(function (err, res) {
      var $ = cheerio.load(res.text);
      assert.equal($('div.login').length, 1);
      done();
    });
  });
});

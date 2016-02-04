var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    Promise = require('bluebird');


var schema = mongoose.Schema({
  // define an email property with type String
  //  make sure it is required
  // do some basic regex validation (simplest possible)
  // add a unique index

  // define a passwordHash property with type String
  // make sure it is required
  // tell mongoose not to select it by default

  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  passwordHash: {
    type: String,
    required: true
  }

});

schema.methods.setPassword = function setPassword (clear, callback) {
  // return a promise
  // validate the password is at least 4 chars
  // hash via bcrypt.hash(clear, null, null, callback)
  // store the hash in the passwordHash attribute
  // resolve the promise with this mongoose User instance

  var self = this;

  return new Promise(function (resolve, reject) {
    if (!clear || clear.length < 4) {
      reject(new Error('password missing or too short (minLength=4)'));
    }


    bcrypt.hash(clear, null, null, function (err, hash) {
      if (err) {
        console.error(err);
      } else {
        self.set('passwordHash', hash);
        if (typeof callback === 'function') callback();
        resolve(self);
      }
    });
  });

}

schema.methods.checkPassword = function checkPassword (clear, callback) {
  // return a promise
  // validate the provided cleartext password matches the hash in the db
  // resolve with true/false accordinly
  // reject if there is an error
}

module.exports = mongoose.model('User', schema)

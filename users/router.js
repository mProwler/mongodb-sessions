var router = require('express').Router(),
    User = require('./User'),
    bodyParser = require('body-parser'),
    jsonParser = bodyParser.json();

router.post('/api/users', jsonParser, function (req, res, next) {
  "use strict";

  var model = new User({
    email: req.body.email
  });

  var clear = req.body.password;

  model.setPassword(clear).then(function() {
    model.save(function (err) {
      if (err) {
        res.status(400).end(next);
      } else {
        res.status(201).type('json').send(model).end(next);
      }
    });
  }).catch(function (err) {
    res.status(400).end(next);
  });

});



module.exports = router;

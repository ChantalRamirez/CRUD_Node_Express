"use strict";

var crypto = require('crypto');

var jwt = require('jsonwebtoken');

var getHash = function getHash(password) {
  return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
};

function generateToken(user) {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1800s'
  });
}

function authenticate(req, res, next) {
  // Gather the jwt access token from the request header
  var token = req.header('Authorization');
  if (token == null) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, user) {
    console.log('User', user);
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next(); // pass the execution off to whatever request the client intended
  });
}

module.exports = {
  getHash: getHash,
  authenticate: authenticate,
  generateToken: generateToken
};
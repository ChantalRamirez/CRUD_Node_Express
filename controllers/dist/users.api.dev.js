"use strict";

var express = require('express');

var router = express.Router();

var usersModel = require('../models/users');

var _require = require('../utils/security'),
    getHash = _require.getHash,
    generateToken = _require.generateToken;

router.post('/create', function _callee(req, res) {
  var _req$body, email, name, password;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, email = _req$body.email, name = _req$body.name, password = _req$body.password;
          _context.next = 4;
          return regeneratorRuntime.awrap(usersModel.create({
            email: email,
            name: name,
            password: getHash(password)
          }));

        case 4:
          res.status(201).json({
            sucess: true,
            message: 'User created'
          });
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            error: _context.t0.message
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.post('/login', function _callee2(req, res) {
  var _req$body2, email, password, user, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.next = 4;
          return regeneratorRuntime.awrap(usersModel.getByEmail(email));

        case 4:
          user = _context2.sent;

          if (user) {
            if (user.password === getHash(password)) {
              delete user.password;
              token = generateToken(user);
              res.json({
                token: token
              });
            } else {
              res.json({
                message: 'Incorrect password'
              });
            }
          } else {
            res.json({
              message: 'User does not exists'
            });
          }

          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            error: _context2.t0.message
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
module.exports = router;
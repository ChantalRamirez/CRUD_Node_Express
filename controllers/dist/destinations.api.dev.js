"use strict";

var express = require('express');

var router = express.Router();

var destinationsModel = require('../models/destinations');

var _require = require('../utils/security'),
    authenticate = _require.authenticate;

router.get('/', authenticate, function _callee(req, res, next) {
  var destinations;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(destinationsModel.getAll());

        case 3:
          destinations = _context.sent;
          res.json({
            destinations: destinations
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
}); //muestra un registro de destinos de la base de datos

router.get('/:id/show', function _callee2(req, res, next) {
  var id, destination;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = Number(req.params.id);
          _context2.next = 4;
          return regeneratorRuntime.awrap(destinationsModel.getById(id));

        case 4:
          destination = _context2.sent;
          res.json({
            destination: destination
          });
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
}), router.post('/create', function _callee3(req, res) {
  var destination;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          destination = req.body;
          _context3.next = 4;
          return regeneratorRuntime.awrap(destinationsModel.create(destination));

        case 4:
          res.status(201).json({
            sucess: true
          });
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            error: _context3.t0.message
          });

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
}), //Actualizar la información de un destino
router.put('/:id/save', function _callee4(req, res) {
  var id, destination;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = Number(req.params.id);
          destination = req.body;
          _context4.next = 5;
          return regeneratorRuntime.awrap(destinationsModel.update(id, destination));

        case 5:
          res.sendStatus(204);
          _context4.next = 11;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            error: _context4.t0.message
          });

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
}), //eliminar un resgistro
router["delete"]('/:id/delete', function _callee5(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = Number(req.params.id);
          _context5.next = 4;
          return regeneratorRuntime.awrap(destinationsModel.destroy(id));

        case 4:
          res.sendStatus(204);
          _context5.next = 10;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            error: _context5.t0.message
          });

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
}), module.exports = router;
"use strict";

var db = require('../db_config');

var getAll = function getAll() {
  var _destinations;

  return regeneratorRuntime.async(function getAll$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(db.Destination.findAll({
            raw: true
          }));

        case 3:
          _destinations = _context.sent;
          console.log(_destinations);
          return _context.abrupt("return", _destinations);

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          throw Error(_context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var create = function create(destination) {
  return regeneratorRuntime.async(function create$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(db.Destination.create(destination));

        case 3:
          return _context2.abrupt("return", true);

        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          throw Error(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

var getById = function getById(id) {
  var destination;
  return regeneratorRuntime.async(function getById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(db.Destination.findOne({
            raw: true,
            where: {
              id: id
            }
          }));

        case 3:
          destination = _context3.sent;
          return _context3.abrupt("return", destination);

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          throw Error(_context3.t0);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var update = function update(id, destination) {
  return regeneratorRuntime.async(function update$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(db.Destination.update(destination, {
            where: {
              id: id
            }
          }));

        case 3:
          return _context4.abrupt("return", true);

        case 6:
          _context4.prev = 6;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          throw Error(_context4.t0);

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

var destroy = function destroy(id) {
  return regeneratorRuntime.async(function destroy$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(db.Destination.destroy({
            where: {
              id: id
            }
          }));

        case 3:
          return _context5.abrupt("return", true);

        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          throw Error(_context5.t0);

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

var getDestination = function getDestination(id) {
  return destinations.find(function (item) {
    return item.id == id;
  });
};

module.exports = {
  getAll: getAll,
  create: create,
  getById: getById,
  update: update,
  destroy: destroy,
  getDestination: getDestination
};
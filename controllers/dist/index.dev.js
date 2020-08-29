"use strict";

var express = require('express');

var router = express.Router();

var destinationsModel = require('../models/destinations');

var db_config = require('../db_config');
/* GET home page. */


router.get('/destinations', function _callee(req, res, next) {
  var destinations;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(destinationsModel.getAll());

        case 2:
          destinations = _context.sent;
          res.render('destinations/list', {
            destinations: destinations
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}); //Muestra el formulario

router.get('/destinations/new', function (req, res) {
  res.render('destinations/new');
}), //Guarda la información del formulario
router.post('/destinations/create', function _callee2(req, res) {
  var destination, success;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // console.log (req.body);
          destination = req.body;
          _context2.next = 3;
          return regeneratorRuntime.awrap(destinationsModel.create(destination));

        case 3:
          success = _context2.sent;

          if (success) {
            res.send('Se ha creado correctamente');
          } else {
            res.send('Ha ocurrido un error al crear');
          }

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}), //Formulario para editar informacion
router.get('/destinations/:id/edit', function _callee3(req, res) {
  var id, destination;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = Number(req.params.id);
          _context3.next = 3;
          return regeneratorRuntime.awrap(destinationsModel.getById(id));

        case 3:
          destination = _context3.sent;

          if (destination) {
            res.render('destinations/edit', {
              destination: destination
            });
          } else {
            res.send('No se encontró la información requerida');
          }

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
}), //Actualizar la información de un destino
router.post('/destinations/:id/save', function _callee4(req, res) {
  var id, destination, success;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = Number(req.params.id);
          destination = req.body;
          _context4.next = 4;
          return regeneratorRuntime.awrap(destinationsModel.update(id, destination));

        case 4:
          success = _context4.sent;

          if (success) {
            res.send('Datos actualizados correctamente');
          } else {
            res.send('Hubo un error al actualizar el registro');
          }

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
}), //eliminar un resgistro
router.get('/destinations/:id/delete', function _callee5(req, res) {
  var id, success;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = Number(req.params.id);
          _context5.next = 3;
          return regeneratorRuntime.awrap(destinationsModel.destroy(id));

        case 3:
          success = _context5.sent;

          if (success) {
            res.send('El registro se ha eliminado correctamente');
          } else {
            res.send('No se ha podido eliminar el registro');
          }

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
}), //muestra un registro de destinos de la base de datos
router.get('/destinations/:id/show', function _callee6(req, res) {
  var id, destination;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          id = Number(req.params.id);
          _context6.next = 3;
          return regeneratorRuntime.awrap(destinationsModel.getById(id));

        case 3:
          destination = _context6.sent;

          if (destination) {
            res.render('destinations/show', {
              destination: destination
            });
          } else {
            res.send('No se encontró la información requerida');
          }

        case 5:
        case "end":
          return _context6.stop();
      }
    }
  });
}), router.get('/api/v1/destinations', function _callee7(req, res, next) {
  var destinations;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(destinationsModel.getAll());

        case 2:
          destinations = _context7.sent;
          res.json({
            destinations: destinations
          });

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
});
module.exports = router;
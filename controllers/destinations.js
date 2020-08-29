var express = require('express');
var router = express.Router();
const destinationsModel = require('../models/destinations');
const db_config = require('../db_config');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const destinations = await destinationsModel.getAll();
    res.render('destinations/list', {destinations});
});

//Muestra el formulario
router.get('/new', (req, res) => {
    res.render('destinations/new');
}),

//Guarda la información del formulario
router.post('/create', async(req, res) => {
 // console.log (req.body);
 const destination = req.body;
 const success = await destinationsModel.create(destination);
 if (success) {
   res.send('Se ha creado correctamente');
 } else {
   res.send('Ha ocurrido un error al crear');
 }
}),

//Formulario para editar informacion
router.get('/:id/edit', async (req, res) => {
  const id = Number(req.params.id);
  const destination = await destinationsModel.getById(id);
  if (destination) {
    res.render('destinations/edit', { destination })
  } else {
    res.send('No se encontró la información requerida')
  }
}),

//Actualizar la información de un destino
router.post('/:id/save', async (req, res) => {
  const id = Number(req.params.id);
  const destination = req.body;
  const success = await destinationsModel.update(id, destination);
  if (success) {
    res.send('Datos actualizados correctamente');
  } else {
    res.send('Hubo un error al actualizar el registro');
  }
}),

//eliminar un resgistro
router.get('/:id/delete',async (req, res) => {
    const id = Number(req.params.id);
    const success = await destinationsModel.destroy(id);
    if (success) {
      res.send('El registro se ha eliminado correctamente');
    } else {
      res.send('No se ha podido eliminar el registro');
    }
}),

//muestra un registro de destinos de la base de datos
router.get('/:id/show',async (req, res) => {
  const id = Number(req.params.id);
  const destination = await destinationsModel.getById(id);
  if (destination) {
    res.render('destinations/show', { destination })
  } else {
    res.send('No se encontró la información requerida')
  }
}),


module.exports = router;

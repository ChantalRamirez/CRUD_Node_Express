var express = require('express');
var router = express.Router();
const destinationsModel = require('../models/destinations');
const {authenticate} = require ('../utils/security')
const { uploadFileToS3 } = require('../lib/fileUploaders');
const uuid = require('uuid');
const path = require('path');

router.get('/',authenticate, async function(req, res, next) {
    try{
        const destinations =  await destinationsModel.getAll();
        res.json({destinations});
    }catch (err){
        res.status(500).json({error: err.message});
    }
  });

//muestra un registro de destinos de la base de datos
router.get('/:id/show',async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const destination = await destinationsModel.getById(id);
        res.json({ destination });
      } catch(err) {
        res.status(500).json({ error: err.message });
      }
  }),

  
  router.post('/create', authenticate, async (req, res) => {
    try {
      const destination = req.body;
      if(req.files) {
        let image = req.files.image;
        const fileName = image.name;
        const generatedFileName = `${uuid.v4()}${path.extname(fileName)}`;
        const filePathAndName = `./public/images/${generatedFileName}`;
        await image.mv(filePathAndName);
        const imageUrl = await uploadFileToS3(filePathAndName, generatedFileName);
        destination.image = imageUrl;
      }
      await destinationsModel.create(destination);
      res.status(201).json({ sucess: true });
    } catch(err) {
      res.status(500).json({ error: err.message });
    }
  }),

   //Actualizar la información de un destino
    router.put('/:id/save', async (req, res) => {
    try{
        const id = Number(req.params.id);
        const destination = req.body;
        await destinationsModel.update(id, destination);
        res.sendStatus(204)
    }catch (err){
        res.status(500).json({error: err.message});
    }
  }),

  //eliminar un resgistro
router.delete('/:id/delete',async (req, res) => {
try{
    const id = Number(req.params.id);
    await destinationsModel.destroy(id);
    res.sendStatus(204);
}catch (err){
    res.status(500).json({error: err.message});
}
}),

  module.exports = router;
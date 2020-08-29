var express = require('express');
var router = express.Router();
const usersModel = require('../models/users');
const {getHash, generateToken} = require('../utils/security')

router.post('/create', async(req,res) => {
try {
    const { email, name, password} = req.body;
    await usersModel.create({
        email,
        name,
        password: getHash(password)
    });
    res.status(201).json({ sucess:true, message:'User created'});
} catch (error) {
    res.status(500).json({error: error.message});
}
});

router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await usersModel.getByEmail(email);
      if (user) {
        if (user.password === getHash(password)) {
            delete user.password;
            const token = generateToken(user);
          res.json({ token });
        } else {
          res.json({ message: 'Incorrect password' });
        }
      } else {
        res.json({ message: 'User does not exists' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })

module.exports = router;
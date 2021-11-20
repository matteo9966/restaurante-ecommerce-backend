//login 
//registrazione
const express = require('express');
const router = express.Router();
const {register,login} = require('../controllers/authentication-controller');
router.route('/login').post(login)
router.route('/register').post(register);//ci metto il metodo per la registrazione 


module.exports = router
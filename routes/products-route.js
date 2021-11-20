const express = require('express');
const router = express.Router();
const {OrdinaryUserAuth,AdminUserAuth} = require('../middleware/authentication');
const uploadProductImage = require('../controllers/uploadProductImage-controller');

//l'autenticazione deve essere per create Product. se utente non è autenticato e nn ha il
const {getAllProducts,createSingleProduct} = require('../controllers/products-controller');
// router.route('/products').post(OrdinaryUserAuth,AdminUserAuth,createSingleProduct).get(getAllProducts);

router.route('/products').post(createSingleProduct).get(getAllProducts);

router.route('/uploadimage').post(uploadProductImage) //per adesso senza autenticazione poi ci metto l'autenticazione.

router.route('/dummy').post(OrdinaryUserAuth,AdminUserAuth,(req,res)=>{res.status(200).json(req.body)})

module.exports = router;
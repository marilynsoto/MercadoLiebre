const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage });


const productsController = require('../controllers/productsController');

router.get('/', productsController.index); 

router.get('/create', productsController.create);
router.post('/create', upload.single('image'), productsController.store);

router.get('/detail/:id/', productsController.detail); 

router.get('/edit/:id/', productsController.edit); 
router.put('/edit/:id/', productsController.update);

router.delete('/delete/:id', productsController.destroy); 

module.exports = router;







/*** CREATE ONE PRODUCT ***/ 
//mostrar formulario
//router.get('/create', productsController.create); 
//tanto la ruta del get como el post no deben ser iguales

//para guardar los datos del formulario, vamos a recibir la informacion en 
// el body y lo vamos a almacenar en el json
//router.post('/create', upload.single('image'), productsController.store); 


// /*** GET ONE PRODUCT ***/ 
// router.get('/detail/:id/', productsController.detail); 

// // /*** EDIT ONE PRODUCT ***/ 
// // router.get('/edit/:id/', productsController.edit); 
// // router.put('/edit/:id/', productsController.update); 


// // // /*** DELETE ONE PRODUCT***/ 
// // router.delete('/delete/:id', productsController.destroy); 


// module.exports = router;

const express = require('express');
const app = express();
const path = require('path');
const methodOverride =  require('method-override');

const pathPublic = path.resolve(__dirname, '../public');
app.use(express.static(pathPublic));
app.use(methodOverride('_method'));
//Crear rutas en constantes//
const mainRouter = require('./routers/main');
const usersRouter = require('./routers/users');
const productsRouter = require('./routers/products');
//Uso de Templates Engines//
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, '/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Llamamos todas las rutas en la app//
app.use('/', mainRouter);
app.use('/', usersRouter);
app.use('/products', productsRouter);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Servidor funcionando en http://localhost:' + port);
});
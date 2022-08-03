const express = require('express');
const app = express();
const path = require('path');

const pathPublic = path.resolve(__dirname, '../public');
app.use(express.static(pathPublic));

//Crear rutas en constantes//
const mainRouter = require('./routers/main');

//Uso de Templates Engines//
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, '/views'));


//Llamamos todas las rutas en la app//
app.use('/', mainRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Servidor funcionando en http://localhost:' + port);
});
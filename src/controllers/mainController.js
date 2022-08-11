const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const controller = {
    home: (req, res) => {
        const visited = products.filter(product => product.category === 'visited');
        const inSale = products.filter(product => product.category === 'in-sale');
        res.render('home', { visited, inSale });
    },
}

module.exports = controller;
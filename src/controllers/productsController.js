const { json } = require('express');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    index: (req, res) => {
        res.render('products', { products });
    },
    detail: (req, res) => {
        const product = products.find(product => product.id == req.params.id);
        res.render('detail', { product });
    },
    create: (req, res) => {
        res.render('product-create');
    },
    store: (req, res) => {
        const productsClone = products;
        const newProduct = {
            id: productsClone.length,
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            category: req.body.category,
            description: req.body.description,
            image: req.file?.filename
        };
        productsClone.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(productsClone, null, '  '));
        //redirect va a esa ruta digamo
        res.redirect('/products/');
    },
    edit: (req, res) => {
        const product = products.find(product => product.id == req.params.id);
        res.render('product-edit', { product });
    },
    update: (req, res) => {
        let productIndex = products.findIndex(product => product.id == req.params.id);
        products[productIndex] = {
            id: productIndex,
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            description: req.body.description,
            category: req.body.category,
            image: products[productIndex].image
        };
        let productModifidJSON = JSON.stringify(products, null, '  ');
        fs.writeFileSync(productsFilePath, productModifidJSON);
        res.redirect('/products/');
    },
    destroy : (req, res) => {
        const allProductFilter = products.filter(product => product.id != req.params.id);
        fs.writeFileSync(productsFilePath, JSON.stringify(allProductFilter, null, '  '));
        res.redirect('/products/');
    }
};

module.exports = controller;
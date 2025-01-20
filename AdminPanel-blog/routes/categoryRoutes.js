const express = require('express');
const routes = express.Router();
const categoryclr = require('../controller/categoryController')

routes.get('/',categoryclr.addcategory);
routes.post('/addNewCategory',categoryclr.addNewCategory)
routes.get('/viewcategory', categoryclr.viewcategory);
routes.get('/categoryDelete/:id',categoryclr.delcate)

module.exports = routes
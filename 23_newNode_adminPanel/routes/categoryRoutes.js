const express = require("express");

const routes = express.Router();



const categoryctl = require("../controllers/categoryCtl");

routes.get("/", categoryctl.addcategory);

routes.post("/insertCategory", categoryctl.insertCategory);

routes.get("/viewcategory", categoryctl.viewcategory);

routes.get("/deletecategory", categoryctl.deletecategory);
routes.post("/updateCategory", categoryctl.updateCategory);
routes.get("/editcategory", categoryctl.editcategory);



module.exports = routes;
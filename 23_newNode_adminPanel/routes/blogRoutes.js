const express = require("express");

const routes = express.Router();



const blogCtl = require("../controllers/blogControllers");


routes.get("/", blogCtl.addBlog);

routes.post("/insertBlog", blogCtl.insertBlog);

routes.get("/viewBlog", blogCtl.viewBlog);

routes.get("/deleteBlog", blogCtl.deleteBlog);

routes.get("/updateBlog", blogCtl.updateBlog);

routes.post("/editBlog", blogCtl.editBlog)

module.exports = routes;
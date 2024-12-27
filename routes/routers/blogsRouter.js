const express = require('express');
const blogCtl = require("../controllers/blogCtl");
const blogModales = require("../modales/blogModales");
const router = express.Router();

console.log("router run");

router.get('/', blogCtl.home);
router.get('/addBlog', blogCtl.AddBlog);
router.post('/addNewBlog',blogModales.uploadedimage, blogCtl.AddNewBlog);
router.get('/editBlog/:id', blogCtl.editBlog);
router.post('/upDate',blogModales.uploadedimage, blogCtl.upDate);
router.get('/deleteBlog/:id', blogCtl.deleteBlog);


module.exports = router;
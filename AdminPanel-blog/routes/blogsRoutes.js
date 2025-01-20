const express = require("express");
const router = express.Router();
const blogController = require("../controller/blogController");
const BlogsModel = require("../model/blogsmodel");

router.get("/", blogController.addBlogs);
router.get("/viewblogs", blogController.viewblog);
router.get("/editData/:id", blogController.editData);
router.get("/deleteblogs/:id", blogController.deletesblog);

router.post("/insertBlogs", BlogsModel.uploadImage, blogController.insertBlogs);
router.post("/updateblogs", BlogsModel.uploadImage, blogController.updateblogs);


module.exports = router;

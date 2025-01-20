const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");

const imagepath = "/uploads";

const BlogsSchema =  mongoose.Schema({
    categoryid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    blogDate: {
        type: String,
        required: true,
    },
    images: {
        type: String,
        required: true,
    },
});

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", imagepath));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});

BlogsSchema.statics.uploadImage = multer({ storage: imageStorage }).single("images");
BlogsSchema.statics.images = imagepath;

const BlogsModel = mongoose.model("BlogsModel", BlogsSchema);
module.exports = BlogsModel;

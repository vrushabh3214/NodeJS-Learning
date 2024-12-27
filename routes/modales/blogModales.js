/* eslint-disable no-undef */
const mongoose = require('mongoose');
const { Schema } = mongoose;
const multer = require('multer');
const path = require('path');
const imagePath = "/uploads";    

const blogModalesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: Array,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
   
    image: {
        type: String,
        required: true
    }
});

const imgStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', imagePath))
    },
    filename:  (req, file, cb)=> {
      const uniqueSuffix = Date.now()
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

  blogModalesSchema.statics.uploadedimage = multer({ storage: imgStorage }).single('image');
  blogModalesSchema.statics.imgPath = imagePath

const blogModales = mongoose.model('blogModales', blogModalesSchema);
module.exports  =  blogModales ;
/* eslint-disable no-undef */
const mongoose = require('mongoose');
const { Schema } = mongoose;
const multer = require('multer');
const path = require('path');
const imagePath = "/uploads";    

const newAdminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    hobbies: {
        type: Array,
        required: true
    },
    gander: {
        type: String,
        required: true
    },
   
    message: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', imagePath))
    },
    filename:  (req, file, cb)=> {
      const uniqueSuffix = Date.now()
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

  newAdminSchema.statics.uploadedImage = multer({ storage: storage }).single('image');
  newAdminSchema.statics.imgPath = imagePath

const newAdmin = mongoose.model('newAdmin', newAdminSchema);
module.exports  =  newAdmin ;
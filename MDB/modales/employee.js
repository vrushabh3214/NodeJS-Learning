/* eslint-disable no-undef */
const mongoose = require('mongoose');
const { Schema } = mongoose;

// const db = mongoose.connect("mongodb://127.0.0.1:27017/InoteBook");

const employeeSchema = new Schema({
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
   
    about: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    }
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports  =  Employee 
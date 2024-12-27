/* eslint-disable no-undef */
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/BlogData");

    const db = mongoose.connection;

    db.once('open',err => console.log(err?err:"Database Connected"));


module.exports = db;

const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
    categoryName:{
        type : String,
        required : true
    }
},{
    timestamps : true
})

const category = mongoose.model('category',categorySchema);
module.exports = category
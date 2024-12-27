const  mongoose = require("mongoose");

const categoryModalesSchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    categoryDate: {
        type: String,
        required: true
    }

})

const Category = mongoose.model('Category', categoryModalesSchema);
module.exports  =  Category ;

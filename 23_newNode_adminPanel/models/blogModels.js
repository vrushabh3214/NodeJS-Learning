const mongoose = require("mongoose");


const BlogSchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },

    titleName: {
        type: String,
        required: true
    },
    aboutName: {
        type: String,
        required: true
    },
    blogStatus: {
        type: Boolean,
        required: true,
        default: true
    },
    date: {
        type: String,
        required: true,
    }

}, {
    timestamps: true
})

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
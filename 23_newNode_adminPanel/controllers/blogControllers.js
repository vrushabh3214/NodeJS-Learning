const Blog = require("../models/blogModels");
const category = require("../models/categoryModel");



module.exports.addBlog = async (req, res) => {
    try {
        let categoryData = await category.find();
        return res.render("Blog/addBlog", {
            categoryData
        });
    }
    catch {
        console.log("something is wrong");
        return res.redirect("back");
    }
}

module.exports.insertBlog = async (req, res) => {
    try {
        req.body.blogStatus = true;
        let blogData = await Blog.create(req.body);
        if (blogData) {
            console.log("blog data add successfully");
            return res.redirect("back")
        }
        else {
            console.log("data not found");
            return res.redirect("back");
        }
    }
    catch {
        console.log("something is wrong");
        return res.redirect("back")
    }
}

module.exports.viewBlog = async (req, res) => {

    let search = "";
    if (req.query.blogSearch) {
        search = req.query.blogSearch;
    }

    let per_page = 3;
    let page = 0;
    if (req.query.page) {
        page = req.query.page
    }
    let blogShow = await Blog.find({

        $or: [

            { titleName: { $regex: search } },

        ]
    }).skip(per_page * page).limit(per_page).populate("categoryId").exec();

    let totalCount = await Blog.find({
        $or: [

            { titleName: { $regex: search } },

        ]

    }).countDocuments();

    var totalPage = Math.ceil(totalCount / per_page);
    return res.render("Blog/viewBlog", {
        blogShow,
        search,
        totalPage,
        page
    })
}

module.exports.deleteBlog = async (req, res) => {
    try {
        console.log(req.query);
        
        let id = req.query.blogid;
        let blogData = await Blog.findByIdAndDelete(id);
        if (blogData) {
            console.log("Blog deleted successfully");
            return res.redirect("back")
        }
        else {
            console.log("query is not perform");
            return res.redirect("back")
        }
    }
    catch {
        console.log("something is wrong");
        return res.redirect("back")
    }
}

module.exports.updateBlog = async (req, res) => {
    try {
        id = req.query.blogid;
        let singBlog = await Blog.findById(id);
        const categoryData = await category.find();
        return res.render("Blog/updateBlog", {
            singBlog,
            categoryData
        })
    }
    catch {
        console.log("something is wrong");
        return res.redirect("back");
    }
}

module.exports.editBlog = async (req, res) => {
    try {
        let singleData = await Blog.findByIdAndUpdate(req.body.eid, req.body);
        if (singleData) {
            console.log("data update");
            return res.redirect("/blogs/viewBlog")
        }
    }
    catch {
        console.log("something is wrong");
        return res.redirect("back");
    }
}
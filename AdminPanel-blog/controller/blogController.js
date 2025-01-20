const BlogsModel = require("../model/blogsmodel");
const path = require("path");
const fs = require("fs");
const category = require("../model/categoryModel");

module.exports.addBlogs = async (req, res) => {
        let categoriesN = await category.find()
        return res.render("admin/addblog",{categoriesN});
  
};
module.exports.viewblog = async (req,res) => {
    let serach = '';
    let per_page = 3
    let page = 1;
    if (req.query.searchBlogs) {
        serach = req.query.searchBlogs;
    }
    if (req.query.page) {
        page = req.query.page;
    }
    const blogData = await BlogsModel.find({
        $or : [
            {title: {$regex : serach }},
            {description: {$regex : serach }},
            {author: {$regex : serach }},
        ]
    }).skip(per_page * page).limit(per_page).populate('categoryid').exec();
    const paginationData = await BlogsModel.find({
        $or : [
            {title: {$regex : serach }},
            {description: {$regex : serach }},
            {author: {$regex : serach }},
        ]
    }).countDocuments();

    let totalpage = Math.ceil(paginationData/per_page);
   
    
    return res.render("Blogs/viewblogs", {
         blogData,
        serach,
        page,
        totalpage
    });
}
module.exports.insertBlogs = async (req, res) => {
    try {
        let imagePath = "";
        if (req.file) {
            imagePath = BlogsModel.images + "/" + req.file.filename;
        }
        req.body.images = imagePath;

        await BlogsModel.create(req.body);
        console.log(req.body);
        
        return res.redirect("/Blogs/viewblogs");
    } catch (error) {
        console.error("Error insertBlogs blog:", error);
       
    }
};
module.exports.deletesblog = async (req, res) => {
    try {
        const singleData = await BlogsModel.findById(req.params.id);
        if (!singleData) {
            console.log("Blog not found");
            return res.redirect("back");
        }

        const deletePath = path.join(__dirname, "..", singleData.images);
        if (fs.existsSync(deletePath)) {
            try {
                fs.unlinkSync(deletePath);
            } catch (err) {
                console.log("Error delete image:", err);
            }
        }

        await BlogsModel.findByIdAndDelete(req.params.id);
        return res.redirect("back");
    } catch (err) {
        console.error("Error delete blog:", err);
        return res.redirect("back");
    }
};

module.exports.editData = async (req, res) => {
    try {
        const singleData = await BlogsModel.findById(req.params.id);
        if (!singleData) {
            console.log("Blog not found");
        }
        return res.render("Blogs/editBlogs", { singleData }); 
    } catch (error) {
        console.error("Error edite blog:", error);
    }
};
module.exports.updateblogs = async (req, res) => {
    try {
        const singleData = await BlogsModel.findById(req.body.id); 
        if (!singleData) {
            console.log("Blog not found");
            return res.redirect("/Blogs/viewblogs");
        }

        if (req.file) {
            let imageOldpath = path.join(__dirname, "..", singleData.images);
            try {
                fs.unlinkSync(imageOldpath); 
            } catch (err) {
                console.log("image not found:", err);
            }

            const newImagePath = BlogsModel.images + "/" + req.file.filename;
            req.body.images = newImagePath;
        } else {
            req.body.images = singleData.images; 
        }

        await BlogsModel.findByIdAndUpdate(req.body.id, req.body);
        return res.redirect("/Blogs/viewblogs");
    } catch (error) {
        console.error("Error uptate blog:", error);
        return res.redirect("/Blogs/viewblogs");
    }
};

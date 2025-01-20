const category = require("../models/categoryModel");




module.exports.addcategory = async (req, res) => {
    try {
        return res.render("category/addcategory");
    }
    catch {
        console.log("something is wrong");
        return res.redirect("back");
    }
}

module.exports.insertCategory = async (req, res) => {
    try {
        req.body.categorystatus = true;
        let categoryData = await category.create(req.body);
        if (categoryData) {
            console.log("category add successfully");
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
module.exports.viewcategory = async (req, res) => {


    let search = '';
    if (req.query.categorysearch) {
        search = req.query.categorysearch
    }

    let per_page = 2;
    let page = 0;
    if (req.query.page) {
        page = req.query.page
    }

    let categoryshow = await category.find({
        $or: [

            { categoryname: { $regex: search } }

        ]
    }).skip(per_page * page).limit(per_page);

    let totalcount = await category.find({
        $or: [

            { categoryname: { $regex: search } }

        ]

    }).countDocuments();

    var totalpage = Math.ceil(totalcount / per_page);
    return res.render("category/viewcategory", {
        categoryshow,
        search,
        totalpage,
        page
    })

}

module.exports.deletecategory = async (req, res) => {
    try {
        console.log(req.query);
        
        let categoryid = req.query.categoryid;
        let categoryData = await category.findByIdAndDelete(categoryid);
        if (categoryData) {
            console.log("category deleted successfully");
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

module.exports.updateCategory = async (req, res) => {
    try {
        let categoryData = await category.findByIdAndUpdate(req.body.id, req.body);
        
        
        if (categoryData) {
            console.log("category update successfully");
            // return res.redirect("back")
            return res.redirect("/category/viewcategory")
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

module.exports.editcategory = async (req, res) => {
    try {
        let categoryid = req.query.categoryid;
        let categoryData = await category.findById(categoryid);
        return res.render("category/updeteCategory", {
            categoryData
        })
    }
    catch {
        console.log("something is wrong");
        return res.redirect("back")
    }
}
const category = require('../model/categoryModel');

// Function to add category
module.exports.addcategory = async (req, res) => {
    try {
        let categoryData = await category.find();
        console.log(categoryData);
        return res.render('category/categoryBlogs', { categoryData });
    } catch (err) {
        console.error('Error fetching categories:', err);
        return res.redirect('back');
    }
}

const Category = require('../model/categoryModel');

module.exports.viewcategory = async (req, res) => {
    try {
        let categories = await Category.find();
        return res.render("category/viewcategory", { categories });
    } catch (error) {
        console.error("Error fetching categories:", error);
        return res.redirect('back');
    }
}
module.exports.addNewCategory = async (req, res) => {
    
    try {
        await category.create(req.body);
        return res.redirect('back');
    } catch (error) {
        console.error('Error inserting category blog:', error);
        return res.redirect('back');
    }
}
module.exports.delcate = async (req, res) => {
    
    try {
        await Category.findByIdAndDelete(req.params.id); 
        res.redirect('back'); 
    } catch (err) {
        console.error(err);
    }
};

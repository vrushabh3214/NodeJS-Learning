const Category = require("../modales/CategoryModale");

module.exports.home= (req, res) => {
    res.render('Category/addCategory');
}

module.exports.addCategory= async (req, res) => {
    try {
        console.log(req.body);
        
        await Category.create(req.body);
        res.redirect('/category');
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
}
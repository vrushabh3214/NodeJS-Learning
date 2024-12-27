const blogModales = require("../modales/blogModales");

const path = require("path");
const fs = require("fs");
const Category = require("../modales/CategoryModale");

module.exports.home = async (req, res) => {

  let searchData = '';
  if (req.query.search) {
    searchData = await req.query.search;
  }

  // let blogData = await blogModales.find({ title: { $regex: searchData} }).populate("categoryId").exec();

  let par_page = 2;
  let page = 0;

  if (req.query.page) {
    page = req.query.page;
  }

  let blogData = await blogModales.find({
    $or: [
      { title: { $regex: searchData } },
      { description: { $regex: searchData } },
      { author: { $regex: searchData } }
    ]
  }).skip(par_page * page).limit(par_page).populate("categoryId").exec();

  let totalData = await blogModales.find({
    $or: [
      { title: { $regex: searchData } },
      { description: { $regex: searchData } },
      { author: { $regex: searchData } }
    ]
  }).countDocuments();


  let totalPage = Math.ceil(totalData / par_page);
  


  res.render('blogs/blogsViemws', {
    blogData,
    searchData,
    totalPage,
    page
  })
}

module.exports.AddBlog = async (req, res) => {
  const categoryData = await Category.find();
  res.render('blogs/AddBlog', {
    categoryData
  });
}

module.exports.AddNewBlog = async (req, res) => {
  req.body.image = blogModales.imgPath + "/" + req.file.filename;
  await blogModales.create(req.body);
  res.redirect('/blogs')
}

module.exports.editBlog = async (req, res) => {
  let updateData = await blogModales.findById(req.params.id);

  res.render('blogs/editBlog', {
    updateData
  })
}

module.exports.upDate = async (req, res) => {
  let updateData = await blogModales.findById(req.body.id);


  if (req.file) {
    try {
      let path1 = path.join(__dirname, '..', updateData.image);
      await fs.unlinkSync(path1);

    }
    catch (err) {
      console.log(err);
    }
    req.body.image = blogModales.imgPath + "/" + req.file.filename;
  }
  else {
    req.body.image = updateData.image;
  }

  await blogModales.findByIdAndUpdate(req.body.id, req.body)
  res.redirect('/blogs')

}

module.exports.deleteBlog = async (req, res) => {
  try {
    const blogModalesId = req.params.id;

    const blogModalesData = await blogModales.findById(blogModalesId);

    if (blogModalesData && blogModalesData.image) {
      const imagePath = path.join(__dirname, "..", blogModalesData.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      } else {
        console.log(`Image not found: ${imagePath}`);
      }
    }

    await blogModales.findByIdAndDelete(blogModalesId);
    res.redirect("back");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
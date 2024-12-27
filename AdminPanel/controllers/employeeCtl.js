const employee = require('../modales/employee');
const path = require('path');
const fs = require('fs');


module.exports.home= (req, res) => {
    res.render('home')
}
module.exports.sendDeta = async (req, res) => {
    req.body.image = employee.imgPath + "/" + req.file.filename;
    await employee.create(req.body);
    res.redirect('/viewsEmp')
}

module.exports.viewsEmp = async (req, res) => {
    let empData = await employee.find();
    res.render('views-emp', {
        empData
    })
}

module.exports.editEmp = async (req, res) => {
    let updateData = await employee.findById(req.params.id);
    res.render('edit', {
        updateData
    })
}

module.exports.upDate = async (req, res) => { 
    let updateData = await employee.findById(req.body.id);

    if (req.file) {
      try {
        let path1 = path.join(__dirname, '..',updateData.image);
       await fs.unlinkSync(path1);
        
      }
      catch (err) {
        console.log(err);
      }
      req.body.image = employee.imgPath + "/" + req.file.filename;
    }
    else {
      req.body.image = updateData.image;
    }
   
    await employee.findByIdAndUpdate(req.body.id, req.body)
    res.redirect('/viewsEmp')

}

module.exports.deleteEmp = async (req, res) => {
    try {
        const employeeId = req.query.id;
    
        const employeeData = await employee.findById(employeeId);
    
        if (employeeData && employeeData.image) {
          const imagePath = path.join(__dirname,"..",employeeData.image);
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          } else {
            console.log(`Image not found: ${imagePath}`);
          }
        }
    
        await employee.findByIdAndDelete(employeeId);
        res.redirect("/viewsEmp");
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
}
const express = require('express');
const path = require('path');
const port = 3000;
const db = require('./config/db');
const fs = require('fs');
const employee = require('./modales/employee');

const app = express();

app.use(express.urlencoded())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use("/uploads", express.static(path.join(__dirname, 'uploads')))

app.get('/', async (req, res) => {
  res.render('home')
});

app.get('/viewsEmp', async (req, res) => {
  let empData = await employee.find();
  res.render('views-emp', {
    empData
  })
});

app.post('/sendDeta', employee.uploadedAvatar , async (req, res) => {
 
  console.log(req.body);
  console.log(req.file);
  req.body.image =employee.imgPath+"/"+ req.file.filename
  console.log(req.body);
  
  await employee.create(req.body);
  
  res.redirect('/viewsEmp')
})

app.get('/deleteEmp', async (req, res) => {
  console.log(req.query.id);
  var singlrdata = await employee.findById(req.query.id);
  console.log(singlrdata);
  
  var imagePath = path.join(__dirname,singlrdata.image)
 fs.unlinkSync(imagePath)
 console.log(imagePath);
 
  

  await employee.findByIdAndDelete(req.query.id);
  return res.redirect("/viewsEmp")
})

app.get('/editEmp/:id', async (req, res) => {
  let updateData = await employee.findById(req.params.id);
  res.render('edit', {
    updateData
  })
})
app.post('/upDate', (req, res) => {

  employee.findByIdAndUpdate( req.body.id, req.body)
  res.redirect('/viewsEmp')

})
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
const express = require('express');
const path = require('path');
const port = 3000;
const db = require('./config/db');
const employee = require('./modales/employee');

const app = express();

app.use(express.urlencoded())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('home', {
  })
});

app.post('/sendDeta',async (req, res) => {

  await employee.create(req.body);
  
  res.redirect('/')
})

// app.get('/deleteData', (req, res) => {
//   student.splice(req.query.id, 1)
//   res.redirect('/')
// })

// app.get('/editData', (req, res) => {
//   let updateData = student[req.query.id];
//   res.render('edit', {
//     updateData,
//     id: req.query.id
//   })
// })
// app.post('/upDate', (req, res) => {
//   student[req.body.id] = req.body;
//   res.redirect('/')

// })
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
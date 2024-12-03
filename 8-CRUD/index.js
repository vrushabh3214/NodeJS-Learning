const express = require('express');
const path = require('path');
const port = 3000
var student = [ 
  { name: "Jane Doe", email: "jane@example.com" }
]

const app = express();

app.use(express.urlencoded())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  res.render('home', {
    student
  })
});

app.post('/sendDeta', (req, res) => {
  student.push(req.body);

  res.redirect('/')
})

app.get('/deleteData',(req,res)=>{
  student.splice(req.query.id,1)
  res.redirect('/')
})

app.get('/editData',(req,res)=>{
  let updateData = student[req.query.id];
  res.render('edit', {
    updateData
  })
})
// app.get('/upDate',(req,res)=>{

//   })
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
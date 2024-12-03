const express = require('express');
const path = require('path');
const port = 3000
var data = "Helo wolde"

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  res.render('home',{
    data
  })
});

app.get('/about', (req, res) => {
  res.render('about')
});
app.get('/cont', (req, res) => {
  res.render('cont')
});
app.get('/404', (req, res) => {
  res.render('404')
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
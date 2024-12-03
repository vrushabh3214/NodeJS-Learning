const express = require('express');
const path = require('path');
const port = 3000


const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))


app.get('/', (req, res) => {
  res.render('home')
});

app.get('/about', (req, res) => {
    res.render('about')
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
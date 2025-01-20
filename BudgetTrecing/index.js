const express = require('express');
const path = require('path');
const port = 3000;
const db = require('./config/db');
const auth = require('./routers/authRoute');

const app = express();

app.use(express.urlencoded())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/',auth);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
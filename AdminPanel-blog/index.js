const express = require('express');
const app = express();
const port = 8001;
const path = require('path')
const db = require('./config/blogsConfig')

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname,"assets")));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use('/blogs',require('./routes/blogsRoutes'))
// app.use('/addmin',require('./routes/addminRoutes'))
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use('/',require('./routes/categoryRoutes'))


app.listen(port,(err)=>{
    if (err) {
        console.log(err);
        return false
    }
    console.log("server is start "+port);
})
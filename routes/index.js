const express = require('express');
const path = require('path');
const port = 3000;
const db = require('./config/db');
const router = require('./routers/univariateRouter');
const blogsRouter = require('./routers/blogsRouter');

const app = express();

app.use(express.urlencoded())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use("/uploads", express.static(path.join(__dirname, 'uploads')))

// app.use("/", router);
app.use("/", blogsRouter);
app.use("/category", require("./routers/categoryRouter.js"))


app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
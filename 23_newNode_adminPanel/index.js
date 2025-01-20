const express = require('express');
const port = 8009;
const app = express();
const path = require('path');
const db = require('./config/db');
const cookieParser = require('cookie-parser');

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require("./config/localStrategy")

app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'assets')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(session({
    name: "test",
    secret: "testing",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthUser);


app.use('/', require('./routes/adminRoute'));
app.use('/category',passport.checkAuthUser, require('./routes/categoryRoutes'));
app.use('/blogs',passport.checkAuthUser, require('./routes/blogRoutes'));

app.listen(port, (err) => {
    err ? console.log(err) : console.log("Server is running on http://localhost:" + port);
})
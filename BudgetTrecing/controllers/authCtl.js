const User = require('../modales/UserModale');

module.exports.signIn = (req, res) => {
    try {

        if (req.cookies.signInUserData) {
            res.redirect('/')
        }
        else {
            res.render('auth')
        }
    }
    catch (arr) {
        console.error(arr);
    }
}
module.exports.signInUser = async (req, res) => {
    try {
        console.log(req.body);
        const signInUserCount = await User.find({ email: req.body.email }).countDocuments();
        console.log(signInUserCount);

        if (signInUserCount == 1) {
            const signInUserData = await User.findOne({ email: req.body.email });
            console.log(signInUserData);

            if (signInUserData.password == req.body.password) {
                res.cookie('signInUserData', signInUserData);
                res.redirect('/')
            }
            else {
                console.log("password not match");
                res.redirect('/')
            }
        }
        else {
            console.log("user not found");
            res.redirect('/')
        }
    }
    catch (arr) {
        console.error(arr);
    }
}

module.exports.logout = async (req, res) => {
    try {
        res.clearCookie('signInUserData');
        res.redirect('/')
    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}
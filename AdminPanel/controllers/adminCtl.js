const adminMo = require("../modales/adminMo");
const path = require('path');
const fs = require('fs');
const { Z_ASCII } = require("zlib");


module.exports.dashboard = (req, res) => {

    try {
        if (req.cookies.signInUserData) {
            res.render('dashboard')
        }
        else {
            res.redirect('/')
        }
    }
    catch (arr) {
        console.error(arr);
    }

}


// /* module.exports.dashboard = (req, res) =>
// {
//     if (req.cookies.signInUserData) {
//         wconsole.log(req.cookies.signInUserData);
//         adminData = req.cookies.signInUserData
//          logoutData = req.cookies.logoutData
//         res.render('dashboard')
//     }
//     else{
//         res.redirect('/')
//     }
// } */




module.exports.AddNewAdmin = (req, res) => {
    try {
        if (req.cookies.signInUserData) {
            res.render('addAdmin')
        }
        else {
            res.redirect('/')
        }
    }
    catch (arr) {
        console.error(arr);
    }
}
module.exports.ViewAdmin = async (req, res) => {
    try {
        const adminData = await adminMo.find();
        if (req.cookies.signInUserData) {

            res.render('ViewAdmin', {
                adminData
            })
        }
        else {
            res.redirect('/')
        }
    }
    catch (arr) {
        console.error(arr);
    }
}

module.exports.sendAdminDeta = async (req, res) => {
    try {
        req.body.image = await adminMo.imgPath + "/" + req.file.filename;
        req.body.name = await req.body.fname + " " + req.body.lname;
        console.log(req.body);
        console.log(req.file);


        await adminMo.create(req.body);

        res.redirect('/ViewAdmin')
    }
    catch (arr) {
        console.error(arr);
    }
}

module.exports.editData = async (req, res) => {
    let updateData = await adminMo.findById(req.params.id);
    res.render('edit', {
        updateData
    })
}

module.exports.upDate = async (req, res) => {
    let updateData = await adminMo.findById(req.body.id);

    if (req.file) {
        try {
            let path1 = path.join(__dirname, '..', updateData.image);
            await fs.unlinkSync(path1);

        }
        catch (err) {
            console.log(err);
        }
        req.body.image = adminMo.imgPath + "/" + req.file.filename;
    }
    else {
        req.body.image = updateData.image;
    }

    await adminMo.findByIdAndUpdate(req.body.id, req.body)


    res.redirect('/dashboard')


}

module.exports.delete = async (req, res) => {
    try {
        const adminId = req.query.id;

        const adminData = await adminMo.findById(adminId);
        console.log(adminData);

        if (adminData && adminData.image) {
            const imagePath = path.join(__dirname, "..", adminData.image);
            console.log(imagePath);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            } else {
                console.log(`Image not found: ${imagePath}`);
            }
        }

        await adminMo.findByIdAndDelete(adminId);
        res.redirect("back");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports.signIn = (req, res) => {
    try {
        console.log(req.cookies.signInUserData);

        if (req.cookies.signInUserData) {
            res.redirect('/dashboard')
        }
        else {
            res.render('signIn')
        }
    }
    catch (arr) {
        console.error(arr);
    }
}
module.exports.signInUser = async (req, res) => {
    try {
        console.log(req.body);
        const signInUserCount = await adminMo.find({ email: req.body.email }).countDocuments();
        console.log(signInUserCount);

        if (signInUserCount == 1) {
            const signInUserData = await adminMo.findOne({ email: req.body.email });
            console.log(signInUserData);

            if (signInUserData.password == req.body.password) {
                res.cookie('signInUserData', signInUserData);
                res.redirect('/dashboard')
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
const express = require('express');
const adminCtl = require("../controllers/adminCtl");
const adminMo = require('../modales/adminMo');
const router = express.Router();

console.log("router run");

router.get('/dashboard', adminCtl.dashboard);
router.get('/AddNewAdmin', adminCtl.AddNewAdmin);
router.get('/ViewAdmin', adminCtl.ViewAdmin);
router.post('/sendAdminDeta', adminMo.uploadedImage, adminCtl.sendAdminDeta);
router.get('/editData/:id', adminCtl.editData);
router.post('/upDate', adminMo.uploadedImage, adminCtl.upDate);
router.get('/delete', adminCtl.delete);

router.get('/', adminCtl.signIn);
router.post('/signInUser', adminCtl.signInUser);
router.get('/signOut', adminCtl.logout);



module.exports = router;
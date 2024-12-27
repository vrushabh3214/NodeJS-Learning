const express = require('express');
const adminCtl = require("../controllers/adminCtl");
const router = express.Router();

console.log("router run");

router.get('/', adminCtl.dashboard);
router.get('/AddNewAdmin', adminCtl.AddNewAdmin);
router.get('/ViewAdmin', adminCtl.ViewAdmin);



module.exports = router;
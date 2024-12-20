const express = require('express');
const collegeCtl = require("../controllers/collegeCtl");
const router = express.Router();

console.log("router run");

router.get('/', collegeCtl.home);


module.exports = router;
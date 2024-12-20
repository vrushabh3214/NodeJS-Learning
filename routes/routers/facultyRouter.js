const express = require('express');
const facultyCtl = require("../controllers/facultyCtl");
const router = express.Router();

console.log("router run");

router.get('/', facultyCtl.home);


module.exports = router;
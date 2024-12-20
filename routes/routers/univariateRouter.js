const express = require('express');
const univariateCtl = require("../controllers/univariateCtl");
const router = express.Router();

console.log("router run");

router.get('/', univariateCtl.home);
router.use("/college", require("./collegeRouter"));
router.use("/faculty", require("./facultyRouter"));


module.exports = router;
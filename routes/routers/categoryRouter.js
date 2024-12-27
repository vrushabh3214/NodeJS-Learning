const express = require("express");
const  categoryCtl = require("../controllers/categoryCtl");
const router = express.Router();

console.log("router run");

router.get('/', categoryCtl.home);
router.post('/addCategory',categoryCtl.addCategory);

module.exports = router;
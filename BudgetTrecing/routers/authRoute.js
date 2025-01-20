const express = require('express');
const authCtl = require("../controllers/authCtl");
const router = express.Router();

console.log("router run");

router.get('/', authCtl.signIn);
router.post('/signInUser', authCtl.signInUser);
// router.post('/signUpUser', authCtl.signUpUser);
// router.get('/signOut', authCtl.logout);



module.exports = router;
const express = require('express');
const employee = require('../modales/employee');
const employeeCtl = require("../controllers/employeeCtl");
const router = express.Router();

console.log("router run");

router.get('/', employeeCtl.home);
router.get('/viewsEmp', employeeCtl.viewsEmp);
router.post('/sendDeta', employee.uploadedAvatar, employeeCtl.sendDeta);
router.get('/editEmp/:id', employeeCtl.editEmp);
router.post('/upDate', employee.uploadedAvatar, employeeCtl.upDate);
router.get('/deleteEmp', employeeCtl.deleteEmp);



module.exports = router;
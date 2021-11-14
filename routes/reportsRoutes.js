const express = require('express');
const router = express.Router();
const reportsControllers = require('../controllers/reportsControllers')

router.get('/allReports', reportsControllers.all_reports_GET);

router.get('/insertReport', reportsControllers.insert_report_GET);

router.post('/insertReport', reportsControllers.insert_report_POST);

router.get('/singleReport/:id', reportsControllers.single_report_GET);

router.get('/singleReport/delete/:id', reportsControllers.single_report_DELETE);

module.exports = router;

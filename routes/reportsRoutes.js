const express = require('express');
const router = express.Router();
const reportsControllers = require('../controllers/reportsControllers');
const upload = require('../controllers/multerController');
const multerErrorController = require('../controllers/multerErrorController');

router.get('/allReports', reportsControllers.GETallReports);

router.get('/allReports/:user', reportsControllers.GETallByUser);

router.get('/insertReport', reportsControllers.GETinsertReport);

router.post('/insertReport', upload.single('image'), multerErrorController, reportsControllers.POSTsingleReport);

router.get('/singleReport/:id', reportsControllers.GETsingleReport);

router.delete('/singleReport/:id', reportsControllers.DELETEsingleReport);

module.exports = router;

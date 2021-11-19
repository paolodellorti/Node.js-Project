const db = require('../models/mysqlConnection');

const all_reports_GET = (req, res) => {
    db.query('SELECT * FROM reports ORDER BY report_time DESC', (error, results) => {
        if (error) console.log(err);
        res.render('reports/allReports', { reports: results, title: 'All Reports' });
    })
}

const insert_report_GET = (req, res) => {
    res.render('reports/insertReport', { title: 'Insert a new report' });
};

const insert_report_POST = (req, res) => {
    console.log(req.file);
    if (!req.file) {
        db.query(`INSERT INTO reports (place, snippet) VALUES ("${req.body.place}", "${req.body.snippet}")`, (error) => {
            if (error) console.log(error);
            res.status(200).redirect('allReports');
        });
    } else if (req.file.filename) {
        console.log(req.file.filename);
        console.log(req.file.mimetype);

        res.status(200).json({
            message: "uploaded",
            url: req.file.filename
        })
    }
};

const single_report_GET = (req, res) => {
    const id = req.params.id;
    db.query(`SELECT * FROM reports WHERE id = ${id}`, (error, result) => {
        if (error) throw new Error;
        if (result[0] == undefined) {
            res.status(404).render('404', { title: "Report not found" });
        } else {
            res.render('reports/singleReport', { report: result[0],  title: `Report from ${result[0].place}`});
        }
    });
};

const single_report_DELETE = (req, res) => {
    const id = req.params.id;

    db.query(`DELETE FROM reports WHERE id = ${id}`, (error) => {
        if (error) console.log(error);
        res.redirect('/reports/allReports');
    })
};

module.exports = {
    all_reports_GET,
    insert_report_GET,
    insert_report_POST,
    single_report_GET,
    single_report_DELETE
}
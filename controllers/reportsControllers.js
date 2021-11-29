const { sequelize, Report } = require('../models');
const fs = require('fs');

const GETallReports = async (req, res) => {
    try {
        const reports = await Report.findAll({ order: [ ['createdAt', 'DESC'] ] });
        return res
                .status(200)
                .render('reports/allReports', { 
                    reports, 
                    title: 'All reports', 
                    error: "" 
                });

    } catch(err) {
        console.log(err);
        return res
                .status(500)
                .render('reports/allReports', { 
                    error: 'Something went wrong.', 
                    title: 'Error' 
                });
    }
}

const GETallByUser = async (req, res) => {
    try {
        const user = req.params.user;
        const reports = await Report.findAll({ order: [ ['createdAt', 'DESC'] ], where: { user } });
        console.log(reports);
        if (reports.length === 0) {
            return res
            .status(200)
            .render('reports/allReports', {
                reports,
                title: `No reports by ${user}`,
                error: `There are no reports from ${user}`
            });
        } else {
            return res
            .status(400)
            .render('reports/allReports', {
                reports,
                title: `All reports by ${user}`,
                error: "" 
            }); 
        }


    } catch(err) {
        console.log(err);
        return res
                .status(500)
                .render('reports/allReports', { 
                    error: 'Something went wrong.', 
                    title: 'Error' 
                });
    }
}

const GETinsertReport = (req, res) => {
    res.render('reports/insertReport', { 
        title: 'Insert a new report',
        error: '' 
    });
};

const POSTsingleReport = async (req, res) => {
    try {
        const { place, pollution, description, user } = req.body;
        if(req.fileValidationError) {
            return res
                .render('reports/insertReport', { 
                    title: 'Insert a new report',
                    error: req.fileValidationError
                });

        } else if (!req.file) {
            await Report.create({ place, pollution, description, user });
            return res
                    .status(300)
                    .redirect('allReports');
        } else if (req.file) {
            const image = req.file.filename;
            await Report.create({ place, pollution, description, user, image });
    
            return res
                    .status(300)
                    .redirect('allReports');
        }
    } catch(error) {
        console.log(error);
        return res
                .status(500)
                .render('reports/insertReport', { 
                    title: 'Insert a new report',
                    error
                });
    }
    
};

const GETsingleReport = async (req, res) => {
    try {
        const id = req.params.id;
        const report = await Report.findByPk(id);
        return res
                .status(200)
                .render('reports/singleReport', {
                    report,
                    title: `Report from ${report.place}`
                });
                
    } catch(error) {
        console.log(error);
        return res
                .status(404)
                .render('404', { title: "Report not found" });
    }
};

const deleteImage = async (id) => {
    const report = await Report.findByPk(id);
    const image = report.image;
    if (image) {
        const imgDir = `./public/reportImages/${image}`;
        const esxistsImg = fs.existsSync(imgDir)
    
        console.log(esxistsImg);
    
        if (esxistsImg) {
            fs.unlinkSync(imgDir);
            return "Deleted";
        } else {
            return "File doesn't extists";
        }
    }
}

const DELETEsingleReport = async (req, res) => {
    try {
        const id = req.params.id;
        await deleteImage(id);
        await Report.destroy({ where: { id } });
        return res
                .status(300)
                .json({ redirect: '/reports/allReports' });

    } catch(error) {
        return res
                .status(404)
                .render('404', { title: "Something went wrong" });
    }
};

module.exports = {
    GETallReports,
    GETallByUser,
    GETinsertReport,
    POSTsingleReport,
    GETsingleReport,
    DELETEsingleReport
}
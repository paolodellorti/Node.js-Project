const { sequelize, Report } = require('../models');

const GETallReports = async (req, res) => {
    try {
        const reports = await Report.findAll({ order: [ ['createdAt', 'DESC'] ] });

        return res
                .status(200)
                .render('reports/allReports', { 
                    reports, title: 'All reports', 
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

const GETinsertReport = (req, res) => {
    res.render('reports/insertReport', { 
        title: 'Insert a new report',
        error: '' 
    });
};

const POSTsingleReport = async (req, res) => {
    try {
        const { place, description } = req.body;

        if(req.fileValidationError) {
            return res
                .render('reports/insertReport', { 
                    title: 'Insert a new report',
                    error: req.fileValidationError
                });

        } else if (!req.file) {
            await Report.create({ place, description });
    
            return res
                    .status(300)
                    .redirect('allReports');
    
        } else if (req.file) {
            const image = req.file.filename;
            await Report.create({ place, description, image });
    
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

const DELETEsingleReport = async (req, res) => {
    try {
        const id = req.params.id;
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
    GETinsertReport,
    POSTsingleReport,
    GETsingleReport,
    DELETEsingleReport
}
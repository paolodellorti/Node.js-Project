const multer = require("multer");
const path = require("path");
const fs = require('fs');
const imgsDir = './public/reportImages';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const existsDir = fs.existsSync(imgsDir)
        if (!existsDir) {
            fs.mkdirSync(imgsDir, function(err) {
                if (err) {
                  console.log(err);
                } else {
                  console.log("New directory successfully created.");
                }
            })
        }
        cb(null, imgsDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const fileFilter = (req, file, cb) => {
    const ext = file.mimetype;
    if(ext !== 'image/jpeg' && ext !== 'image/png' && ext !== 'image/gif') {
        req.fileValidationError = "Wrong extension. Just images allowed!";
        return cb(null, false, req.fileValidationError)
    }
    cb(null, true)
}
 
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024*1024*10 }, // Limit to 10mb
    fileFilter: fileFilter
});

const fileSizeLimitErrorHandler = (err, req, res, next) => {
    if (err) {
        return res
                .render('reports/insertReport', { 
                    title: 'Insert a new report',
                    error: err
                })
    } else {
      next()
    }
  }

module.exports = { 
    upload, 
    fileSizeLimitErrorHandler
};
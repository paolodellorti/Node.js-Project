const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './db/reportImages');
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

module.exports = upload;
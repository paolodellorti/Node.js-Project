const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './db/reportImages');
    },
    filename: (req, file, cb) => {
        console.log(file.originalname + "ma che ohhhhhhhhhh");

        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || 'image/png') {
        cb(null, true);
    } else {
        cb(new Error("Unsupported file"), false)
    }
}
 
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024*1024*10 },
    fileFilter: fileFilter
});

module.exports = upload;
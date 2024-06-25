const multer = require("multer");
const path = require('path');

const MIME_TYPE_MAP = { 
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg", 
    "application/pdf":"pdf",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",  // Excel (.xlsx)
    "application/vnd.ms-excel": "xls",  // Older Excel (.xls)
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",  // Word (.docx)
    "application/msword": "doc",  // Older Word (.doc)

};
 
const storage = multer.diskStorage({
    destination: (req, file, cb) => { 
     console.log(file);
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Mime type invalide");
        if (isValid) {
            error = null;
        }
        cb(error, path.join(__dirname, '../', 'images'));
    },
    filename: (req, file, cb) => {
        const name = file.originalname
            .toLowerCase()
            .split(" ")
            .join("-");
        
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
    }
});

module.exports = multer({ storage: storage }).array("files");
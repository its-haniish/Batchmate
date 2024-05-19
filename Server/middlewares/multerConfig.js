const multer = require("multer");

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images"); // Specify the destination folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original filename
    },
});
const upload = multer({ storage: storage });

module.exports = upload;

const multer =require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/json" || file.mimetype === "text/csv") {
    cb(null, true);
  } else {
    cb(new Error("Only JSON or CSV allowed"), false);
  }
};
 const upload = multer({ storage, fileFilter });
module.exports={upload}
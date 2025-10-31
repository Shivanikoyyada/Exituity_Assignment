// const express =require ("express");
// const { upload } =require ("../middleware/multer.js");
// const { normalizeFinancialData } =require( "../controllers/normalizeController.js");

// const router = express.Router();

// router.post("/normalize", upload.single("file"), normalizeFinancialData);

// module.exports=router

const express = require("express");
const multer = require("multer");
const { normalizeData } = require("../controllers/normalizeController");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), normalizeData);

module.exports = router;


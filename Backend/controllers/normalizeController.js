// const fs =require ("fs");
// const { parse } = require("csv-parse/sync");
// const { normalizeKey } =require ("../utils/normalizer.js");

// const normalizeFinancialData = async (req, res) => {
//   try {
//     const file = req.file;

//     if (!file) return res.status(400).json({ message: "No file uploaded" });

//     let rawData;
//     let data = {};

//     if (file.mimetype === "application/json") {
//       rawData = JSON.parse(fs.readFileSync(file.path, "utf-8"));
//       data = rawData;

//     } else if (file.mimetype === "text/csv") {
//       rawData = fs.readFileSync(file.path, "utf-8");
//       const records = parse(rawData, { columns: true });
//       data = records[0];
//     }

//     let normalized = {
//       revenue: null,
//       net_profit: null,
//       growth_rate: null
//     };

//     Object.keys(data).forEach(k => {
//       const key = normalizeKey(k);
//       if (key) normalized[key] = data[k];
//     });

//     return res.json({ success: true, normalized });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// }
// module.exports={normalizeFinancialData}

// const fs = require("fs");
// const path = require("path");

// exports.normalizeData = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const ext = path.extname(req.file.originalname).toLowerCase();

//     let raw;
//     if (ext === ".json") {
//       raw = fs.readFileSync(req.file.path, "utf8");
//       raw = raw.replace(/^\uFEFF/, ""); // remove BOM if exists

//       const jsonData = JSON.parse(raw);

//       const normalized = {
//         revenue: jsonData.revenue || jsonData.turnover || "NA",
//         net_profit: jsonData.net_profit || jsonData.profit || "NA",
//         growth_rate: jsonData.growth_rate || jsonData.growth || "NA",
//       };

//       fs.unlinkSync(req.file.path);
//       return res.json(normalized);
//     }

//     return res.status(400).json({ error: "Only JSON file supported now" });
//   } catch (err) {
//     console.log("Error:", err);
//     return res.status(500).json({ error: "Processing failed", error_message: err.message });
//   }
// };-------------------------------------------
// const normalizeData = async (req, res) => {
//   try {
//     console.log("Uploaded File:", req.file); // ✅ Check file is received

//     if (!req.file) {
//       return res.status(400).json({ message: "File not uploaded" });
//     }

//     const fs = await import("fs/promises");

//     // Read uploaded JSON file
//     const fileContent = await fs.readFile(req.file.path, "utf8");
//     const json = JSON.parse(fileContent); // ✅ parse JSON

//     console.log("Parsed data:", json);

//     return res.json(json); // Test return first
//   } catch (err) {
//     console.error("Error:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };
// module.exports={normalizeData}
// ------------------------------------------
const fs = require("fs");
const csv = require("csv-parser");

const normalizeData = (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const filePath = req.file.path;

    // Key mapping rules
    const keyMap = {
      revenue: ["revenue", "sales", "turnover"],
      profit: ["profit", "net income", "profit after tax"],
      growth: ["growth", "yoy", "growth rate"],
      assets: ["assets"]
    };

    const normalizeKeys = (obj) => {
      let normalized = {};

      for (let standardKey in keyMap) {
        for (let key of keyMap[standardKey]) {
          if (obj[key] !== undefined) {
            normalized[standardKey] = obj[key];
            break;
          }
        }
      }

      if (obj.company) normalized.company = obj.company; // keep company
      return normalized;
    };

    if (req.file.mimetype === "application/json") {
      const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));
      const normalizedData = jsonData.map(normalizeKeys);

      return res.json({ message: "JSON normalized", data: normalizedData });
    }

    if (req.file.mimetype === "text/csv") {
      let csvData = [];

      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row) => csvData.push(row))
        .on("end", () => {
          const normalizedData = csvData.map(normalizeKeys);
          res.json({ message: "CSV normalized", data: normalizedData });
        });
      return;
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error processing file", error: error.message });
  }
};
module.exports={normalizeData}

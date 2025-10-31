const express =require("express");
const cors =require("cors");
const normalizeRoute =require("./routes/normalizeRoute.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", normalizeRoute);

app.listen(5000, () => console.log("Backend running on port 5000"));

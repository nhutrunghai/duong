const express = require("express");
const cors = require("cors");
require("dotenv").config();

const lophocRoutes = require("./routes/lophocRoutes");
const sinhvienRoutes = require("./routes/sinhvienRoutes");

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Student management API is running",
    endpoints: ["/api/lophoc", "/api/sinhvien"],
  });
});

app.use("/api/lophoc", lophocRoutes);
app.use("/api/sinhvien", sinhvienRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Endpoint not found" });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ success: false, message: "Internal server error" });
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

module.exports = app;

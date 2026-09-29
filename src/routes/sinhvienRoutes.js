const express = require("express");
const router = express.Router();
const sinhvienController = require("../controllers/sinhvienController");

router.get("/", sinhvienController.getAllSinhVien);
router.get("/:id", sinhvienController.getSinhVienById);
router.post("/", sinhvienController.createSinhVien);
router.put("/:id", sinhvienController.updateSinhVien);
router.delete("/:id", sinhvienController.deleteSinhVien);

module.exports = router;


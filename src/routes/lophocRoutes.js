const express = require("express");
const router = express.Router();
const lophocController = require("../controllers/lophocController");

router.get("/", lophocController.getAllLopHoc);
router.get("/:id", lophocController.getLopHocById);
router.post("/", lophocController.createLopHoc);
router.put("/:id", lophocController.updateLopHoc);
router.delete("/:id", lophocController.deleteLopHoc);

module.exports = router;


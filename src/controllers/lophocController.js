const lophocRepository = require("../repositories/lophocRepository");
const { isPositiveInteger } = require("../utils/validation");
const { sendPrismaError } = require("../utils/prismaError");

function validClassName(value) {
  return typeof value === "string" && value.trim().length > 0 && value.trim().length <= 100;
}

function toClassResponse(lopHoc) {
  return { id: lopHoc.id, ten_lop: lopHoc.tenLop };
}

exports.getAllLopHoc = async (req, res) => {
  try {
    const classes = await lophocRepository.findAll();
    res.json({ success: true, count: classes.length, data: classes.map(toClassResponse) });
  } catch (error) {
    sendPrismaError(error, res);
  }
};

exports.getLopHocById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!isPositiveInteger(id)) {
      return res.status(400).json({ success: false, message: "Invalid class ID" });
    }
    const lopHoc = await lophocRepository.findById(id);
    if (!lopHoc) {
      return res.status(404).json({ success: false, message: "Class not found" });
    }
    res.json({ success: true, data: toClassResponse(lopHoc) });
  } catch (error) {
    sendPrismaError(error, res);
  }
};

exports.createLopHoc = async (req, res) => {
  try {
    const { ten_lop } = req.body;
    if (!validClassName(ten_lop)) {
      return res.status(400).json({ success: false, message: "ten_lop must contain 1 to 100 characters" });
    }
    const lopHoc = await lophocRepository.create(ten_lop.trim());
    res.status(201).json({ success: true, data: toClassResponse(lopHoc) });
  } catch (error) {
    sendPrismaError(error, res);
  }
};

exports.updateLopHoc = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { ten_lop } = req.body;
    if (!isPositiveInteger(id)) {
      return res.status(400).json({ success: false, message: "Invalid class ID" });
    }
    if (!validClassName(ten_lop)) {
      return res.status(400).json({ success: false, message: "ten_lop must contain 1 to 100 characters" });
    }
    const lopHoc = await lophocRepository.update(id, ten_lop.trim());
    res.json({ success: true, data: toClassResponse(lopHoc) });
  } catch (error) {
    sendPrismaError(error, res);
  }
};

exports.deleteLopHoc = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!isPositiveInteger(id)) {
      return res.status(400).json({ success: false, message: "Invalid class ID" });
    }
    const lopHoc = await lophocRepository.remove(id);
    res.json({ success: true, message: "Class deleted", data: toClassResponse(lopHoc) });
  } catch (error) {
    sendPrismaError(error, res);
  }
};

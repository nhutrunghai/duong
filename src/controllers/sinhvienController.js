const sinhvienRepository = require("../repositories/sinhvienRepository");
const { isPositiveInteger, isValidAge, isValidEmail } = require("../utils/validation");
const { sendPrismaError } = require("../utils/prismaError");

function validStudentName(value) {
  return typeof value === "string" && value.trim().length > 0 && value.trim().length <= 100;
}

function studentPayloadIsValid({ ho_ten, email, tuoi, lop_id }) {
  if (!validStudentName(ho_ten) || !isValidEmail(email)) return false;
  if (tuoi !== undefined && tuoi !== null && !isValidAge(tuoi)) return false;
  return lop_id === undefined || lop_id === null || isPositiveInteger(lop_id);
}

function toStudentData({ ho_ten, email, tuoi, lop_id }) {
  return {
    hoTen: ho_ten.trim(),
    email: email.trim().toLowerCase(),
    tuoi: tuoi === undefined || tuoi === null ? null : Number(tuoi),
    lopId: lop_id === undefined || lop_id === null ? null : Number(lop_id),
  };
}

function toStudentResponse(sinhVien) {
  return {
    id: sinhVien.id,
    ho_ten: sinhVien.hoTen,
    email: sinhVien.email,
    tuoi: sinhVien.tuoi,
    lop_id: sinhVien.lopId,
    ten_lop: sinhVien.lopHoc?.tenLop ?? null,
  };
}

exports.getAllSinhVien = async (req, res) => {
  try {
    const students = await sinhvienRepository.findAll();
    res.json({ success: true, count: students.length, data: students.map(toStudentResponse) });
  } catch (error) {
    sendPrismaError(error, res);
  }
};

exports.getSinhVienById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!isPositiveInteger(id)) {
      return res.status(400).json({ success: false, message: "Invalid student ID" });
    }
    const sinhVien = await sinhvienRepository.findById(id);
    if (!sinhVien) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    res.json({ success: true, data: toStudentResponse(sinhVien) });
  } catch (error) {
    sendPrismaError(error, res);
  }
};

exports.createSinhVien = async (req, res) => {
  try {
    if (!studentPayloadIsValid(req.body)) {
      return res.status(400).json({ success: false, message: "Invalid student data" });
    }
    const sinhVien = await sinhvienRepository.create(toStudentData(req.body));
    res.status(201).json({ success: true, data: toStudentResponse(sinhVien) });
  } catch (error) {
    sendPrismaError(error, res);
  }
};

exports.updateSinhVien = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!isPositiveInteger(id)) {
      return res.status(400).json({ success: false, message: "Invalid student ID" });
    }
    if (!studentPayloadIsValid(req.body)) {
      return res.status(400).json({ success: false, message: "Invalid student data" });
    }
    const sinhVien = await sinhvienRepository.update(id, toStudentData(req.body));
    res.json({ success: true, data: toStudentResponse(sinhVien) });
  } catch (error) {
    sendPrismaError(error, res);
  }
};

exports.deleteSinhVien = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!isPositiveInteger(id)) {
      return res.status(400).json({ success: false, message: "Invalid student ID" });
    }
    const sinhVien = await sinhvienRepository.remove(id);
    res.json({ success: true, message: "Student deleted", data: toStudentResponse(sinhVien) });
  } catch (error) {
    sendPrismaError(error, res);
  }
};

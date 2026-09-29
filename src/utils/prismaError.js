function sendPrismaError(error, res) {
  if (error.code === "P2002") {
    return res.status(409).json({ success: false, message: "Email already exists" });
  }
  if (error.code === "P2003") {
    return res.status(400).json({ success: false, message: "lop_id does not exist" });
  }
  if (error.code === "P2025") {
    return res.status(404).json({ success: false, message: "Record not found" });
  }
  console.error(error);
  return res.status(500).json({ success: false, message: "Database operation failed" });
}

module.exports = { sendPrismaError };

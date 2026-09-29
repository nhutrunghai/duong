const prisma = require("../config/prisma");

const includeClass = {
  lopHoc: { select: { tenLop: true } },
};

exports.findAll = () => prisma.sinhVien.findMany({
  include: includeClass,
  orderBy: { id: "asc" },
});

exports.findById = (id) => prisma.sinhVien.findUnique({
  where: { id },
  include: includeClass,
});

exports.create = (data) => prisma.sinhVien.create({ data, include: includeClass });

exports.update = (id, data) => prisma.sinhVien.update({
  where: { id },
  data,
  include: includeClass,
});

exports.remove = (id) => prisma.sinhVien.delete({ where: { id } });

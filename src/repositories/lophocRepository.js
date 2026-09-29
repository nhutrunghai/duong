const prisma = require("../config/prisma");

exports.findAll = () => prisma.lopHoc.findMany({ orderBy: { id: "asc" } });

exports.findById = (id) => prisma.lopHoc.findUnique({ where: { id } });

exports.create = (tenLop) => prisma.lopHoc.create({ data: { tenLop } });

exports.update = (id, tenLop) => prisma.lopHoc.update({
  where: { id },
  data: { tenLop },
});

exports.remove = (id) => prisma.lopHoc.delete({ where: { id } });

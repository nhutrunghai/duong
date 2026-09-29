const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const classNames = [
  "Lớp CNTT K16A", "Lớp CNTT K16B", "Lớp CNTT K16C", "Lớp CNTT K16D", "Lớp CNTT K16E",
  "Lớp KHMT K16A", "Lớp KHMT K16B", "Lớp KHMT K16C", "Lớp KHMT K16D", "Lớp KHMT K16E",
  "Lớp KTPM K16A", "Lớp KTPM K16B", "Lớp KTPM K16C", "Lớp KTPM K16D", "Lớp KTPM K16E",
  "Lớp HTTT K16A", "Lớp HTTT K16B", "Lớp HTTT K16C", "Lớp HTTT K16D", "Lớp HTTT K16E",
  "Lớp ATTT K16A", "Lớp ATTT K16B", "Lớp ATTT K16C", "Lớp ATTT K16D", "Lớp ATTT K16E",
  "Lớp AI K16A", "Lớp AI K16B", "Lớp AI K16C", "Lớp AI K16D", "Lớp AI K16E",
  "Lớp IoT K16A", "Lớp IoT K16B", "Lớp IoT K16C", "Lớp IoT K16D", "Lớp IoT K16E",
  "Lớp DSE K16A", "Lớp DSE K16B", "Lớp DSE K16C", "Lớp DSE K16D", "Lớp DSE K16E",
  "Lớp ĐTVT K16A", "Lớp ĐTVT K16B", "Lớp ĐTVT K16C", "Lớp ĐTVT K16D", "Lớp ĐTVT K16E",
  "Lớp TMĐT K16A", "Lớp TMĐT K16B", "Lớp TMĐT K16C", "Lớp TMĐT K16D", "Lớp TMĐT K16E",
];

const studentNames = [
  "Nguyễn Văn An", "Trần Thị Bình", "Lê Hoàng Cường", "Phạm Minh Dũng", "Hoàng Văn Em",
  "Vũ Thị Giang", "Đặng Văn Hùng", "Bùi Thị Hoa", "Đỗ Minh Trí", "Ngô Thị Khoa",
  "Dương Văn Long", "Lý Thị Mai", "Phan Văn Nam", "Vũ Minh Oanh", "Nguyễn Phúc Phương",
  "Trần Quốc Quân", "Lê Thị Quyên", "Phạm Hoàng Sơn", "Hoàng Thị Thảo", "Vũ Văn Tuấn",
  "Đặng Uyên Uyên", "Bùi Văn Việt", "Đỗ Thị Xuân", "Nông Văn Yên", "Trịnh Minh Trí",
  "Nguyễn Bảo Anh", "Trần Đức Bình", "Lê Ngọc Cúc", "Phạm Thành Đạt", "Hoàng Thu Hà",
  "Vũ Hải Yến", "Đặng Tiến Khoa", "Bùi Đức Lâm", "Đỗ Thanh Nga", "Ngô Văn Phát",
  "Dương Quý Quỳnh", "Lý Hồng Sang", "Phan Như Tâm", "Vũ Văn Uy", "Nguyễn Thanh Vân",
  "Trần Hoàng Vinh", "Lê Thị Ý", "Phạm Văn Zô", "Hoàng Ngọc Ánh", "Vũ Bảo Bảo",
  "Đặng Cao Cường", "Bùi Diệu Linh", "Đỗ Hoàng Giang", "Ngô Tuấn Kiệt", "Dương Minh Lộc",
];

async function main() {
  const classCount = await prisma.lopHoc.count();
  if (classCount > 0) {
    console.log("Database already contains data. Seed skipped.");
    return;
  }

  await prisma.$transaction(async (transaction) => {
    const classes = [];
    for (const tenLop of classNames) {
      classes.push(await transaction.lopHoc.create({ data: { tenLop } }));
    }

    await transaction.sinhVien.createMany({
      data: studentNames.map((hoTen, index) => ({
        hoTen,
        email: `student${index + 1}@example.com`,
        tuoi: 18 + (index % 6),
        lopId: classes[Math.floor(index / 2)].id,
      })),
    });
  });

  console.log("Seeded 50 classes and 50 students.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

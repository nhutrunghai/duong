const { PrismaClient } = require("@prisma/client");

// A single client prevents unnecessary database connections during development.
const prisma = new PrismaClient();

module.exports = prisma;

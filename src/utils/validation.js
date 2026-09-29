function isPositiveInteger(value) {
  return Number.isInteger(Number(value)) && Number(value) > 0;
}

function isValidAge(value) {
  return Number.isInteger(Number(value)) && Number(value) >= 0 && Number(value) <= 150;
}

function isValidEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

module.exports = { isPositiveInteger, isValidAge, isValidEmail };

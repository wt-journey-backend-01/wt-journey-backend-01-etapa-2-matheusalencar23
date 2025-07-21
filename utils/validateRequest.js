const { validationResult } = require("express-validator");
const AppError = require("../utils/appError");

function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError(400, "Dados inválidos", errors.array());
  }
  next();
}

module.exports = validateRequest;

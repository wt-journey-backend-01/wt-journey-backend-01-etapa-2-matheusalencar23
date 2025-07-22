const { param } = require("express-validator");

function createUuidValidation(fieldName = "id") {
  return [
    param(fieldName)
      .isUUID(4)
      .withMessage(`O parâmetro "${fieldName}" deve ser um UUID válido`),
  ];
}

module.exports = {
  createUuidValidation,
};

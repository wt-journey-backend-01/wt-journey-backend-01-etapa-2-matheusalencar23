const { param } = require("express-validator");

function createUuidValidation() {
  return [
    param("id")
      .isUUID(4)
      .withMessage('O parâmetro "id" deve ser um UUID válido'),
  ];
}

module.exports = {
  createUuidValidation,
};

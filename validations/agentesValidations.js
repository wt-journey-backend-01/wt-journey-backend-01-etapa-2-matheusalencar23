const { body, validationResult } = require("express-validator");
const AppError = require("../utils/appError");

function createInputValidator() {
  return [
    body("nome").notEmpty().withMessage("O nome é obrigatório"),
    body("dataDeIncorporacao")
      .notEmpty()
      .withMessage("A data de incorporação é obrigatória"),
    body("cargo")
      .notEmpty()
      .withMessage("O cargo é obrigatório")
      .isIn(["inspetor", "delegado"])
      .withMessage('O cargo deve ser "inspetor" ou "delegado"'),
  ];
}

function createPartialInputValidator() {
  return [
    body("nome").optional().notEmpty().withMessage("O nome não pode ser vazio"),
    body("dataDeIncorporacao")
      .optional()
      .notEmpty()
      .withMessage("A data de incorporação não pode ser vazia"),
    body("cargo")
      .optional()
      .isIn(["inspetor", "delegado"])
      .withMessage('O cargo deve ser "inspetor" ou "delegado"'),
    ,
  ];
}

module.exports = {
  createInputValidator,
  createPartialInputValidator,
};

const { body, validationResult } = require("express-validator");
const AppError = require("../utils/appError");

function createInputValidator() {
  return [
    body("nome").notEmpty().withMessage("O nome é obrigatório"),
    body("dataDeIncorporacao")
      .notEmpty()
      .withMessage("A data de incorporação é obrigatória")
      .matches(/^\d{4}-\d{2}-\d{2}$/)
      .withMessage("A data de incorporação deve estar no formato YYYY-MM-DD"),
    ,
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
      .withMessage("A data de incorporação não pode ser vazia")
      .matches(/^\d{4}-\d{2}-\d{2}$/)
      .withMessage("A data de incorporação deve estar no formato YYYY-MM-DD"),
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

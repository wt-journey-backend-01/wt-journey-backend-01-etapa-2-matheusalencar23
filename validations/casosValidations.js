const { body, validationResult } = require("express-validator");
const AppError = require("../utils/appError");

const newCasoValidation = [
  body("titulo").notEmpty().withMessage("O título é obrigatório"),
  body("descricao").notEmpty().withMessage("A descrição é obrigatória"),
  body("status").notEmpty().withMessage("O status é obrigatório"),
  body("agente_id")
    .notEmpty()
    .withMessage("O identificador do agente responsável é obrigatório"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new AppError(400, "Parâmetros inválidos", errors.array());
    }

    next();
  },
];

module.exports = {
  newCasoValidation,
};

const { body } = require("express-validator");

const newCasoValidation = [
  body("titulo").notEmpty().withMessage("O título é obrigatório"),
  body("descricao").notEmpty().withMessage("A descrição é obrigatória"),
  body("status").notEmpty().withMessage("O status é obrigatório"),
  body("agente_id")
    .notEmpty()
    .withMessage("O identificador do agente responsável é obrigatório"),
];

module.exports = {
  newCasoValidation,
};

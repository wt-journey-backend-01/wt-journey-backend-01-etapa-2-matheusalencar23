const express = require("express");
const router = express.Router();
const casosController = require("../controllers/casosController");
const { body, validationResult } = require("express-validator");

router.get("/casos/search", casosController.filter);

router.get("/casos/:caso_id/agente", casosController.getAgenteByCasoId);

router.get("/casos/:id", casosController.getCasosById);

router.get("/casos", casosController.getAllCasos);

router.post(
  "/casos",
  createInputValidator(),
  validateRequest,
  casosController.createCaso
);

router.put(
  "/casos/:id",
  createInputValidator(),
  validateRequest,
  casosController.updateCaso
);

router.patch(
  "/casos/:id",
  createPartialInputValidator(),
  validateRequest,
  casosController.partialUpdateCaso
);

router.delete("/casos/:id", casosController.deleteCaso);

function createInputValidator() {
  return [
    body("titulo").notEmpty().withMessage("O título é obrigatório"),
    body("descricao").notEmpty().withMessage("A descrição é obrigatória"),
    body("status")
      .notEmpty()
      .withMessage("O status é obrigatório")
      .isIn(["aberto", "solucionado"])
      .withMessage('O status deve ser "aberto" ou "solucionado"'),
    ,
    body("agente_id")
      .notEmpty()
      .withMessage("O identificador do agente responsável é obrigatório"),
    ,
  ];
}

function createPartialInputValidator() {
  return [
    body("titulo")
      .optional()
      .notEmpty()
      .withMessage("O título não pode ser vazio"),
    body("descricao")
      .optional()
      .notEmpty()
      .withMessage("A descrição não pode ser vazia"),
    body("status")
      .optional()
      .isIn(["aberto", "solucionado"])
      .withMessage('O status deve ser "aberto" ou "solucionado"'),
    body("agente_id")
      .optional()
      .notEmpty()
      .withMessage("O identificador do agente responsável não pode ser vazio"),
  ];
}

function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = router;

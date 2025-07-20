const express = require("express");
const router = express.Router();
const agentesController = require("../controllers/agentesController");
const { body, param, validationResult } = require("express-validator");

router.get(
  "/agentes/:id",
  param("id").isUUID(4).withMessage('O parâmetro "id" deve ser um UUID válido'),
  validateRequest,
  agentesController.getAgenteById
);

router.get("/agentes", agentesController.getAllAgentes);

router.post(
  "/agentes",
  createInputValidator(),
  validateRequest,
  agentesController.createAgente
);

router.put(
  "/agentes/:id",
  createInputValidator(),
  validateRequest,
  agentesController.updateAgente
);

router.patch(
  "/agentes/:id",
  createPartialInputValidator(),
  validateRequest,
  agentesController.partialUpdateAgente
);

router.delete("/agentes/:id", agentesController.deleteAgente);

function createInputValidator() {
  return [
    body("nome").notEmpty().withMessage("O nome é obrigatório"),
    body("dataDeIncorporacao")
      .notEmpty()
      .withMessage("A data de incorporação é obrigatória")
      .matches(/^\d{4}-\d{2}-\d{2}$/)
      .withMessage("A data de incorporação deve estar no formato YYYY-MM-DD"),
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

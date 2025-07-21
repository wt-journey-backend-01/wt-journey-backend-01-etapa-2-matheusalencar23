const express = require("express");
const router = express.Router();
const agentesController = require("../controllers/agentesController");
const validateRequest = require("../utils/validateRequest");
const agentesValidation = require("../utils/agentesValidation");
const uuidValidation = require("../utils/uuidValidation");

router.get(
  "/agentes/:id",
  uuidValidation.createUuidValidation(),
  validateRequest,
  agentesController.getAgenteById
);

router.get("/agentes", agentesController.getAllAgentes);

router.post(
  "/agentes",
  agentesValidation.createInputValidator(),
  validateRequest,
  agentesController.createAgente
);

router.put(
  "/agentes/:id",
  uuidValidation.createUuidValidation(),
  agentesValidation.createInputValidator(),
  validateRequest,
  agentesController.updateAgente
);

router.patch(
  "/agentes/:id",
  uuidValidation.createUuidValidation(),
  agentesValidation.createPartialInputValidator(),
  validateRequest,
  agentesController.updateAgente
);

router.delete(
  "/agentes/:id",
  uuidValidation.createUuidValidation(),
  agentesController.deleteAgente
);

module.exports = router;

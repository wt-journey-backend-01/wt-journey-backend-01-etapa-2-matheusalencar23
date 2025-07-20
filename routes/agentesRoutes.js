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
  agentesValidation.createInputValidator(),
  validateRequest,
  agentesController.updateAgente
);

router.patch(
  "/agentes/:id",
  agentesValidation.createPartialInputValidator(),
  validateRequest,
  agentesController.partialUpdateAgente
);

router.delete("/agentes/:id", agentesController.deleteAgente);

module.exports = router;

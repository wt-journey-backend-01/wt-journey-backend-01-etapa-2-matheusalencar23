const express = require("express");
const router = express.Router();
const agentesController = require("../controllers/agentesController");
const agentesValidations = require("../validations/agentesValidations");
const validateRequest = require("../validations/validateRequest");

router.get("/agentes/:id", agentesController.getAgenteById);

router.get("/agentes", agentesController.getAllAgentes);

router.post(
  "/agentes",
  agentesValidations.createInputValidator(),
  validateRequest,
  agentesController.createAgente
);

router.put(
  "/agentes/:id",
  agentesValidations.createInputValidator(),
  validateRequest,
  agentesController.updateAgente
);

router.patch(
  "/agentes/:id",
  agentesValidations.createPartialInputValidator(),
  validateRequest,
  agentesController.partialUpdateAgente
);

router.delete("/agentes/:id", agentesController.deleteAgente);

module.exports = router;

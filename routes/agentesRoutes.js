const express = require("express");
const router = express.Router();
const agentesController = require("../controllers/agentesController");
const agentesValidations = require("../validations/agentesValidations");

router.get("/agentes/:id", agentesController.getAgenteById);

router.get("/agentes", agentesController.getAllAgentes);

router.post(
  "/agentes",
  agentesValidations.createInputValidator(),
  agentesController.createAgente
);

router.put(
  "/agentes/:id",
  agentesValidations.createInputValidator(),
  agentesController.updateAgente
);

router.patch(
  "/agentes/:id",
  agentesValidations.createPartialInputValidator(),
  agentesController.partialUpdateAgente
);

router.delete("/agentes/:id", agentesController.deleteAgente);

module.exports = router;

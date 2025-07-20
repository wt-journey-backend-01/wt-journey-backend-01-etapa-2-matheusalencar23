const express = require("express");
const router = express.Router();
const agentesController = require("../controllers/agentesController");

router.get("/agentes/:id", agentesController.getAgenteById);

router.get("/agentes", agentesController.getAllAgentes);

module.exports = router;

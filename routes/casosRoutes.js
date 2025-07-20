const express = require("express");
const router = express.Router();
const casosController = require("../controllers/casosController");
const { param } = require("express-validator");
const validateRequest = require("../utils/validateRequest");
const casosValidation = require("../utils/casosValidation");
const uuidValidation = require("../utils/uuidValidation");

router.get("/casos/search", casosController.filter);

router.get("/casos/:caso_id/agente", casosController.getAgenteByCasoId);

router.get(
  "/casos/:id",
  uuidValidation.createUuidValidation(),
  validateRequest,
  casosController.getCasosById
);

router.get("/casos", casosController.getAllCasos);

router.post(
  "/casos",
  casosValidation.createInputValidator(),
  validateRequest,
  casosController.createCaso
);

router.put(
  "/casos/:id",
  casosValidation.createInputValidator(),
  validateRequest,
  casosController.updateCaso
);

router.patch(
  "/casos/:id",
  casosValidation.createPartialInputValidator(),
  validateRequest,
  casosController.partialUpdateCaso
);

router.delete("/casos/:id", casosController.deleteCaso);

module.exports = router;

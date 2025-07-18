const express = require("express");
const router = express.Router();
const casosController = require("../controllers/casosController");
const casosValidations = require("../validations/casosValidations");

router.get("/casos/search", casosController.filter);

router.get("/casos/:caso_id/agente", casosController.getAgenteByCasoId);

router.get("/casos/:id", casosController.getCasosById);

router.get("/casos", casosController.getAllCasos);

router.post(
  "/casos",
  casosValidations.createInputValidator(),
  casosController.createCaso
);

router.put(
  "/casos/:id",
  casosValidations.createInputValidator(),
  casosController.updateCaso
);

router.patch(
  "/casos/:id",
  casosValidations.createPartialInputValidator(),
  casosController.partialUpdateCaso
);

router.delete("/casos/:id", casosController.deleteCaso);

module.exports = router;

const express = require("express");
const router = express.Router();
const casosController = require("../controllers/casosController");
const casosValidations = require("../validations/casosValidations");

router.get("/casos", casosController.getAllCasos);

router.get("/casos/:id", casosController.getCasosById);

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

module.exports = router;

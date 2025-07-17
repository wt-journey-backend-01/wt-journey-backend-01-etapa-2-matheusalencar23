const express = require("express");
const router = express.Router();
const casosController = require("../controllers/casosController");

router.get("/casos", casosController.getAllCasos);

router.get("/casos/:id", casosController.getCasosById);

router.post("/casos", casosController.createCaso);

router.put("/casos/:id", casosController.updateCaso);

module.exports = router;

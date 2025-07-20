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

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Retorna todos os casos
 *     responses:
 *       200:
 *         description: Lista todos os casos
 */
router.get("/casos", casosController.getAllCasos);

/**
 * @openapi
 * /casos:
 *   post:
 *     summary: Cria um novo caso
 *     requestBody:
 *      required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        required:
 *          - titulo
 *          - descricao
 *          - status
 *          - agente_id
 *        properties:
 *          titulo:
 *            type: string
 *          descricao:
 *            type: string
 *        status:
 *          type: string
 *          enum: ["aberto", "solucionado"]
 *     responses:
 *      201:
 *        description: Caso criado com sucesso
 *      400:
 *       description: Erro de validação
 *      500:
 *        description: Erro interno do servidor
 * */
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
  casosController.updateCaso
);

router.delete("/casos/:id", casosController.deleteCaso);

module.exports = router;

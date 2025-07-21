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
 * /casos:
 *   get:
 *     summary: Retorna todos os casos
 *     description: Retorna uma lista de todos os casos disponíveis
 *     tags: ["Casos"]
 *     responses:
 *       200:
 *         description: Lista todos os casos
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *               type: object
 *               properties:
 *                id:
 *                  type: string
 *                  format: uuid
 *                  example: a4e517b1-06f0-41d5-b65c-8989cea53db9
 *                titulo:
 *                  type: string
 *                  example: Homicídio
 *                descricao:
 *                  type: string
 *                  example: Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos
 *                status:
 *                  type: string
 *                  enum: [aberto, fechado]
 *                  example: aberto
 *                agente_id:
 *                  type: string
 *                  format: uuid
 *                  example: 85db22b5-d93f-40f2-aade-229ff6096657
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
 *        description: Erro de validação
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

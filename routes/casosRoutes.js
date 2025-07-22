const express = require("express");
const router = express.Router();
const casosController = require("../controllers/casosController");
const validateRequest = require("../utils/validateRequest");
const casosValidation = require("../utils/casosValidation");
const uuidValidation = require("../utils/uuidValidation");

router.get("/casos/search", casosController.filter);

router.get(
  "/casos/:caso_id/agente",
  uuidValidation.createUuidValidation("caso_id"),
  validateRequest,
  casosController.getAgenteByCasoId
);

/**
 * @openapi
 * /casos/{id}:
 *  get:
 *    summary: Retorna um caso específico
 *    description: Retorna os detalhes de um caso pelo seu id
 *    tags: [Casos]
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *          example: a4e517b1-06f0-41d5-b65c-8989cea53db9
 *    responses:
 *      200:
 *        description: Detalhes do caso retornados com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Caso'
 *      400:
 *        description: Identificador inválido
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 400
 *                message:
 *                  type: string
 *                  example: Dados inválidos
 *                errors:
 *                  type: string
 *                  example:
 *                    - O parâmetro "id" deve ser um UUID válido
 *      404:
 *        description: Nenhum caso para o id especificado
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 404
 *                message:
 *                  type: string
 *                  example: Nenhum caso encontrado para o id especificado
 *                errors:
 *                  type: string
 *                  example: []
 */
router.get(
  "/casos/:id",
  uuidValidation.createUuidValidation(),
  validateRequest,
  casosController.getCasosById
);

/**
 * @openapi
 * /casos:
 *  get:
 *    summary: Retorna todos os casos
 *    description: Retorna uma lista de todos os casos disponíveis
 *    tags: [Casos]
 *    responses:
 *      200:
 *        description: Lista todos os casos
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Caso'
 */
router.get("/casos", casosController.getAllCasos);

/**
 * @openapi
 * /casos:
 *  post:
 *    summary: Cria um novo caso,
 *    description: Cria um novo caso com os dados fornecidos
 *    tags: [Casos]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/NovoCaso'
 *    responses:
 *      201:
 *        description: Caso criado com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Caso'
 *      400:
 *        description: Dados inválidos
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 400
 *                message:
 *                  type: string
 *                  example: Dados inválidos
 *                errors:
 *                  type: string
 *                  example:
 *                    - O status é obrigatório
 *                    - O status deve ser "aberto" ou "solucionado"
 *      404:
 *        description: O agente definido não existe na base de dados
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 404
 *                message:
 *                  type: string
 *                  example: Nenhum agente encontrado para o agente_id especificado
 *                errors:
 *                  type: string
 *                  example: []
 */
router.post(
  "/casos",
  casosValidation.createInputValidator(),
  validateRequest,
  casosController.createCaso
);

router.put(
  "/casos/:id",
  uuidValidation.createUuidValidation(),
  casosValidation.createInputValidator(),
  validateRequest,
  casosController.updateCaso
);

router.patch(
  "/casos/:id",
  uuidValidation.createUuidValidation(),
  casosValidation.createPartialInputValidator(),
  validateRequest,
  casosController.updatePartialCaso
);

router.delete(
  "/casos/:id",
  uuidValidation.createUuidValidation(),
  validateRequest,
  casosController.deleteCaso
);

module.exports = router;

const express = require("express");
const router = express.Router();
const agentesController = require("../controllers/agentesController");
const {
  newAgenteValidation,
  partialUpdateAgenteValidation,
  updateAgenteValidation,
} = require("../utils/agentesValidations");

/**
 * @openapi
 * /agentes/{id}:
 *  get:
 *    summary: Retorna um agente específico
 *    description: Retorna os detalhes de um agente pelo seu id
 *    tags: [Agentes]
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
 *        description: Detalhes do agente retornados com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Agente'
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
 *                  example: Parâmetros inválidos
 *                errors:
 *                  type: string
 *                  example:
 *                    - O parâmetro "id" deve ser um UUID válido
 *      404:
 *        description: Nenhum agente encontrado para o id especificado
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
 *                  example: Nenhum agente encontrado para o id especificado
 *                errors:
 *                  type: string
 *                  example: []
 */
router.get("/agentes/:id", agentesController.getAgenteById);

/**
 * @openapi
 * /agentes:
 *  get:
 *    summary: Retorna todos os agentes
 *    description: Retorna uma lista de todos os agentes disponíveis
 *    tags: [Agentes]
 *    responses:
 *      200:
 *        description: Lista todos os agentes
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Agente'
 */
router.get("/agentes", agentesController.getAllAgentes);

/**
 * @openapi
 * /agentes:
 *  post:
 *    summary: Cria um novo agente
 *    description: Cria um novo agente com os dados fornecidos
 *    tags: [Agentes]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/NovoAgente'
 *    responses:
 *      201:
 *        description: Agente criado com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Agente'
 *      400:
 *        description: Parâmetros inválidos
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
 *                  example: Parâmetros inválidos
 *                errors:
 *                  type: string
 *                  example:
 *                    - O cargo é obrigatório
 */
router.post("/agentes", newAgenteValidation, agentesController.createAgente);

/**
 * @openapi
 * /agentes/{id}:
 *  put:
 *    summary: Atualiza agente
 *    description: Atualiza um agente com os dados fornecidos
 *    tags: [Agentes]
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *          example: a4e517b1-06f0-41d5-b65c-8989cea53db9
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/NovoAgente'
 *    responses:
 *      200:
 *        description: Agente atualizado com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Agente'
 *      400:
 *        description: Parâmetros inválidos
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
 *                  example: Parâmetros inválidos
 *                errors:
 *                  type: string
 *                  example:
 *                    - O cargo é obrigatório
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
 *                  example: Nenhum agente encontrado para o id especificado
 *                errors:
 *                  type: string
 *                  example: []
 */
router.put(
  "/agentes/:id",
  updateAgenteValidation,
  agentesController.updateAgente
);

/**
 * @openapi
 * /agentes/{id}:
 *  patch:
 *    summary: Atualiza agente
 *    description: Atualiza um agente parcialmente com os dados fornecidos
 *    tags: [Agentes]
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *          example: a4e517b1-06f0-41d5-b65c-8989cea53db9
 *    requestBody:
 *      required: false
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/NovoAgente'
 *    responses:
 *      200:
 *        description: Agente atualizado com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Agente'
 *      400:
 *        description: Parâmetros inválidos
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
 *                  example: Parâmetros inválidos
 *                errors:
 *                  type: string
 *                  example:
 *                    - O nome não pode ser vazio
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
 *                  example: Nenhum agente encontrado para o id especificado
 *                errors:
 *                  type: string
 *                  example: []
 */
router.patch(
  "/agentes/:id",
  partialUpdateAgenteValidation,
  agentesController.updatePartialAgente
);

/**
 * @openapi
 * /agentes/{id}:
 *  delete:
 *    summary: Apaga um agente específico
 *    description: Remove um agente da base de dados
 *    tags: [Agentes]
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *          example: a4e517b1-06f0-41d5-b65c-8989cea53db9
 *    responses:
 *      204:
 *        description: Agente removido com sucesso
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
 *                  example: Parâmetros inválidos
 *                errors:
 *                  type: string
 *                  example:
 *                    - O parâmetro "id" deve ser um UUID válido
 *      404:
 *        description: Nenhum agente para o id especificado
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
 *                  example: Nenhum agente encontrado para o id especificado
 *                errors:
 *                  type: string
 *                  example: []
 */
router.delete("/agentes/:id", agentesController.deleteAgente);

module.exports = router;

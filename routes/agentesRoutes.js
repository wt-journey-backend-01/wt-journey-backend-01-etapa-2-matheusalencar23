const express = require("express");
const router = express.Router();
const agentesController = require("../controllers/agentesController");
const validateRequest = require("../utils/validateRequest");
const agentesValidation = require("../utils/agentesValidation");
const z = require("zod");
const AppError = require("../utils/appError");

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
router.post(
  "/agentes",
  (req, res, next) => {
    const newAgente = z.object({
      body: z
        .looseObject({
          nome: z
            .string({ error: "O nome é obrigatório" })
            .min(1, "O nome não pode ser vazio"),
          cargo: z
            .string({ error: "O cargo é obrigatório" })
            .min(1, "O cargo é obrigatório"),
          dataDeIncorporacao: z
            .string({ error: "A data de incorporação é obrigatória" })
            .regex(/^\d{4}-\d{2}-\d{2}$/, {
              error: "A data de incorporação deve estar no formato YYYY-MM-DD",
            })
            .refine((value) => {
              const now = new Date();
              const inputDate = new Date(value);
              return inputDate <= now;
            }, "A data não pode estar no futuro"),
        })
        .refine((data) => data.id === undefined, {
          error: "O id não pode ser enviado no corpo da requisição",
        }),
    });
    const result = newAgente.safeParse(req);
    if (!result.success) {
      const errors = JSON.parse(result.error).map((err) => err.message);
      throw new AppError(400, "Parâmetros inválidos", errors || []);
    }
    next();
  },
  agentesController.createAgente
);

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
  agentesValidation.createInputValidator(),
  validateRequest,
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
  agentesValidation.createPartialInputValidator(),
  validateRequest,
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

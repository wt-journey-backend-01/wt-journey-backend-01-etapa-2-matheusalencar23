const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API do Departamento de Polícia",
      version: "1.0.0",
      contact: {
        name: "Matheus Alencar da Silva",
        email: "matheusalencar6942@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor de desenvolvimento",
      },
    ],
    paths: {
      "/casos": {
        get: {
          summary: "Retorna todos os casos",
          description: "Retorna uma lista de todos os casos disponíveis",
          tags: ["Casos"],
          responses: {
            200: {
              description: "Lista todos os casos",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                          format: "uuid",
                          example: "a4e517b1-06f0-41d5-b65c-8989cea53db9",
                        },
                        titulo: {
                          type: "string",
                          example: "Homicídio",
                        },
                        descricao: {
                          type: "string",
                          example:
                            "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos",
                        },
                        status: {
                          type: "string",
                          enum: ["aberto", "fechado"],
                          example: "aberto",
                        },
                        agente_id: {
                          type: "string",
                          format: "uuid",
                          example: "85db22b5-d93f-40f2-aade-229ff6096657",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: "Cria um novo caso",
          description: "Cria um novo caso com os dados fornecidos",
          tags: ["Casos"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    titulo: {
                      type: "string",
                      example: "Homicídio",
                    },
                    descricao: {
                      type: "string",
                      example:
                        "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos",
                    },
                    status: {
                      type: "string",
                      enum: ["aberto", "fechado"],
                      example: "aberto",
                    },
                    agente_id: {
                      type: "string",
                      format: "uuid",
                      example: "85db22b5-d93f-40f2-aade-229ff6096657",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Caso criado com sucesso",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                        format: "uuid",
                        example: "a4e517b1-06f0-41d5-b65c-8989cea53db9",
                      },
                      titulo: {
                        type: "string",
                        example: "Homicídio",
                      },
                      descricao: {
                        type: "string",
                        example:
                          "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos",
                      },
                      status: {
                        type: "string",
                        enum: ["aberto", "fechado"],
                        example: "aberto",
                      },
                      agente_id: {
                        type: "string",
                        format: "uuid",
                        example: "85db22b5-d93f-40f2-aade-229ff6096657",
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: "Dados inválidos",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      status: {
                        type: "integer",
                        example: 400,
                      },
                      message: {
                        type: "string",
                        example: "Dados inválidos",
                      },
                      errors: {
                        type: "string",
                        example: [
                          "O status é obrigatório",
                          'O status deve ser "aberto" ou "solucionado"',
                        ],
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: "Agente não encontrado",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      status: {
                        type: "integer",
                        example: 404,
                      },
                      message: {
                        type: "string",
                        example: "Agente não encontrado",
                      },
                      errors: {
                        type: "string",
                        example: [
                          "O status é obrigatório",
                          'O status deve ser "aberto" ou "solucionado"',
                        ],
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

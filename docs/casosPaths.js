module.exports = {
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
                  $ref: "#/components/schemas/Caso",
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
              $ref: "#/components/schemas/NovoCaso",
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
          description: "O agente definido não existe na base de dados",
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
                    example:
                      "Nenhum agente encontrado para o agente_id especificado",
                  },
                  errors: {
                    type: "string",
                    example: [],
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/casos/{id}": {
    get: {
      summary: "Retorna um caso específico",
      description: "Retorna os detalhes de um caso pelo seu ID",
      tags: ["Casos"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
            format: "uuid",
            example: "a4e517b1-06f0-41d5-b65c-8989cea53db9",
          },
        },
      ],
      responses: {
        200: {
          description: "Detalhes do caso retornados com sucesso",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Caso",
              },
            },
          },
        },
        400: {
          description: "Identificador inválido",
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
                    example: ['O parâmetro "id" deve ser um UUID válido'],
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Não foi encontrado nenhum caso para o id especificado",
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
                    example: "Nenhum caso encontrado para o id especificado",
                  },
                  errors: {
                    type: "string",
                    example: [],
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

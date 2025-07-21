module.exports = {
  Caso: {
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
  NovoCaso: {
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
};

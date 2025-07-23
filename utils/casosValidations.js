const z = require("zod");
const validate = require("./validate");

const newCasoValidation = (req, res, next) => {
  const newCaso = z.object({
    body: z.object({
      titulo: z
        .string({ error: "O título é obrigatório" })
        .min(1, "O título é obrigatório"),
      descricao: z
        .string({ error: "A descrição é obrigatória" })
        .min(1, "A descrição é obrigatória"),
      status: z.enum(["aberto", "solucionado"], {
        error: (issue) =>
          issue.input === undefined
            ? "O status é obrigatório"
            : 'O status deve ser "aberto" ou "solucionado"',
      }),
      agente_id: z
        .string({
          error: "O agente responsável pelo caso é obrigatório",
        })
        .min(1, "O agente responsável pelo caso é obrigatório"),
    }),
  });
  validate(newCaso, req);
  next();
};

module.exports = {
  newCasoValidation,
};

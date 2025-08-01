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

const updateCasoValidation = (req, res, next) => {
  const updateCaso = z.object({
    body: z
      .looseObject({
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
      })
      .refine((data) => data.id === undefined, {
        error: "O id não pode ser atualizado",
      }),
  });
  validate(updateCaso, req);
  next();
};

const partialUpdateCasoValidation = (req, res, next) => {
  const updateCaso = z.object({
    body: z
      .strictObject(
        {
          titulo: z.optional(z.string().min(1, "O título não pode ser vazio")),
          descricao: z.optional(
            z.string().min(1, "A descrição não pode ser vazia")
          ),
          status: z.optional(
            z.enum(["aberto", "solucionado"], {
              error: 'O status deve ser "aberto" ou "solucionado"',
            })
          ),
          agente_id: z.optional(
            z
              .string()
              .min(1, "O agente responsável pelo caso não pode ser vazio")
          ),
        },
        {
          error: (err) => {
            if (err.keys.length > 0) {
              return `Alguns campos não são válidos para a entidade caso: ${err.keys.join(
                ", "
              )}`;
            }
            return err;
          },
        }
      )
      .refine((data) => data.id === undefined, {
        error: "O id não pode ser atualizado",
      }),
  });
  validate(updateCaso, req);
  next();
};

module.exports = {
  newCasoValidation,
  updateCasoValidation,
  partialUpdateCasoValidation,
};

const AppError = require("./appError");

const validate = (schema, req) => {
  const result = schema.safeParse(req);
  if (!result.success) {
    const errors = JSON.parse(result.error).map((err) => err.message);
    throw new AppError(400, "Parâmetros inválidos", errors || []);
  }
};

module.exports = validate;

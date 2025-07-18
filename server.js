const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = process.env.PORT;

const casosRouter = require("./routes/casosRoutes");
const errorHandler = require("./utils/errorHandler");

app.use(express.json());
app.use(casosRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `Servidor do Departamento de Polícia rodando em localhost:${PORT || 3000}`
  );
});

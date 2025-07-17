const express = require("express");
const app = express();
const PORT = 3000;

const casosRouter = require("./routes/casosRoutes");

app.use(express.json());
app.use(casosRouter);

app.listen(PORT, () => {
  console.log(
    `Servidor do Departamento de Polícia rodando em localhost:${PORT}`
  );
});

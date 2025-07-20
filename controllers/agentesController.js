const agentesRepository = require("../repositories/agentesRepository");
const AppError = require("../utils/appError");

function getAllAgentes(req, res) {
  const agentes = agentesRepository.findAll();
  res.json(agentes);
}

function getAgenteById(req, res) {
  const id = req.params.id;
  const agente = agentesRepository.findById(id);
  if (!agente) {
    throw new AppError(404, "Agente não encontrado");
  }
  res.json(agente);
}

module.exports = {
  getAllAgentes,
  getAgenteById,
};

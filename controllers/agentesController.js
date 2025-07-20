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

function createAgente(req, res) {
  const novoAgente = agentesRepository.create(req.body);
  res.status(201).json(novoAgente);
}

function updateAgente(req, res) {
  const id = req.params.id;
  const agente = agentesRepository.findById(id);
  if (!agente) {
    throw new AppError(404, "Agente não encontrado");
  }

  const updatedAgente = agentesRepository.update(id, req.body);
  res.status(200).json(updatedAgente);
}

function partialUpdateAgente(req, res) {
  const id = req.params.id;
  const agente = agentesRepository.partialUpdate(id, req.body);
  if (!agente) {
    throw new AppError(404, "Agente não encontrado");
  }
  res.status(200).json(agente);
}

function deleteAgente(req, res) {
  const id = req.params.id;
  const deleted = agentesRepository.remove(id);
  if (!deleted) {
    throw new AppError(404, "Agente não encontrado");
  }
  res.status(204).send();
}

module.exports = {
  getAllAgentes,
  getAgenteById,
  createAgente,
  updateAgente,
  partialUpdateAgente,
  deleteAgente,
};

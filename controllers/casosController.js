const casosRepository = require("../repositories/casosRepository");
const AppError = require("../utils/appError");

function getAllCasos(req, res) {
  const casos = casosRepository.findAll();
  res.json(casos);
}

function getCasosById(req, res) {
  const id = req.params.id;
  const caso = casosRepository.findById(id);
  if (!caso) {
    throw new AppError(404, "Caso não encontrado");
  }
  res.json(caso);
}

function createCaso(req, res) {
  const novoCaso = casosRepository.createCaso(req.body);
  res.status(201).json(novoCaso);
}

function updateCaso(req, res) {
  const id = req.params.id;
  const caso = casosRepository.findById(id);
  if (caso) {
    casosRepository.updateCaso(id, req.body);
    res.status(204).send();
  }
}

module.exports = {
  getAllCasos,
  getCasosById,
  createCaso,
  updateCaso,
};

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
  const novoCaso = casosRepository.create(req.body);
  res.status(201).json(novoCaso);
}

function updateCaso(req, res) {
  const id = req.params.id;
  const caso = casosRepository.findById(id);
  if (caso) {
    const updatedCaso = casosRepository.update(id, req.body);
    res.status(200).json(updatedCaso);
  }
}

function partialUpdateCaso(req, res) {
  const id = req.params.id;
  const caso = casosRepository.partialUpdate(id, req.body);
  if (!caso) {
    throw new AppError(404, "Caso não encontrado");
  }
  res.status(200).json(caso);
}

function deleteCaso(req, res) {
  const id = req.params.id;
  const deleted = casosRepository.deleteCaso(id);
  if (!deleted) {
    throw new AppError(404, "Caso não encontrado");
  }
  res.status(204).send();
}

module.exports = {
  getAllCasos,
  getCasosById,
  createCaso,
  updateCaso,
  partialUpdateCaso,
  deleteCaso,
};

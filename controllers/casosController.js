const casosRepository = require("../repositories/casosRepository");

function getAllCasos(req, res) {
  const casos = casosRepository.findAll();
  res.json(casos);
}

function getCasosById(req, res) {
  const id = req.params.id;
  const caso = casosRepository.findById(id);
  if (!caso) {
    return res.status(404).json({ message: "Caso não encontrado" });
  }
  res.json(caso);
}

function createCaso(req, res) {
  const caso = req.body;
  if (!caso.titulo || !caso.descricao || !caso.status || !caso.agente_id) {
    return res.status(400).json({ message: "Dados incompletos" });
  }
  const novoCaso = casosRepository.createCaso(caso);
  res.status(201).json(novoCaso);
}

function updateCaso(req, res) {
  const id = req.params.id;

  const caso = req.body;
  if (!caso.titulo || !caso.descricao || !caso.status || !caso.agente_id) {
    return res.status(400).json({ message: "Dados incompletos" });
  }

  const casoToUpdate = casosRepository.findById(id);
  if (casoToUpdate) {
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

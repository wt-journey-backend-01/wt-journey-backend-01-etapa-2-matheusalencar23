const casosRepository = require("../repositories/casosRepository");
const agentesRepository = require("../repositories/agentesRepository");
const AppError = require("../utils/appError");

function getAllCasos(req, res) {
  const agenteId = req.query.agente_id;
  const status = req.query.status;

  if (agenteId) {
    const casos = casosRepository.getByAgenteId(agenteId);
    if (!casos || casos.length === 0) {
      throw new AppError(
        404,
        "Nenhum caso encontrado para o agente especificado"
      );
    }
    return res.json(casos);
  }

  if (status) {
    const casos = casosRepository.getByStatus(status);
    if (!casos || casos.length === 0) {
      throw new AppError(
        404,
        "Nenhum caso encontrado com o status especificado"
      );
    }
    return res.json(casos);
  }

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
  const agenteId = req.body.agente_id;
  const agente = agentesRepository.findById(agenteId);
  if (!agente) {
    throw new AppError(404, "Agente não encontrado");
  }
  res.status(201).json(novoCaso);
}

function updateCaso(req, res) {
  const id = req.params.id;

  const agenteId = req.body.agente_id;
  const agente = agentesRepository.findById(agenteId);
  if (!agente) {
    throw new AppError(404, "Agente não encontrado");
  }

  const caso = casosRepository.findById(id);
  if (!caso) {
    throw new AppError(404, "Caso não encontrado");
  }

  const updatedCaso = casosRepository.update(id, req.body);
  res.status(200).json(updatedCaso);
}

function partialUpdateCaso(req, res) {
  const id = req.params.id;
  if (req?.body?.agente_id) {
    const agenteId = req.body.agente_id;
    const agente = agentesRepository.findById(agenteId);
    if (!agente) {
      throw new AppError(404, "Agente não encontrado");
    }
  }
  const caso = casosRepository.partialUpdate(id, req.body);
  if (!caso) {
    throw new AppError(404, "Caso não encontrado");
  }
  res.status(200).json(caso);
}

function deleteCaso(req, res) {
  const id = req.params.id;
  const deleted = casosRepository.remove(id);
  if (!deleted) {
    throw new AppError(404, "Caso não encontrado");
  }
  res.status(204).send();
}

function getAgenteByCasoId(req, res) {
  const casoId = req.params.caso_id;
  const caso = casosRepository.findById(casoId);
  if (!caso) {
    throw new AppError(404, "Caso não encontrado");
  }
  const agenteId = caso.agente_id;
  res.json({ agente_id: agenteId });
}

function filter(req, res) {
  const term = req.query.q;

  if (!term) {
    throw new AppError(400, "Termo de busca é obrigatório");
  }

  const casos = casosRepository.filter(term);
  if (casos.length === 0) {
    throw new AppError(404, "Nenhum caso encontrado para a busca especificada");
  }
  res.json(casos);
}

module.exports = {
  getAllCasos,
  getCasosById,
  createCaso,
  updateCaso,
  partialUpdateCaso,
  deleteCaso,
  getAgenteByCasoId,
  filter,
};

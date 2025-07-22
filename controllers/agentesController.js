const agentesRepository = require("../repositories/agentesRepository");
const AppError = require("../utils/appError");

function getAllAgentes(req, res) {
  const cargo = req.query.cargo;
  const sort = req.query.sort;

  if (cargo && sort) {
    if (sort === "dataDeIncorporacao") {
      const agentes = agentesRepository.getByCargoAndSort(cargo, false);
      return res.json(agentes);
    } else if (sort === "-dataDeIncorporacao") {
      const agentes = agentesRepository.getByCargoAndSort(cargo, true);
      return res.json(agentes);
    } else {
      throw new AppError(400, "Parâmetro de ordenação inválido");
    }
  }

  if (cargo && !sort) {
    const agentes = agentesRepository.getByCargo(cargo);
    if (!agentes || agentes.length === 0) {
      throw new AppError(
        404,
        "Nenhum agente encontrado com o cargo especificado"
      );
    }
    return res.json(agentes);
  }

  if (sort && !cargo) {
    if (sort === "dataDeIncorporacao") {
      const agentes = agentesRepository.getSortedByDataDeIncorporacao();
      return res.json(agentes);
    } else if (sort === "-dataDeIncorporacao") {
      const agentes = agentesRepository.getSortedByDataDeIncorporacao(true);
      return res.json(agentes);
    } else {
      throw new AppError(400, "Parâmetro de ordenação inválido");
    }
  }

  const agentes = agentesRepository.findAll();
  res.json(agentes);
}

function getAgenteById(req, res) {
  const id = req.params.id;
  const agente = agentesRepository.findById(id);
  if (!agente) {
    throw new AppError(404, "Nenhum agente encontrado para o id especificado");
  }
  res.json(agente);
}

function createAgente(req, res) {
  const novoAgente = agentesRepository.create(req.body);
  res.status(201).json(novoAgente);
}

function updateAgente(req, res) {
  const id = req.params.id;

  if (req.body.id) {
    throw new AppError(400, "Parâmetros inválidos", [
      "O id não pode ser atualizado",
    ]);
  }

  const agente = agentesRepository.findById(id);
  if (!agente) {
    throw new AppError(404, "Nenhum agente encontrado para o id especificado");
  }

  const updatedAgente = agentesRepository.update(id, req.body);
  res.status(200).json(updatedAgente);
}

function updatePartialAgente(req, res) {
  const id = req.params.id;

  if (req.body.id) {
    throw new AppError(400, "Parâmetros inválidos", [
      "O id não pode ser atualizado",
    ]);
  }

  const agente = agentesRepository.findById(id);
  if (!agente) {
    throw new AppError(404, "Nenhum agente encontrado para o id especificado");
  }

  const updatedAgente = agentesRepository.updatePartial(id, req.body);
  res.status(200).json(updatedAgente);
}

function deleteAgente(req, res) {
  const id = req.params.id;
  const agente = agentesRepository.findById(id);
  if (!agente) {
    throw new AppError(404, "Nenhum agente encontrado para o id especificado");
  }
  agentesRepository.remove(id);
  res.status(204).send();
}

module.exports = {
  getAllAgentes,
  getAgenteById,
  createAgente,
  updateAgente,
  updatePartialAgente,
  deleteAgente,
};

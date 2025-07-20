const { v4: uuidv4 } = require("uuid");

const agentes = [
  {
    id: "dd0f46cf-1352-41de-8b79-5cb90c63004b",
    nome: "Larissa Moura",
    dataDeIncorporacao: "2005-03-22",
    cargo: "inspetor",
  },
  {
    id: "3c98efb0-e1e4-40eb-9c3e-dc086b68e93e",
    nome: "Carlos Meireles",
    dataDeIncorporacao: "1998-07-15",
    cargo: "inspetor",
  },
  {
    id: "f4d7b9a0-f42d-4936-b50e-4fbe6eb93c0b",
    nome: "Juliana Costa",
    dataDeIncorporacao: "2012-11-10",
    cargo: "delegado",
  },
  {
    id: "6aa7c13a-b6e2-40de-822f-1183d9f5b3aa",
    nome: "Bruno Tavares",
    dataDeIncorporacao: "2000-01-05",
    cargo: "inspetor",
  },
  {
    id: "e398c82d-d1e0-407e-94e2-1a58b176c94b",
    nome: "Renata Lopes",
    dataDeIncorporacao: "2018-08-19",
    cargo: "delegado",
  },
  {
    id: "bf37f346-4a8d-4c9e-899c-b9930e8720cd",
    nome: "Eduardo Pacheco",
    dataDeIncorporacao: "2010-05-09",
    cargo: "inspetor",
  },
  {
    id: "d9f36960-6e70-464e-b7e0-30b3f48656c6",
    nome: "Luciana Braga",
    dataDeIncorporacao: "1999-09-28",
    cargo: "delegado",
  },
  {
    id: "5c85f4d1-1619-40a5-a460-835c78bbdff8",
    nome: "Felipe Rocha",
    dataDeIncorporacao: "2003-12-01",
    cargo: "inspetor",
  },
  {
    id: "14746f2f-1a89-4b1b-88d5-6ef8fc8cdb08",
    nome: "Marina Duarte",
    dataDeIncorporacao: "2015-04-17",
    cargo: "delegado",
  },
];

function findAll(sort) {
  if (sort && sort.includes("dataDeIncorporacao")) {
    const agentesOrdenados = [...agentes].sort((a, b) => {
      return new Date(a.dataDeIncorporacao) - new Date(b.dataDeIncorporacao);
    });
    if (sort.startsWith("-")) {
      return agentesOrdenados.reverse();
    }
    return agentesOrdenados;
  }
  return agentes;
}

function findById(id) {
  const agente = agentes.find((agente) => agente.id === id);
  return agente;
}

function create(agente) {
  agente.id = uuidv4();
  agentes.push(agente);
  return agente;
}

function update(id, updatedAgente) {
  const index = agentes.findIndex((agente) => agente.id === id);
  if (index !== -1) {
    agentes[index] = { ...updatedAgente, id: id };
    return agentes[index];
  }
  return null;
}

function partialUpdate(id, updatedFields) {
  const index = agentes.findIndex((agente) => agente.id === id);
  if (index !== -1) {
    const agente = agentes[index];
    Object.assign(agente, updatedFields);
    return agente;
  }
  return null;
}

function remove(id) {
  const index = agentes.findIndex((agente) => agente.id === id);
  if (index !== -1) {
    agentes.splice(index, 1);
    return true;
  }
  return false;
}

function getByCargo(cargo) {
  return agentes.filter((agente) => agente.cargo === cargo);
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  partialUpdate,
  remove,
  getByCargo,
};

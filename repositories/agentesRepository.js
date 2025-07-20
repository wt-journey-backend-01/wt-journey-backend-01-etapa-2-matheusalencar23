const { v4: uuidv4 } = require("uuid");

const agentes = [
  {
    id: uuidv4(),
    nome: "Larissa Moura",
    dataDeIncorporacao: "2005-03-22",
    cargo: "inspetor",
  },
  {
    id: uuidv4(),
    nome: "Carlos Meireles",
    dataDeIncorporacao: "1998-07-15",
    cargo: "inspetor",
  },
  {
    id: uuidv4(),
    nome: "Juliana Costa",
    dataDeIncorporacao: "2012-11-10",
    cargo: "delegado",
  },
  {
    id: uuidv4(),
    nome: "Bruno Tavares",
    dataDeIncorporacao: "2000-01-05",
    cargo: "inspetor",
  },
  {
    id: uuidv4(),
    nome: "Renata Lopes",
    dataDeIncorporacao: "2018-08-19",
    cargo: "delegado",
  },
  {
    id: uuidv4(),
    nome: "Eduardo Pacheco",
    dataDeIncorporacao: "2010-05-09",
    cargo: "inspetor",
  },
  {
    id: uuidv4(),
    nome: "Luciana Braga",
    dataDeIncorporacao: "1999-09-28",
    cargo: "delegado",
  },
  {
    id: uuidv4(),
    nome: "Felipe Rocha",
    dataDeIncorporacao: "2003-12-01",
    cargo: "inspetor",
  },
  {
    id: uuidv4(),
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

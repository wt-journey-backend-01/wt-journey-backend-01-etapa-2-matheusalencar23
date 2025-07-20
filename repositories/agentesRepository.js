const { v4: uuidv4 } = require("uuid");

const agentes = [
  {
    id: "8122d7c4-84bc-4fc5-bb00-e9dc3acbd5c3",
    nome: "Larissa Moura",
    dataDeIncorporacao: "2005-03-22",
    cargo: "inspetor",
  },
  {
    id: "96dace5a-714d-4006-88b2-02c557017d50",
    nome: "Carlos Meireles",
    dataDeIncorporacao: "1998-07-15",
    cargo: "inspetor",
  },
  {
    id: "98d6489d-63ed-4fb3-b7ab-40d3dcf4f83f",
    nome: "Juliana Costa",
    dataDeIncorporacao: "2012-11-10",
    cargo: "delegado",
  },
  {
    id: "32810397-068f-43e8-b9fe-a9bcd10caebb",
    nome: "Bruno Tavares",
    dataDeIncorporacao: "2000-01-05",
    cargo: "inspetor",
  },
  {
    id: "b2d0f540-59c7-4081-820d-f6d49a5b99b3",
    nome: "Renata Lopes",
    dataDeIncorporacao: "2018-08-19",
    cargo: "delegado",
  },
  {
    id: "df61d908-cb23-45bd-bb81-fa85ad31c0ea",
    nome: "Eduardo Pacheco",
    dataDeIncorporacao: "2010-05-09",
    cargo: "inspetor",
  },
  {
    id: "7299a81b-4582-4cfb-9b44-fab5b946039e",
    nome: "Luciana Braga",
    dataDeIncorporacao: "1999-09-28",
    cargo: "delegado",
  },
  {
    id: "fd823280-8e8c-48f5-90dc-15917398825c",
    nome: "Felipe Rocha",
    dataDeIncorporacao: "2003-12-01",
    cargo: "inspetor",
  },
  {
    id: "c81f6135-aa03-403c-a1e6-a1b76ddfaf18",
    nome: "Marina Duarte",
    dataDeIncorporacao: "2015-04-17",
    cargo: "delegado",
  },
];

function findAll() {
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

function getSortedByDataDeIncorporacao(desc) {
  const sortedAgentes = [...agentes].sort(
    (a, b) => new Date(a.dataDeIncorporacao) - new Date(b.dataDeIncorporacao)
  );
  if (desc) {
    sortedAgentes.reverse();
  }
  return sortedAgentes;
}

function getByCargoAndSort(cargo, sort) {
  let agentesFiltrados = getByCargo(cargo);
  if (sort === "dataDeIncorporacao") {
    agentesFiltrados = getSortedByDataDeIncorporacao(false);
  } else if (sort === "-dataDeIncorporacao") {
    agentesFiltrados = getSortedByDataDeIncorporacao(true);
  } else {
    throw new Error("Parâmetro de ordenação inválido");
  }
  return agentesFiltrados;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  partialUpdate,
  remove,
  getByCargo,
  getSortedByDataDeIncorporacao,
  getByCargoAndSort,
};

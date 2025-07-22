const { v4: uuidv4 } = require("uuid");

const agentes = [
  {
    id: "242a1f37-e82a-4e66-886b-ae895c6517f1",
    nome: "Larissa Moura",
    dataDeIncorporacao: "2005-03-22",
    cargo: "inspetor",
  },
  {
    id: "74544057-c89b-46b2-b077-3acfa54635de",
    nome: "Carlos Meireles",
    dataDeIncorporacao: "1998-07-15",
    cargo: "inspetor",
  },
  {
    id: "efef5829-4df9-42ef-9775-32f2793131fe",
    nome: "Juliana Costa",
    dataDeIncorporacao: "2012-11-10",
    cargo: "delegado",
  },
  {
    id: "39fed985-b103-449a-93ed-7b8b2adf8969",
    nome: "Bruno Tavares",
    dataDeIncorporacao: "2000-01-05",
    cargo: "inspetor",
  },
  {
    id: "c18751d0-34c9-4abd-b529-e89226067c0c",
    nome: "Renata Lopes",
    dataDeIncorporacao: "2018-08-19",
    cargo: "delegado",
  },
  {
    id: "16538dc0-e59b-4698-8a4a-3e92feab4506",
    nome: "Eduardo Pacheco",
    dataDeIncorporacao: "2010-05-09",
    cargo: "inspetor",
  },
  {
    id: "e6fa0399-d01e-4535-acc1-d72203e1caea",
    nome: "Luciana Braga",
    dataDeIncorporacao: "1999-09-28",
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
  const agente = agentes.find((agente) => agente.id === id);
  agente.nome = updatedAgente.nome;
  agente.cargo = updatedAgente.cargo;
  agente.dataDeIncorporacao = updatedAgente.dataDeIncorporacao;
  return agente;
}

function updatePartial(id, partialAgente) {
  const agente = agentes.find((agente) => agente.id === id);
  if (partialAgente.nome) agente.nome = partialAgente.nome;
  if (partialAgente.cargo) agente.cargo = partialAgente.cargo;
  if (partialAgente.dataDeIncorporacao)
    agente.dataDeIncorporacao = partialAgente.dataDeIncorporacao;
  return agente;
}

function remove(id) {
  const index = agentes.findIndex((agente) => agente.id === id);
  agentes.splice(index, 1);
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

function getByCargoAndSort(cargo, desc) {
  let agentesFiltrados = getByCargo(cargo);
  agentesFiltrados = agentesFiltrados.sort(
    (a, b) => new Date(a.dataDeIncorporacao) - new Date(b.dataDeIncorporacao)
  );
  if (desc) {
    agentesFiltrados.reverse();
  }
  return agentesFiltrados;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  updatePartial,
  remove,
  getByCargo,
  getSortedByDataDeIncorporacao,
  getByCargoAndSort,
};

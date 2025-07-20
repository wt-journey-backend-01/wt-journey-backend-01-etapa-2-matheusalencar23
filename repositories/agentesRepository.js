const { v4: uuidv4 } = require("uuid");

const agentes = [
  {
    id: "85db22b5-d93f-40f2-aade-229ff6096657",
    nome: "Larissa Moura",
    dataDeIncorporacao: "2005-03-22",
    cargo: "inspetor",
  },
  {
    id: "cf6fbafb-01e0-4ef1-bc99-efd8c3d9698e",
    nome: "Carlos Meireles",
    dataDeIncorporacao: "1998-07-15",
    cargo: "inspetor",
  },
  {
    id: "7bb326ef-a55b-46fc-931a-7afc522f5271",
    nome: "Juliana Costa",
    dataDeIncorporacao: "2012-11-10",
    cargo: "delegado",
  },
  {
    id: "a88b3466-3efa-4e94-871f-6c86a178e172",
    nome: "Bruno Tavares",
    dataDeIncorporacao: "2000-01-05",
    cargo: "inspetor",
  },
  {
    id: "0ef550e4-54db-4fe6-adf5-13f9d6070177",
    nome: "Renata Lopes",
    dataDeIncorporacao: "2018-08-19",
    cargo: "delegado",
  },
  {
    id: "7d321429-122f-4911-8b73-e6ad544dacda",
    nome: "Eduardo Pacheco",
    dataDeIncorporacao: "2010-05-09",
    cargo: "inspetor",
  },
  {
    id: "56367f6f-a9e3-4bd2-82cc-02374c2c7657",
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
  partialUpdate,
  remove,
  getByCargo,
  getSortedByDataDeIncorporacao,
  getByCargoAndSort,
};

const { v4: uuidv4 } = require("uuid");

const casos = [
  {
    id: "a4e517b1-06f0-41d5-b65c-8989cea53db9",
    titulo: "homicidio",
    descricao:
      "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
    status: "aberto",
    agente_id: "85db22b5-d93f-40f2-aade-229ff6096657",
  },
  {
    id: "5fb444fd-82a9-4a92-9a97-3c1e696fb5c4",
    titulo: "roubo à mão armada",
    descricao:
      "Na madrugada de 15/03/2019, dois suspeitos armados invadiram uma loja de conveniência na Av. Brasil, levando cerca de R$ 12.000,00 em dinheiro.",
    status: "aberto",
    agente_id: "cf6fbafb-01e0-4ef1-bc99-efd8c3d9698e",
  },
  {
    id: "dde48781-7688-47fe-953f-b6616d81ae7e",
    titulo: "tráfico de drogas",
    descricao:
      "Após denúncia anônima, agentes localizaram um ponto de venda de drogas na comunidade do Morro Azul, apreendendo entorpecentes e prendendo dois indivíduos.",
    status: "solucionado",
    agente_id: "cf6fbafb-01e0-4ef1-bc99-efd8c3d9698e",
  },
  {
    id: "81c7fe13-cdab-4282-9be5-0c0e4692ecf2",
    titulo: "violência doméstica",
    descricao:
      "No dia 22/09/2022, uma mulher de 32 anos relatou ter sido agredida pelo companheiro em sua residência no bairro Santa Luzia.",
    status: "aberto",
    agente_id: "7bb326ef-a55b-46fc-931a-7afc522f5271",
  },
  {
    id: "5c900d44-f328-48ed-8808-122f825f42e3",
    titulo: "estelionato",
    descricao:
      "Idoso de 67 anos foi vítima de golpe envolvendo transferência bancária falsa, totalizando prejuízo de R$ 18.500,00.",
    status: "solucionado",
    agente_id: "0ef550e4-54db-4fe6-adf5-13f9d6070177",
  },
];

function findAll() {
  return casos;
}

function findById(id) {
  const caso = casos.find((caso) => caso.id === id);
  return caso;
}

function create(caso) {
  caso.id = uuidv4();
  casos.push(caso);
  return caso;
}

function update(id, updatedCaso) {
  const index = casos.findIndex((caso) => caso.id === id);
  if (index !== -1) {
    casos[index] = { ...updatedCaso, id: id };
    return casos[index];
  }
  return null;
}

function partialUpdate(id, updatedFields) {
  const index = casos.findIndex((caso) => caso.id === id);
  if (index !== -1) {
    const caso = casos[index];
    Object.assign(caso, updatedFields);
    return caso;
  }
  return null;
}

function remove(id) {
  const index = casos.findIndex((caso) => caso.id === id);
  if (index !== -1) {
    casos.splice(index, 1);
    return true;
  }
  return false;
}

function getByAgenteId(agenteId) {
  return casos.filter((caso) => caso.agente_id === agenteId);
}

function getByStatus(status) {
  return casos.filter((caso) => caso.status === status);
}

function getByAgenteIdAndStatus(agenteId, status) {
  return casos.filter(
    (caso) => caso.agente_id === agenteId && caso.status === status
  );
}

function filter(term) {
  return casos.filter(
    (caso) =>
      caso.titulo.toLowerCase().includes(term.toLowerCase()) ||
      caso.descricao.toLowerCase().includes(term.toLowerCase())
  );
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  partialUpdate,
  remove,
  getByAgenteId,
  getByStatus,
  filter,
  getByAgenteIdAndStatus,
};

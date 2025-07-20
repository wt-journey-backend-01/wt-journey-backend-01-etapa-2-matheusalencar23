const { v4: uuidv4 } = require("uuid");

const casos = [
  {
    id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
    titulo: "homicidio",
    descricao:
      "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
    status: "aberto",
    agente_id: "f4d7b9a0-f42d-4936-b50e-4fbe6eb93c0b",
  },
  {
    id: "6b214ffe-6e94-4e1f-9872-a21b5db39f3b",
    titulo: "roubo à mão armada",
    descricao:
      "Na madrugada de 15/03/2019, dois suspeitos armados invadiram uma loja de conveniência na Av. Brasil, levando cerca de R$ 12.000,00 em dinheiro.",
    status: "aberto",
    agente_id: "dd0f46cf-1352-41de-8b79-5cb90c63004b",
  },
  {
    id: "87a1f18d-d7f6-4e2e-9b8d-b0194fdbe5f4",
    titulo: "tráfico de drogas",
    descricao:
      "Após denúncia anônima, agentes localizaram um ponto de venda de drogas na comunidade do Morro Azul, apreendendo entorpecentes e prendendo dois indivíduos.",
    status: "solucionado",
    agente_id: "6aa7c13a-b6e2-40de-822f-1183d9f5b3aa",
  },
  {
    id: "3f77e20b-6f4e-4380-b452-85adf3c09c1b",
    titulo: "violência doméstica",
    descricao:
      "No dia 22/09/2022, uma mulher de 32 anos relatou ter sido agredida pelo companheiro em sua residência no bairro Santa Luzia.",
    status: "aberto",
    agente_id: "dd0f46cf-1352-41de-8b79-5cb90c63004b",
  },
  {
    id: "c5d50d80-7f5b-432a-b6dc-bf2c9dcaa20b",
    titulo: "estelionato",
    descricao:
      "Idoso de 67 anos foi vítima de golpe envolvendo transferência bancária falsa, totalizando prejuízo de R$ 18.500,00.",
    status: "solucionado",
    agente_id: "d9f36960-6e70-464e-b7e0-30b3f48656c6",
  },
];

function findAll() {
  return casos;
}

function findById(id) {
  console.log(id);
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

function deleteCaso(id) {
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
  deleteCaso,
  getByAgenteId,
  getByStatus,
  filter,
};

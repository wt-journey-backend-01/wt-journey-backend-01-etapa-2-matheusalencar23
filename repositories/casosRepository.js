const { v4: uuidv4 } = require("uuid");

const casos = [
  {
    id: "33bab00e-160a-4280-9d05-4ca23a00c2c6",
    titulo: "homicidio",
    descricao:
      "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
    status: "aberto",
    agente_id: "242a1f37-e82a-4e66-886b-ae895c6517f1",
  },
  {
    id: "2bc410a4-3867-480a-a812-3e6e203a3b8f",
    titulo: "roubo à mão armada",
    descricao:
      "Na madrugada de 15/03/2019, dois suspeitos armados invadiram uma loja de conveniência na Av. Brasil, levando cerca de R$ 12.000,00 em dinheiro.",
    status: "aberto",
    agente_id: "74544057-c89b-46b2-b077-3acfa54635de",
  },
  {
    id: "0b640a77-c5fb-4649-95e4-6a6771f12802",
    titulo: "tráfico de drogas",
    descricao:
      "Após denúncia anônima, agentes localizaram um ponto de venda de drogas na comunidade do Morro Azul, apreendendo entorpecentes e prendendo dois indivíduos.",
    status: "solucionado",
    agente_id: "74544057-c89b-46b2-b077-3acfa54635de",
  },
  {
    id: "65462a8f-a9dc-45da-83d4-7fc15caf4773",
    titulo: "violência doméstica",
    descricao:
      "No dia 22/09/2022, uma mulher de 32 anos relatou ter sido agredida pelo companheiro em sua residência no bairro Santa Luzia.",
    status: "aberto",
    agente_id: "efef5829-4df9-42ef-9775-32f2793131fe",
  },
  {
    id: "baa8731d-7ae3-44a6-8859-319dd0c12103",
    titulo: "estelionato",
    descricao:
      "Idoso de 67 anos foi vítima de golpe envolvendo transferência bancária falsa, totalizando prejuízo de R$ 18.500,00.",
    status: "solucionado",
    agente_id: "39fed985-b103-449a-93ed-7b8b2adf8969",
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
  const caso = casos.find((caso) => caso.id === id);
  if (!caso) return null;
  caso.titulo = updatedCaso.titulo;
  caso.descricao = updatedCaso.descricao;
  caso.status = updatedCaso.status;
  caso.agente_id = updatedCaso.agente_id;
  return caso;
}

function updatePartial(id, partialCaso) {
  const caso = casos.find((caso) => caso.id === id);
  if (!caso) return null;
  if (partialCaso.titulo) caso.titulo = partialCaso.titulo;
  if (partialCaso.descricao) caso.descricao = partialCaso.descricao;
  if (partialCaso.status) caso.status = partialCaso.status;
  if (partialCaso.agente_id) caso.agente_id = partialCaso.agente_id;
  return caso;
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
  if (!term) return [];
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
  updatePartial,
  remove,
  getByAgenteId,
  getByStatus,
  filter,
  getByAgenteIdAndStatus,
};

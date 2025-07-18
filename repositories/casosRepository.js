const { v4: uuidv4 } = require("uuid");

const casos = [
  {
    id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
    titulo: "homicidio",
    descricao:
      "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
    status: "aberto",
    agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
  },
  {
    id: "6b214ffe-6e94-4e1f-9872-a21b5db39f3b",
    titulo: "roubo à mão armada",
    descricao:
      "Na madrugada de 15/03/2019, dois suspeitos armados invadiram uma loja de conveniência na Av. Brasil, levando cerca de R$ 12.000,00 em dinheiro.",
    status: "aberto",
    agente_id: "a93db56e-c1c9-4f7a-b24e-154c0f0fdc39",
  },
  {
    id: "87a1f18d-d7f6-4e2e-9b8d-b0194fdbe5f4",
    titulo: "tráfico de drogas",
    descricao:
      "Após denúncia anônima, agentes localizaram um ponto de venda de drogas na comunidade do Morro Azul, apreendendo entorpecentes e prendendo dois indivíduos.",
    status: "solucionado",
    agente_id: "c5126cb2-097f-4b2a-8b7e-4a0f21b43c8e",
  },
  {
    id: "3f77e20b-6f4e-4380-b452-85adf3c09c1b",
    titulo: "violência doméstica",
    descricao:
      "No dia 22/09/2022, uma mulher de 32 anos relatou ter sido agredida pelo companheiro em sua residência no bairro Santa Luzia.",
    status: "aberto",
    agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
  },
  {
    id: "c5d50d80-7f5b-432a-b6dc-bf2c9dcaa20b",
    titulo: "estelionato",
    descricao:
      "Idoso de 67 anos foi vítima de golpe envolvendo transferência bancária falsa, totalizando prejuízo de R$ 18.500,00.",
    status: "solucionado",
    agente_id: "a93db56e-c1c9-4f7a-b24e-154c0f0fdc39",
  },
];

function findAll() {
  return casos;
}

function findById(id) {
  return casos.find((caso) => caso.id === id);
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

module.exports = {
  findAll,
  findById,
  create,
  update,
  partialUpdate,
  deleteCaso,
};

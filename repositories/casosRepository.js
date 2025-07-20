const { v4: uuidv4 } = require("uuid");

const casos = [
  {
    id: "a4e517b1-06f0-41d5-b65c-8989cea53db9",
    titulo: "homicidio",
    descricao:
      "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
    status: "aberto",
    agente_id: "8122d7c4-84bc-4fc5-bb00-e9dc3acbd5c3",
  },
  {
    id: "5fb444fd-82a9-4a92-9a97-3c1e696fb5c4",
    titulo: "roubo à mão armada",
    descricao:
      "Na madrugada de 15/03/2019, dois suspeitos armados invadiram uma loja de conveniência na Av. Brasil, levando cerca de R$ 12.000,00 em dinheiro.",
    status: "aberto",
    agente_id: "96dace5a-714d-4006-88b2-02c557017d50",
  },
  {
    id: "dde48781-7688-47fe-953f-b6616d81ae7e",
    titulo: "tráfico de drogas",
    descricao:
      "Após denúncia anônima, agentes localizaram um ponto de venda de drogas na comunidade do Morro Azul, apreendendo entorpecentes e prendendo dois indivíduos.",
    status: "solucionado",
    agente_id: "96dace5a-714d-4006-88b2-02c557017d50",
  },
  {
    id: "81c7fe13-cdab-4282-9be5-0c0e4692ecf2",
    titulo: "violência doméstica",
    descricao:
      "No dia 22/09/2022, uma mulher de 32 anos relatou ter sido agredida pelo companheiro em sua residência no bairro Santa Luzia.",
    status: "aberto",
    agente_id: "32810397-068f-43e8-b9fe-a9bcd10caebb",
  },
  {
    id: "5c900d44-f328-48ed-8808-122f825f42e3",
    titulo: "estelionato",
    descricao:
      "Idoso de 67 anos foi vítima de golpe envolvendo transferência bancária falsa, totalizando prejuízo de R$ 18.500,00.",
    status: "solucionado",
    agente_id: "df61d908-cb23-45bd-bb81-fa85ad31c0ea",
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
};

const typeMap = {
  0: 'Crest',
  1: 'Weapon',
  8: 'Necklace',
  9: 'Earring',
  10: 'Ring',
};

const indexMap = [typeMap[1], typeMap[8], typeMap[9], typeMap[10], typeMap[10]];

export default {
  filters: {
    typeName(type) {
      return typeMap[type];
    },

    indexName(index) {
      return indexMap[index];
    },
  },
};

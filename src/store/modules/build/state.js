export function initialState() {
  return {
    ascendancy: 0,
    levels: [],
    techs: [-1, -1, -1, -1, -1],
    crestTech: -1,
    crests: {},
    title: 'MAZE',
    mode: 0,
    active: -1,
    activeAlt: -1,
  };
}

export default initialState();

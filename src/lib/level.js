function indexOf(level) {
  if (level < 1) {
    return null;
  }

  return level - 1;
}

function valueOf(levels, skill) {
  const starter = skill.levelReq[0] === 1;
  const index = (skill.jobIndex * 24) + skill.slot;
  const val = levels[index];
  let adder = 0;

  if (starter) {
    adder = 1;
  }

  if (typeof val === 'undefined' || val === null) {
    return adder;
  }

  return val + adder;
}


export default {
  indexOf,
  valueOf,
};

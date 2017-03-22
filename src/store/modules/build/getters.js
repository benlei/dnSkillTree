import parameterize from '../../../lib/parameterize';
import Level from '../../../lib/level';

export default {
  spTotals(state, getters, State, Getters) {
    const indexes = state.indexes;
    const skills = Getters.skills;
    const tree = Getters.tree;
    const sp = [0, 0, 0];
    let ascendancy = -1;

    for (let i = 0, slot = 0; i < indexes.length; i += 1, slot = i % 24) {
      const index = indexes[i];

      if (slot === 0) {
        ascendancy += 1;
      }

      if (typeof index === 'number') {
        const skill = skills[tree[ascendancy][slot]];
        const job = skill.job;

        sp[job] += skill.spTotal[index];
      }
    }

    return sp;
  },

  spTotal(state, getters) {
    const spTotals = getters.spTotals;
    return spTotals[0] + spTotals[1] + spTotals[2];
  },

  active(state, getters, State, Getters) {
    if (state.active === -1 && Getters.tree.length) {
      return Getters.tree[0][0];
    }

    return state.active;
  },

  activeAlt(state, getters) {
    return state.activeAlt === -1 ? getters.active : state.activeAlt;
  },

  skill: (state, getters, State, Getters) => Getters.skills[getters.active],
  skillAlt: (state, getters, State, Getters) => Getters.skills[getters.activeAlt],

  name: (state, getters, State, Getters) => Getters.messages[getters.skillAlt.name],

  level: (state, getters) => Level.valueOf(state.indexes, getters.skill),

  index: (state, getters) => Level.indexOf(getters.level),

  softMaxLevel: (state, getters) => getters.skill.maxLevel - getters.skill.spMaxLevel,

  ascendancyTechs(state, getters, State, Getters) {
    const ascendancies = [];
    const techs = state.techs;
    const skills = Getters.skills;

    if (state.crestTech !== -1) {
      ascendancies[skills[state.crestTech].job] = 1;
    }

    techs.forEach((tech) => {
      if (tech !== -1) {
        const skill = skills[tech];

        if (!ascendancies[skill.job]) {
          ascendancies[skill.job] = 0;
        }

        ascendancies[skill.job] += 1;
      }
    });

    return ascendancies;
  },

  techCount(state, getters) {
    const skillId = getters.active;
    let count = 0;

    if (state.crestTech === skillId) {
      count += 1;
    }

    if (state.techs.indexOf(skillId) !== -1) {
      count += 1;
    }

    return count;
  },

  meta(state, getters) {
    const skill = getters.skill;
    const skillAlt = getters.skillAlt;
    const techCount = getters.techCount;
    const level = Math.max(1, getters.level);
    const index = Level.indexOf(level);
    const techIndex = index + techCount;

    const maxLevel = getters.softMaxLevel;
    const spTotal = getters.level ? skill.spTotal[index] : 0;
    const hp = skillAlt.hp[state.mode][techIndex];
    const mp = skillAlt.mp[state.mode][techIndex];
    const cd = skillAlt.cdOverride ?
      skillAlt.cdOverride[state.mode] : skillAlt.cd[state.mode][techIndex];

    return {
      level,
      maxLevel,
      spTotal,
      hp,
      mp,
      cd,
    };
  },

  type(state, getters) {
    const type = getters.skillAlt.type;
    const durationType = getters.skillAlt.durationType;

    if (!type) {
      switch (durationType) {
        case 0:
          return 'Instant';
        case 1:
          return 'Buff';
        case 2:
          return 'Debuff';
        default:
          break;
      }
    } else if (type === 3) {
      return 'Passive Enhanced';
    }

    return 'Passive';
  },

  attribute(state, getters) {
    switch (getters.skillAlt.element) {
      case 0:
        return 'Fire';
      case 1:
        return 'Water';
      case 2:
        return 'Light';
      case 3:
        return 'Dark';
      default:
        break;
    }

    return 'None';
  },

  weapons(state, getters, State, Getters) {
    const weapons = getters.skill.weapons;
    const messages = Getters.messages;
    const weaponMap = Getters.weaponMap;

    if (weapons) {
      return weapons.map(n => messages[weaponMap[n]]);
    }

    return null;
  },

  next(state, getters, State, Getters) {
    const indexes = state.indexes;
    const level = getters.level;
    const skills = Getters.skills;
    const skill = getters.skill;
    const parents = skill.parents ?
      skill.parents
        .filter(parent => Level.valueOf(indexes, skills[parent.id]) < parent.level)
      : null;

    let levelReq = 0;
    let spCost = 0;

    if (level >= skill.maxLevel) {
      const maxLevelIndex = Level.indexOf(skill.maxLevel);
      levelReq = skill.levelReq[maxLevelIndex];
      spCost = skill.sp[maxLevelIndex];
    } else if (!level) {
      levelReq = skill.levelReq[0];
      spCost = skill.sp[0];
    } else {
      levelReq = skill.levelReq[level];
      spCost = skill.sp[level];
    }

    return {
      levelReq,
      parents,
      spCost,
    };
  },

  description(state, getters, State, Getters) {
    const skill = getters.skillAlt;
    const messages = Getters.messages;

    const level = Math.max(1, getters.level);
    const index = Level.indexOf(level);
    const techCount = getters.techCount;
    const techIndex = Math.min(Level.indexOf(skill.maxLevel), index + techCount);

    const descriptionId = skill.description[state.mode][techIndex];

    const str = messages[descriptionId];
    const params = skill.params[state.mode][techIndex];

    return parameterize(str, params, messages);
  },

  nextDescription(state, getters, State, Getters) {
    const skill = getters.skillAlt;
    const messages = Getters.messages;
    const level = getters.level;
    const techCount = getters.techCount;

    // require actual level show when current level is not 0 and not maxed out.
    if (level > 0 && level < skill.maxLevel) {
      // the next index is the current level (next index) + the # of techs to skill
      const nextIndex = level + techCount; // a bad index is still ok (undefined)

      const descriptionId = skill.description[state.mode][nextIndex];
      const params = skill.params[state.mode][nextIndex];
      const nowCd = skill.cd[state.mode][nextIndex - 1];
      const cd = skill.cd[state.mode][nextIndex];
      let str = messages[descriptionId];

      // there is a description + next level has a cd diff, so prepend to description.
      if (str && nowCd !== cd) {
        str = `#pCooldown:#w ${cd} sec\\n${str}`;
      }

      return parameterize(str, params, messages);
    }

    return null;
  },

  crest(state, getters) {
    const crest = state.crests[getters.active];
    if (crest === 0 || crest) {
      return crest;
    }

    return -1;
  },

  crestCount(state) {
    const crests = state.crests;

    return Object.values(crests).filter(crest => crest !== -1).length;
  },

  altSkills(state, getters, State, Getters) {
    const skill = getters.skill;
    const skills = Getters.skills;
    if (!skill.alts) {
      return null;
    }

    return [skill].concat(skill.alts.map(id => skills[id]));
  },
};

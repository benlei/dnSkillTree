import parameterize from '../../../lib/parameterize';
import Level from '../../../lib/level';

export default {
  spTotals(state, getters, State, Getters) {
    const levels = state.levels;
    const skills = Getters.skills;
    const tree = Getters.tree;
    const sp = [];

    for (let i = 0; i < levels.length; i += 1) {
      const level = levels[i];
      if (i % 24 === 0) {
        sp.push(0);
      }

      if (level === 0 || level) {
        const index = sp.length - 1;
        const slot = i % 24;
        const skill = skills[tree[index][slot]];
        const job = skill.job;

        sp[job] += skill.spTotal[level];
      }
    }

    return sp;
  },

  active(state, getters, State, Getters) {
    if (state.active === -1 && Getters.tree.length) {
      const tree = Getters.tree[0];
      for (let i = 0; i < 4; i += 1) {
        if (tree[i] !== null) {
          return tree[i];
        }
      }
    }

    return state.active;
  },

  activeAlt(state, getters) {
    return state.activeAlt === -1 ? getters.active : state.activeAlt;
  },

  skill: (state, getters, State, Getters) => Getters.skills[getters.active],
  skillAlt: (state, getters, State, Getters) => Getters.skills[getters.activeAlt],

  name: (state, getters, State, Getters) => Getters.messages[getters.skillAlt.name],

  level: (state, getters) => Level.valueOf(state.levels, getters.skill),

  index: (state, getters) => Level.indexOf(getters.level),

  techCount(state, getters) {
    const skillId = getters.active;
    let count = 0;

    if (state.crestTech === skillId) {
      count += 1;
    }

    if (state.techs.indexOf(skillId) !== -1) {
      count += 1;
    }

    return Math.min(getters.skill.spMaxLevel, count);
  },

  meta(state, getters) {
    const skill = getters.skill;
    const skillAlt = getters.skillAlt;
    const techCount = getters.techCount;
    const level = Math.max(1, getters.level);
    const index = Level.indexOf(level);
    const techIndex = index + techCount;

    const maxLevel = skill.maxLevel - skill.spMaxLevel;
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

  next(state, getters) {
    const level = getters.level;
    const skill = getters.skill;
    const parents = skill.parents;
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
    const techIndex = index + techCount;

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

    if (level > 0 && level < skill.maxLevel) {
      const descriptionId = skill.description[state.mode][level + techCount];
      const str = messages[descriptionId];
      const params = skill.params[state.mode][level + techCount];

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

  crestDescription(state, getters, State, Getters) {
    const messages = Getters.messages;
    const crests = Getters.crests;
    const index = getters.crest;
    const crestCount = getters.crestCount;

    if (index === -1) {
      return crestCount === 7 ? 'Skill Crest Limit Reached' : 'None';
    }

    const crest = crests[getters.active][index];
    return parameterize(messages[crest.description], crest.params, messages);
  },

  crestCount(state) {
    const crests = state.crests;

    return Object.keys(crests)
      .reduce((a, key) => {
        if (crests[key] === -1) {
          return a;
        }
        return a + 1;
      }, 0);
  },

  altSkills(state, getters, State, Getters) {
    const skill = getters.skill;
    const skills = Getters.skills;
    if (!skill.alts) {
      return null;
    }

    return [skill].concat(skill.alts.map(id => skills[id]));
  },

  relatedSkills(state, getters, State, Getters) {
    const skill = getters.skill;
    const skills = Getters.skills;
    if (!skill.related) {
      return null;
    }

    return skill.related.map(id => skills[id]);
  },
};

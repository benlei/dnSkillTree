import parameterize from '../../../lib/parameterize';
import Level from '../../../lib/level';
import { BUILD_CHARS } from '../../../consts';

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

    return Math.min(getters.skill.spMaxLevel, count);
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

  crestCount(state) {
    const crests = state.crests;
    const add = state.crestTech !== -1 ? 1 : 0;

    return Object.values(crests).filter(crest => crest !== -1).length + add;
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

  violations(state, getters, State, Getters) {
    const violations = {};
    const indexes = state.indexes;
    const tree = getters.tree;
    const skills = Getters.skills;
    const spTotals = getters.spTotals;

    const parents = {};
    const conflicts = { group: {}, base: {} };
    const conflictables = ['group', 'base'];
    const ascendancies = {};

    let index = -1;

    for (let i = 0, slot = 0; i < indexes.length; i += 1, slot = i % 24) {
      if (slot === 0) {
        index += 1;
      }

      const skill = skills[tree[index][slot]];

      if (skill) {
        const level = Level.valueOf(indexes, skill);

        if (level) {
          if (skill.parents) {
            parents[skill.id] = [];
            skill.parents
              .filter(parent => Level.valueOf(indexes, skills[parent.id]) < parent.level)
              .forEach(parent => parents[skill.id].push({ ...parent }));
          }

          ascendancies[skill.id] = [];
          skill.ascendancies.forEach((sp, ascendancy) => {
            if (spTotals[ascendancy] < sp) {
              ascendancies[skill.id].push({ ascendancy, sp });
            }
          });

          conflictables.forEach((name) => {
            const value = skill[name];
            if (value) {
              if (!conflicts[name][value]) {
                conflicts[name][value] = [skill.id];
              } else {
                conflicts[name][value].push(skill.id);
              }
            }
          });
        }
      }
    }

    if (conflicts.group[1]) { // there exists ult
      if (conflicts.group[1].length === 2) {
        const [ultA, ultB] = conflicts.group[1];
        if (parents[ultA] || parents[ultB]) {
          delete parents[ultA];
          delete parents[ultB];
        }
      }

      delete conflicts.group[1];
    }

    Object.keys(ascendancies)
      .forEach((id) => {
        if (ascendancies[id].length) {
          violations[id] = { type: 'ascendancy', data: ascendancies[id] };
        }
      });

    Object.keys(parents)
      .forEach((id) => {
        if (!violations[id] && parents[id].length) { // do not add more info than needed
          violations[id] = { type: 'parent', data: parents[id] };
        }
      });

    conflictables.forEach((name) => {
      Object.values(conflicts[name])
        .forEach((conflict) => {
          if (conflict.length !== 1) {
            const skillId1 = conflict[0];
            const skillId2 = conflict[1];
            if (skillId1 < skillId2) { // overwrite as this takes priority
              violations[skillId1] = { type: 'conflict', data: skillId2 };
              delete violations[skillId2]; // don't duplicate messages
            }
          }
        });
      // Object.keys(conflicts[name])
      //   .forEach((key) => {
      //     if (conflicts[name][key].length !== 1) {
      //       const skillId1 = conflicts[name][key][0];
      //       const skillId2 = conflicts[name][key][1];
      //       if (skillId1 < skillId2) { // overwrite as this takes priority
      //         violations[skillId1] = { type: 'conflict', data: skillId2 };
      //         delete violations[skillId2]; // don't duplicate messages
      //       }
      //     }
      //   });
    });

    return violations;
  },

  path(state, getters, State, Getters) {
    const skills = Getters.skills;
    const indexes = state.indexes;
    const tree = Getters.tree;
    const techs = state.techs;
    const crestTech = state.crestTech;
    const crests = state.crests;
    const len = tree.length * 24;
    const cmap = BUILD_CHARS;
    const extras = [];

    let path = '';
    let trim = 0;
    let ascendancy = -1;

    for (let i = 0, slot = 0; i < len; i += 1, slot = i % 24) {
      if (slot === 0) {
        ascendancy += 1;
      }

      const skill = skills[tree[ascendancy][slot]];

      if (skill) {
        const level = Level.valueOf(indexes, skill);
        const id = skill.id;
        if (level) {
          if (skill.levelReq[0] === 1) {
            if (level === 1) {
              path += cmap[0];
            } else {
              path += cmap[level - 1];
              trim = i + 1;
            }
          } else {
            path += cmap[level];
            trim = i + 1;
          }
        } else {
          path += cmap[0];
        }

        const extra = [skill.index];
        const tech = techs.indexOf(id);

        if (tech !== -1) {
          switch (tech) {
            case 0:
              extra.push('w');
              break;
            case 1:
              extra.push('n');
              break;
            case 2:
              extra.push('e');
              break;
            case 3:
            default:
              extra.push('r');
              break;
          }
        }

        if (crestTech === id) {
          extra.push('c');
        }

        if (crests[id] === 0) {
          extra.push('h');
        } else if (crests[id] === 1) {
          extra.push('H');
        }

        if (extra.length > 1) {
          extras.push(extra.join(''));
        }
      } else {
        path += cmap[0];
      }
    }

    path = path.substring(0, trim);

    if (extras.length) {
      path += `.${extras.join('.')}`;
    }

    if (path) {
      path += '.';
    }

    return path;
  },
};

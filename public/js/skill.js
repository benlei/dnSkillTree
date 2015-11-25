function skill_adj(e) {
  var dom = $(this);
  var skillID = num(dom.data('skill'));
  var max = e.shiftKey || e.ctrlKey;
  var lvl = Job.Cache[skillID].slice(0); // clone it
  var image = dom.css('background-image').replace('_b.png', '.png');
  var skill = db.Skills[skillID];
  var tech = e.altKey;

  var prev = lvl[0];
  if (e.button == 0) { // left click
    if (tech) {
      if (lvl[3] == 2 || skill.SkillGroup == 1) { // can't tech any higher
        return;
      }

      lvl[3] = !lvl[3] ? 1 : 2;
    } else {
      lvl[0] = Math.min(lvl[1], max ? lvl[1] : lvl[0] + 1);
    }
  } else if (e.button == 2) { // right click
    if (tech) {
      if (!lvl[3] || skill.SkillGroup == 1) { // can't tech any lower
        return;
      }

      lvl[3] = lvl[3] == 2 ? 1 : 0;
    } else {
      lvl[0] = Math.max(0, max ? 0 : lvl[0] - 1);
      if (skill.Levels[1].LevelLimit == 1 && lvl[0] == 0) { // default case
        lvl[0] = 1;
      } else if (max) {
        lvl[3] = 0; // reset techs
      }
    }
  }

  var panel = dom.closest('.panel');
  var spdom = panel.find('.panel-heading').find('span'); // do something later
  var sp = spdom.text().split('/').map(num);
  var jobNum = num(panel.data('job'));

  // find SP difference
  var diff = 0, end = Math.max(prev, lvl[0]), inc = prev < lvl[0], totalSP = get_total_sp(), maxSP = get_max_sp();
  if (inc) {
    for (var i = prev + 1; i <= lvl[0]; i++) {
      var s = skill.Levels[i].SkillPoint;
      if (sp[0] + diff + s > sp[1] || totalSP + diff + s > maxSP) {
        lvl[0] = i - 1;
        break;
      }

      diff += s;
    }
  } else {
    for (var i = prev; i > lvl[0]; i--) {
      var s = skill.Levels[i].SkillPoint;
      diff -= s;
      if (!Job.Free && !can_reduce_skill(skillID, skill, i - 1, jobNum, Job.TSP[jobNum] + diff)) {
        lvl[0] = i;
        diff += s;
        break;
      }
    }
  }

  if (lvl[0] == 0 && lvl[3] > 0) {
    lvl[3] = 0;
  }

  if (lvl[0] + lvl[3] > skill.MaxLevel) {
    return;
  }


  if (prev == lvl[0] && !tech) {
    return; // do nothing
  }

  if (!Job.Free) {
    if (lvl[0] > prev) { // skill reduction
      if (!check_skill_reqs(skillID, skill)) {
        return;
      }

      if (!check_skill_groups(skillID, skill)) {
        return;
      }
    }
  }

  // add skillgroup
  if (skill.SkillGroup) {
    var g = skill.SkillGroup;
    if (!Job.SkillGroups[g]) { // nothing exists
      Job.SkillGroups[g] = [];
    }

    var group = Job.SkillGroups[g];
    if (lvl[0] && group.indexOf(skillID) == -1) {
      group.push(skillID);
    } else if (!lvl[0] && group.indexOf(skillID) != -1) {
      Job.SkillGroups[g] = group.filter(function(val) { return val != skillID });
    }
  }

  if (skill.BaseSkillID) {
    var b = skill.BaseSkillID;
    if (! Job.BaseSkills[b]) {
      Job.BaseSkills[b] = [];
    }
    var base = Job.BaseSkills[b];
    if (lvl[0] && base.indexOf(skillID) == -1) {
      base.push(skillID);
    } else if (!lvl[0] && base.indexOf(skillID) != -1) {
      Job.BaseSkills[b] = base.filter(function(val) { return val != skillID });
    }
  }

  // SP adjustment
  sp[0] += diff;
  lvl[2] += diff;
  totalSP += diff;
  Job.TSP[jobNum] += diff;
  var percent = (totalSP / maxSP) * 100;

  $('.progress-bar').css('width', percent + '%');
  $('#curr-progress').text(totalSP + ' SP');
  $('#rem-progress').text((maxSP - totalSP) + ' SP');

  // icon update
  var bdr = dom.find('.skill-bdr');
  dom.css('background-image', lvl[0] ? image : image.replace('.png', '_b.png'));
  lvl[0] && bdr.removeClass('gray') || bdr.addClass('gray');
  spdom.text(sp.join('/'));

  dom.data('lvl', lvl.join(','));
  dom.find('.skill-lvl')
     .removeClass('g b')
     .text([lvl[0] + lvl[3], lvl[4]].join('/'))
     .addClass(lvl[3] == 1 ? 'g' : (lvl[3] == 2 ? 'b' : null));

  Job.Cache[skillID] = lvl;
  $dpop.update(dom);
}


function level_satisfied(skillID, level) {
  var lvl = Job.Cache[skillID];
  return lvl[0] >= level;
}

function check_skill_reqs(skillID, skill) {
  // check if sp total is satisfied
  if (skill.NeedSP) {
    for (var i = 0; i < 3; i++) {
      if (Job.TSP[i] < skill.NeedSP[i]) {
        return false;
      }
    }
  }

  // make sure parent skill is fine
  if (skill.ParentSkills) { // doesn't matter for ults
    var bypass = false;
    if (skill.SkillGroup == 1) {
      var group = Job.SkillGroups[1];
      if (group && group.indexOf(skillID) == -1 && group.length) {
        bypass = true;
      }
    }

    if (!bypass) {
      for (var $skillID in skill.ParentSkills) {
        if (! level_satisfied($skillID, skill.ParentSkills[$skillID])) {
          return false;
        }
      }
    }
  }

  var base = Job.BaseSkills[skill.BaseSkillID];
  if (base && base.indexOf(skillID) == -1 && base.length) {
    return false;
  }

  return true;
}

// check skill group
function check_skill_groups(skillID, skill) {
  var g = skill.SkillGroup;
  if (g) {
    var group = Job.SkillGroups[g];
    if (g == 1 && group && group.length) {
      return Job.SkillGroups[1].reduce(function(p, skillID) {
               if (p) { // short circuit
                 return p;
               }

               var skill = db.Skills[skillID];
               var b = true;
               for (var $skillID in skill.ParentSkills) {
                 b &= level_satisfied($skillID, skill.ParentSkills[$skillID]);
               }
               return p | b;
             }, false);
      return true; // hasn't been set yet
    } else if (group && group.length) {
      return group.indexOf(skillID) != -1;
    }
  }

  return true;
}

function can_reduce_skill(skillID, skill, newLevel, jobNum, newJobSP) {
  for (var $skillID in db.Skills) {
    if ($skillID == skillID) {
      continue;
    }

    var $skill = db.Skills[$skillID];
    var lvl = Job.Cache[$skillID];

    // will this create an SP violation to any other skill?
    if ($skill.NeedSP) {
      if (lvl[0] && newJobSP < $skill.NeedSP[jobNum]) {
        return false;
      }
    }

    if (skill.SkillGroup == 1 && $skill.SkillGroup == 1 && lvl[0] > 0) {
      var group = Job.SkillGroups[1];
      for (var $$skillID in $skill.ParentSkills) {
        if (!level_satisfied($$skillID, $skill.ParentSkills[$$skillID])) {
          return false;
        }
      }
    } else {
      // is this skill a parent of any other valid skill?
      if ($skill.ParentSkills && $skill.ParentSkills[skillID]) {
        if (lvl[0] && newLevel < $skill.ParentSkills[skillID]) {
          return false;
        }
      }
    }
  }

  return true;
}
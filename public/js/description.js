function init_description(dom) {
  dom.popover({
    animation: false,
    html: true,
    trigger: 'manual',
    placement: 'auto right',
    container: $('body')
  })
  .on('mouseenter', _popover.mouseenter)
  .on('mouseleave', _popover.mouseleave)
  .on('mousedown', _popover.mousedown);
}

function update_description(dom) {
  var lvl = dom.data('lvl').split(',').map(int);
  var skill = db.Skills[dom.data('skill')];
  var opts = dom.data('bs.popover').options;
  opts.title = db.Lookup[skill.NameID];
  var d = opts.content ? opts.content : desc_fields.clone(true);

  // non-level related fields - no conditions
  d.find('.dlvl span:last').text(Math.max(1, lvl[0] + lvl[3]));
  d.find('.dlimit span:last').text(lvl[1]);
  if (lvl[2]) {
    d.find('.dtsp').show().find('span:last').text(lvl[2]);
  } else {
    d.find('.dtsp').hide();
  }


  // non-level related fields - with conditions
  if (skill.NeedWeaponType) {
    d.find('.dweaps span:last').text(
      skill.NeedWeaponType.map($d.weapon).join(', '));
  } else {
    d.find('.dweaps').remove();
  }

  var skillType = 'Passive';
  switch(skill.SkillType) {
    case 0: switch(skill.DurationType) {
      case 0: skillType = 'Instant'; break;
      case 1: skillType = 'Buff'; break;
      case 2: skillType = 'Debuff'; break;
    }
    break;
    case 3: skillType = 'Passive Enhanced'; break;
  }
  d.find('.dtype span:last').text(skillType);

  if (skill.Element !== undefined) {
    var ele = 'Fire';
    switch(skill.Element) {
      case 1: ele = 'Water'; break;
      case 2: ele = 'Light'; break;
      case 3: ele = 'Dark'; break;
    }
    d.find('.dele span:last').text(ele);
  } else {
    d.find('.dele').remove();
  }

  // level related fields
  var curr = lvl[0] + lvl[3], currLevel, nextLevel, currApply, nextApply;
  currLevel = skill.Levels[curr];
  currApply = currLevel ? currLevel.ApplyType[0] : null;
  nextLevel = skill.Levels[curr + 1];
  nextApply = nextLevel ? nextLevel.ApplyType[0] : null;
  if (curr == 0) {
    currLevel = nextLevel;
    currApply = nextApply;
  }

  // level up req stuff
  d.find('.dreq, .dreq span:last').removeClass('r');
  var limit = nextLevel ? nextLevel.LevelLimit : currLevel.LevelLimit;
  d.find('.dreqlvl span:last').addClass(Job.MaxLevel < limit ? 'r' : null).text(limit);

  // sp by job req
  if (skill.NeedSP) {
    d.find('.dreqtsp').empty().append(skill.NeedSP.map($d.sp));
  } else {
    d.find('.dreqtsp').remove();
  }

  // skill level req
  if (skill.ParentSkills) {
    d.find('.dreqskills')
  } else {
    d.find('.dreqskills').remove();
  }


  // stuff that shouldn't show when unnecessary
  if (nextLevel) {
    var jobNum = dom.closest('.panel').data('job');
    var maxSP = get_max_sp();
    var jobSP = Job.TSP[jobNum];
    var currMaxSP = get_curr_max_sp();

    d.find('.dreqsp').show().find('span:last').text(nextLevel.SkillPoint).addClass(
      (jobSP + nextLevel.SkillPoint > maxSP*Job.SP[jobNum] ||
       currMaxSP + nextLevel.SkillPoint > maxSP) ? 'r' : null
    );
  } else {
    d.find('.dreqsp').hide();
  }

  // apply type specific
  var decreaseSP = currApply ? currApply.DecreaseSP : nextApply.DecreaseSP;
  if (decreaseSP) {
    d.find('.dmp span:last').show().text(decreaseSP);
  } else {
    d.find('.dmp').hide();
  }

  var delayTime = (currApply ? currApply.DelayTime : nextApply.DelayTime) / 1000;
  if (delayTime) {
    d.find('.dcd').show().find('span:last').text(delayTime);
  } else {
    d.find('.dcd').hide();
  }


  // descriptions
  var explID = currApply ? currApply.SkillExplanationID : nextApply.SkillExplanationID;
  var explParams = currApply ? currApply.SkillExplanationIDParam : nextApply.SkillExplanationIDParam;
  d.find('.dnowv').html(desc_format(db.Lookup[explID], explParams));
  if (curr == 0 || curr == lvl[1] + skill.SPMaxLevel) { // level 0/maxed; no next, but show next/now
    d.find('.dnext').hide();
    d.find('.dnextdiv').hide();
  } else {
    d.find('.dnextdiv').show();
    d.find('.dnext').show();
    d.find('.dnextv').html(desc_format(db.Lookup[nextApply.SkillExplanationID],
                                       nextApply.SkillExplanationIDParam));
  }

  opts.content = d;
}

function tag(t, cls, text) {
  return $(document.createElement(t)).addClass(cls).text(text);
}

function desc_tag(cls, field) {
  return tag('div', cls).append(tag('span', 'o', field + ': '), tag('span'));
}

var $d = {
  params: function(p) {
    if (p.startsWith('{')) {
      return db.Lookup[p.substring(1, p.length - 1)];
    } else {
      return p;
    }
  },
  weapon: function(w) {
    return db.Weapons[w];
  },
  sp: function(sp,i) {
    if (sp > 0) {
      return tag('span',
                 Job.TSP[i] < sp ? 'r' : null,
                 Job.Names[i] + " SP Total " + sp + " or above");
    } else {
      return null;
    }
  }
};

var _popover = {
  persist: null,
  mouseenter: function () {
    var dom = $(this), trigger = dom.data('desc');
    if (trigger == 'hover' && !_popover.persist) {
      update_description(dom);
      dom.popover('show');
    }
  },
  mouseleave: function() {
    var dom = $(this), trigger = dom.data('desc');
    if (trigger == 'hover') {
      dom.popover('hide');
    }
  },
  mousedown: function(e) {
    if (e.button == 1) {
      var dom = $(this), trigger = dom.data('desc');
      if (trigger == 'hover') {
        dom.data('desc', 'mclick');
        _popover.persist = dom;
      } else {
        dom.data('desc', 'hover');
        _popover.persist = null;
      }
    }
  }
};

var desc_fields = tag('div').append(
  desc_tag('dlvl', 'Skill Lv.'),
  desc_tag('dmp', 'Fee MP'),
  desc_tag('dweaps', 'Required Weapon'),
  desc_tag('dtype', 'Skill Type'),
  desc_tag('dele', 'Attribute'),
  desc_tag('dcd', 'Cooldown'),
  desc_tag('dlimit', 'Level Limit'),
  desc_tag('dtsp', 'Total SP'),
  tag('div', 'divider dreq'),
  tag('div', 'dreq o', 'Level Up Requirements:'),
  tag('div', 'dreq dreqlvl').append(
    tag('span', null, 'Character Level '),
    tag('span')
  ),
  tag('div', 'dreq dreqskills'),
  tag('div', 'dreq dreqtsp'),
  tag('div', 'dreq dreqsp').append(
    tag('span', null, 'SP '),
    tag('span')
  ),
  tag('div', 'dnow').append(
    tag('div', 'dnowf o', 'Skill Descrption'),
    tag('div', 'dnowv')
  ),
  tag('div', 'divider dnextdiv'),
  tag('div', 'dnext').append(
    tag('div', 'dnextf o', 'Next Description'),
    tag('div', 'dnextv')
  )
);


function desc_format(str, params) {
  params = params.split(',').map($d.params);

  for (var i = 0; i < params.length; i++) {
    str = str.replace('{' + i + '}', params[i]);
  }

  var c = 0, w = 0, p = 0, newStr = "", startPos = 0;
  for (var i = 0; i < str.length - 1; i++) {
    switch (str.substr(i, 2)) {
      case "#y": case "#p": case "#r": case "#s": case "#v":
      if (c - w == 1) { // needed a closing </span>
        newStr += str.substring(startPos, i) + "</span><span class=\"" + str.substr(i+1,1) + "\">";
      } else {
        newStr += str.substring(startPos, i) + "<span class=\"" + str.substr(i+1,1) + "\">";
        c++;
      }

      startPos = i + 2;
      ++i;
      break;
      case "#w":
      if (w == c) { // early #w
        newStr +=  str.substring(startPos, i);
      } else {
        newStr += str.substring(startPos, i) + "</span>";
        w++;
      }

      startPos = i + 2;
      ++i;
      default:
      break;
    }
  }

  newStr = newStr + str.substr(startPos);

  if (c != w) {
    newStr = newStr + "</span>";
  }

  return newStr.replace(/\\n/g, "<br />");
}

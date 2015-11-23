function dnss(urls) {
  // initialize all the images
  $('.jobsprite').each(function() {
    $(this).css('background-image', "url('" + urls.mainbar + "/jobicon_pvp.png')");
  });

  // is async, don't care when we get it
  $.getJSON(urls.job, function(data) {
    db = data;

    // have it stay a little
    $('.skill[data-skill]').each(function() {
      var dom = $(this);
      dom.data('desc', 'hover'); // initialize desc
      init_description(dom);
    });
  });

  $('.skill[data-skill]').each(function() {
    var dom = $(this);
    var lvl = dom.data('lvl').split(',').map(num);
    var grayed = lvl[0] == 0 ? '_b' : '';
    var sprite = dom.data('sprite').split(',');
    sprite[1] *= -50;
    sprite[2] *= -50;

    dom.css('background', "url('"+ urls.mainbar  +"/skillicon" + sprite[0] + grayed + ".png') " + sprite[1] + "px " + sprite[2] + "px"); // initial setup
    dom.find('.skill-bdr')
       .css('background', "url('" + urls.border + "') 100px 0")
       .addClass(lvl[0] > 0 ? null : 'gray');
    dom.find('.skill-lvl').text([lvl[0] + lvl[3], lvl[1]].join('/'));

    dom.on('mousedown', skill_adj);

    // disable right click; maybe disable whole panel body?
    dom.on('contextmenu', prevent_default);
  });

  // level selection
  var ldom = $('#level');
  for (var level = Job.Levels.length; level > 0; level--) {
    ldom.append(tag('option', null, 'Lv. ' + level).val(level));
  }
  ldom.val(Job.MaxLevel);

  // the apply type
  $('#pvp').click(reverse('#pve', function() { Job.ApplyType = 1 }));
  $('#pve').click(reverse('#pvp', function() { Job.ApplyType = 0 }));

  // the strictness
  $('#free').click(reverse('#strict', function() { Job.Free = true }));
  $('#strict').click(reverse('#free', strict_switch));

  $('#s').val('').on('input', function() {
    var str = $('#s').val();
    var re;
    try {
       re = new RegExp(str, 'im');
    } catch (x) {
      return;
    }

    $('div[data-skill]').each(function() {
      var dom = $(this);
      if (str.length > 2) {
        update_description(dom)
        var opts = dom.data('bs.popover').options;

        // check title
        var text = opts.title.text();
        if (set_opacity(dom, re.test(text)  ? 1 : .33) == 1) { // matched
          return;
        }

        set_opacity(dom, re.test(opts.content.text()) ? 1 : .33);
      } else {
        set_opacity(dom, 1);
      }
    });
  });
}

function set_opacity(dom, o) {
  if (o < 0 || o > 1) {
    return;
  }

  dom.css("opacity", o);
  return o;
};

function prevent_default(e) {
  e.preventDefault();
}

function num(v) {
  return parseInt(v);
}

function sum(p, c) {
  return p+c;
}

function get_total_sp() {
  return Job.TSP.reduce(sum);
}

function get_max_sp() {
  return Job.Levels.slice(0, Job.MaxLevel).reduce(sum);
}

function tag(t, cls, text) {
  return $(document.createElement(t))
                   .addClass(cls)
                   .text(text);
}

function reverse(rev, handler) {
  var ON = 'btn-primary', OFF = 'btn-default';
  return function() {
    if (handler() === false) {
      return;
    }
    $(rev).removeClass(ON).addClass(OFF);
    $(this).addClass(ON);
  };
}


function level_satisfied(skillID, level) {
  var lvl = $('div[data-skill=' + skillID + ']').data('lvl').split(',').map(num);
  return lvl[0] >= level;
}

function strict_checker(setFree) {
  var changeable = true;
  $('div[data-skill]').each(function() {
    var skillID = num($(this).data('skill'));
    var lvl = $(this).data('lvl').split(',').map(num);
    var skill = db.Skills[skillID];

    // make sure needsp is fine
    if (lvl[0] > 0) {
      if (skill.NeedSP) {
        for (var i = 0; i < 3; i++) {
          if (Job.TSP[i] < skill.NeedSP[i]) {
            changeable = false;
            return;
          }
        }
      }

      // make sure parent skill is fine
      if (skill.ParentSkills && skill.SkillGroup != 1) { // doesn't matter for ults
        for (var $skillID in skill.ParentSkills) {
          if (! level_satisfied($skillID, skill.ParentSkills[$skillID])) {
            changeable = false;
            return;
          }
        }
      }
    }
  });

  // BaseSkillID check
  for (var skillID in Job.BaseSkills) {
    if (Job.BaseSkills[skillID].length > 1) {
      changeable = false;
      break;
    }
  }

  // check skill group
  for (var g in Job.SkillGroups) {
    if (g == 1) {
      changeable = Job.SkillGroups[1].reduce(function(p, c) {
                     var skill = db.Skills[c];
                     var b = true;
                     for (var skillID in skill.ParentSkills) {
                       b &= level_satisfied(skillID, skill.ParentSkills[skillID]);
                     }
                     return p | b;
                   }, false)
      if (!changeable) {
        break;
      }
    } else {
      if (Job.SkillGroups[g].length > 1) { // only one allowed in group
        changeable = false;
        break;
      }
    }
  }

  if (changeable && setFree) {
    Job.Free = false;
  }

  return changeable;
}

function strict_switch() {
  if (!strict_checker(true)) {
    alert('Cannot set to strict because some skill requirements have not been fulfilled.');
    return false;
  }
}
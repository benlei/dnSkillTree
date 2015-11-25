/* global */
dskills = $(document.getElementsByClassName('dskill'));
function dnss(urls) {
  // initialize all the images
  $('.jobsprite').each(function() {
    $(this).css('background-image', "url('" + urls.mainbar + "/jobicon_pvp.png')");
  });

  // is async, don't care when we get it
  $.getJSON(urls.job, function(data) {
    db = data;

    // have it stay a little
    dskills.each(function() {
      var dom = $(this);
      dom.data('desc', 'hover'); // initialize desc
      init_description(dom);
    });
  });

  dskills.each(function() {
    var dom = $(this);
    var skillID = dom.data('skill');
    var lvl = dom.data('lvl').split(',').map(num);
    var grayed = lvl[0] == 0 ? '_b' : '';
    var sprite = dom.data('sprite').split(',');
    sprite[1] *= -50;
    sprite[2] *= -50;
    Job.Cache[skillID] = lvl;

    dom.css('background', "url('"+ urls.mainbar  +"/skillicon" + sprite[0] + grayed + ".png') " + sprite[1] + "px " + sprite[2] + "px"); // initial setup
    dom.find('.skill-bdr')
       .css('background', "url('" + urls.border + "') 100px 0")
       .addClass(lvl[0] > 0 ? null : 'gray');
    dom.find('.skill-lvl').text([lvl[0] + lvl[3], lvl[4]].join('/'));

    dom.on('mousedown', skill_adj);
  });

  $('.panel-body').on('contextmenu', prevent_default);

  // level selection
  for (var level = Job.Levels.length; level > 0; level--) {
    $('#level').append(tag('option', null, 'Lv. ' + level).val(level));
  }
  $('#level').val(Job.MaxLevel);

  // the apply type
  $('#pvp').click(reverse('#pve', function() { return Job.ApplyType = 1, !0 }));
  $('#pve').click(reverse('#pvp', function() { return Job.ApplyType = 0, !1 }));

  // the strictness
  $('#free').click(reverse('#strict', function() { return Job.Free = true }));
  $('#strict').click(reverse('#free', strict_switch));

  $('#s').val('').on('input', function() {
    var str = $('#s').val();
    var re;
    try {
       re = new RegExp(str, 'im');
    } catch (x) {
      return;
    }

    dskills.each(function() {
      var dom = $(this);
      if (str.length > 2) {
        update_description(dom)
        var opts = dom.data('bs.popover').options;

        // check title
        var text = opts.title.text();
        if (re.test(text)) {
          dom.css('opacity', 1);
          return;
        }

        text = opts.content.clone();
        text.find('.hidden').remove();
        dom.css('opacity', re.test(text.text()) ? 1 : .33);
      } else {
        dom.css('opacity', 1);
      }
    });
  });

  var RST = 'Reset', INC = 'Raise';
  $('#level').change(function() {
    var val = num($(this).val());
    $('#level-btn').text(val <= Job.MaxLevel ? RST : INC);
  });

  $('#level-btn').mousedown(function() {
    var level = num($('#level').val());
    dskills.each(function() {
      var dom = $(this);
      var skillID = num(dom.data('skill'));
      var skill = db.Skills[skillID];
      var lvl = Job.Cache[skillID];

      // update skill lvl
      if (level <= Job.MaxLevel) {
        lvl[0] = db.Skills[skillID].Levels[1].LevelLimit == 1 ? 1 : 0;
        lvl[2] = 0;
        lvl[3] = 0;

        var image = dom.css('background-image').replace('_b.png', '.png');
        dom.css('background-image', lvl[0] ? image : image.replace('.png', '_b.png'));
        dom.find('.skill-bdr')
           .removeClass('gray')
           .addClass(lvl[0] ? null : 'gray');
      }

      if (level != Job.MaxLevel) {
        // calculate new max SP
        var newMax = 0;
        var absMax = skill.MaxLevel - skill.SPMaxLevel;
        for (var i = absMax, j = 1; i > 0; i--, j++) {
          if (skill.Levels[i].LevelLimit <= level) {
            newMax = i;
            break;
          }

          if (skill.Levels[j].LevelLimit <= level) {
            newMax = j;
          } else {
            break;
          }
        }

        lvl[1] = Math.min(newMax, absMax);
      }

      dom.find('.skill-lvl')
         .removeClass(level <= Job.MaxLevel ? 'g b' : null)
         .text([lvl[0] + lvl[3], lvl[4]].join('/'))

      dom.data('lvl', lvl.join(','));
    });

    // update panels
    var max_sp = get_max_sp(level);

    $('.panel').each(function(jobNum) {
      var spdom = $(this).find('.panel-heading').find('span');
      var sp = spdom.text().split('/').map(num);
      var sp_ratio = Job.SP[jobNum];
      sp[1] = num(max_sp * sp_ratio);
      if (level <= Job.MaxLevel) {
        sp[0] = 0;
      }

      spdom.text(sp.join('/'));
    });

    // other caches to reset
    $('#max-progress').text(max_sp + ' SP');
    if (level <= Job.MaxLevel) {
      $('.progress-bar').css('width', '0%');
      $('#curr-progress').text('0 SP');
      $('#rem-progress').text(max_sp + ' SP');

      Job.TSP = [0,0,0];
      Job.SkillGroups = {};
      Job.BaseSkills = {};
    } else {
      var total_sp = get_total_sp();
      console.log(total_sp);
      console.log(max_sp);
      var percent = (total_sp/max_sp) * 100;
      $('.progress-bar').css('width', percent + '%');
      $('#rem-progress').text((max_sp - total_sp) + ' SP');
    }

    $(this).text(RST);
    Job.MaxLevel = level;
  });
}

function set_opacity(dom, o) {
  if (o < 0 || o > 1) {
    return -1;
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

function get_max_sp(level) {
  return Job.Levels.slice(0, level || Job.MaxLevel).reduce(sum);
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

function strict_checker(setFree) {
  var changeable = true;
  dskills.each(function() {
    var skillID = num($(this).data('skill'));
    var lvl = Job.Cache[skillID];
    var skill = db.Skills[skillID];

    // make sure needsp is fine
    if (lvl[0] > 0) {
      if (!check_skill_reqs(skillID, skill)) {
        changeable = false;
        return;
      }

      if (!check_skill_groups(skillID, skill)) {
        changeable = false;
        return;
      }
    }
  });

  if (changeable && setFree) {
    Job.Free = false;
  }

  return changeable;
}

var warning = $('#warning').detach();
function strict_switch() {
  if (!strict_checker(true)) {
    if (!$('#warning').length) {
      warning.clone()
             .addClass('alert alert-danger')
             .text('Cannot set to strict mode because one or more skill requirements have not been fulfilled.')
             .prepend(tag('a', 'close', '×').attr({"data-dismiss": 'alert', "aria-label": 'close', title: 'close'}))
             .appendTo($('#warning-wrap'));
    }
    return false;
  }
  return true;
}
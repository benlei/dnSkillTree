function skill_adj(e) {
  var dom = $(this);
  var max = e.shiftKey || e.ctrlKey;
  var lvl = dom.data('lvl').split(',').map(num);
  var image = dom.css('background-image').replace('_b.png', '.png');
  var skill = db.Skills[dom.data('skill')];

  var prev = lvl[0];
  if (e.button == 0) { // left click
    lvl[0] = Math.min(lvl[1], max ? lvl[1] : lvl[0] + 1);
  } else if (e.button == 2) { // right click
    lvl[0] = Math.max(0, max ? 0 : lvl[0] - 1);
    if (skill.Levels[1].LevelLimit == 1 && lvl[0] == 0) { // default case
      lvl[0] = 1;
    } else {
      lvl[3] = 0; // reset techs
    }
  }

  var panel = dom.closest('.panel');
  var spdom = panel.find('.panel-heading span'); // do something later
  var sp = spdom.text().split('/').map(num);

  // find SP difference
  var diff = 0, end = Math.max(prev, lvl[0]), inc = prev < lvl[0], totalSP = get_total_sp(), maxSP = get_max_sp();
  for (var i = Math.min(prev, lvl[0]) + 1; i <= end; i++) {
    var s = skill.Levels[i].SkillPoint;
    if (inc) {
      if (sp[0] + diff + s > sp[1] || totalSP + diff + s > maxSP) {
        lvl[0] = i - 1;
        break;
      }

      diff += s;
    } else {
      diff -= s;
    }
  }

  if (prev == lvl[0]) {
    return; // do nothing
  }

  // SP adjustment
  sp[0] += diff;
  lvl[2] += diff;
  totalSP += diff;
  Job.TSP[panel.data('job')] += diff;
  var percent = (totalSP / maxSP) * 100;

  $('.progress-bar').css('width', percent + '%');
  $('.curr-progress').text(totalSP + ' SP');
  $('.rem-progress').text((maxSP - totalSP) + ' SP');

  // icon update
  var bdr = dom.find('.skill-bdr');
  dom.css('background-image', lvl[0] ? image : image.replace('.png', '_b.png'));
  lvl[0] && bdr.removeClass('gray') || bdr.addClass('gray');
  spdom.text(sp.join('/'));

  dom.data('lvl', lvl.join(','));
  dom.find('.skill-lvl').text([lvl[0] + lvl[3], lvl[1]].join('/'));

  $dpop.update(dom);
}

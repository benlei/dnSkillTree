function skill_adj(e) {
  var dom = $(this);
  var max = e.shiftKey || e.ctrlKey;
  var lvl = dom.data('lvl').split(',').map(int);
  var image = dom.css('background-image').replace('_b.png', '.png');
  var skill = db.Skills[dom.data('skill')];
  dom.find('.skill-bdr').removeClass('gray');

  var curr = lvl[0];
  if (e.button == 0) { // left click
    lvl[0] = Math.min(lvl[1], max ? lvl[1] : lvl[0] + 1);
    dom.css('background-image', image);
  } else if (e.button == 2) { // right click
    lvl[0] = Math.max(0, max ? 0 : lvl[0] - 1);
    if (skill.Levels[1].LevelLimit == 1 && lvl[0] == 0) { // default case
      lvl[0] = 1;
    }

    if (lvl[0] == 0) {
      dom.css('background-image', image.replace('.png', '_b.png'));
      dom.find('.skill-bdr').addClass('gray');
    }
  }

  dom.data('lvl', lvl.join(','));
  dom.find('.skill-lvl').text(lvl.join('/'));

  // find SP difference
  var diff = 0;

  // SP adjustment
  var spdom = dom.closest('.panel').find('.panel-heading span'); // do something later
  var sp = spdom.text().split('/').map(int);
}

function skill_description() {

}

function int(v) {
  return parseInt(v);
}

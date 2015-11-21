function init_description(dom) {
  dom.popover({
    animation: false,
    html: true,
    trigger: 'manual',
    placement: 'auto left',
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
  d.find('.dlvl span:last').text(lvl[0] + lvl[3]);
  d.find('.dlimit span:last').text(lvl[1]);
  d.find('.dtsp span:last').text(lvl[2])
  opts.content = d;
}

function tag(t, cls, text) {
  return $(document.createElement(t)).addClass(cls).text(text);
}

function desc_map(cls, field) {
  return tag('div', cls).append(tag('span', 'o', field + ': '), tag('span'));
}

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

var desc_fields = [
  desc_map('dlvl', 'Skill Lv.'),
  desc_map('dmp', 'Fee MP'),
  desc_map('dweap', 'Required Weapon'),
  desc_map('dtype', 'Skill Type'),
  desc_map('dele', 'Attribute'),
  desc_map('dcd', 'Cooldown'),
  desc_map('dlimit', 'Level Limit'),
  desc_map('dtsp', 'Total SP'),
  tag('div', 'divider'),
  tag('div', 'dreq o', 'Level Up Requirements:'),
  tag('div', 'dreqlvl').append(
    tag('span', null, 'Character Level '),
    tag('span')
  ),
  tag('div', 'dreqskills'),
  tag('div', 'dreqtsp'),
  tag('div', 'dreqsp').append(
    tag('span', null, 'SP '),
    tag('span')
  ),
  tag('div', 'dnow').append(
    tag('div', 'dnowf o', 'Skill Descrption'),
    tag('div', 'dnowv')
  ),
  tag('div', 'dnext').append(
    tag('div', 'dnextf o', 'Next Description'),
    tag('div', 'dnextv')
  )
].reduce(function(p,c) { p.append(c); return p }, tag('div'));


function desc_format(str) {
  if (str == -1) {
    return -1;
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

  return "<p>" + newStr.replace(/\\n/g, "</p><p>") + "</p>";
}
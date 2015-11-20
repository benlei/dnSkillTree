function init_description(dom) {
  dom.popover({
    animation: false,
    html: true,
    trigger: 'manual',
    placement: 'auto right',
    content: 'Loading...',
    container: $('body')
  })
  .on('mouseenter', _popover.mouseenter)
  .on('mouseleave', _popover.mouseleave)
  .on('mousedown', _popover.mousedown);

  update_description(dom);
}

function update_description(dom) {
  var skill = db.Skills[dom.data('skill')];
  var description = [
    '<div><span class="o">Skill Lv.:</span></div>',
    '<div><span class="o">Required Weapons:</span></div>'
  ].join('');

  var p = dom.data('bs.popover').options;
  p.title = db.Lookup[skill.NameID];
  p.content = description;
}

var _popover = {
  persist: null,
  mouseenter: function () {
    var dom = $(this), trigger = dom.data('desc');
    if (trigger == 'hover' && !_popover.persist) {
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

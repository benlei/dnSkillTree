function bind_skill(id, dom) {
  dom.bind({
    mousedown: function(e) {
      var max = e.shiftKey || e.ctrlKey;
      var lvl = dom.data('lvl').split(',').map(parseInt)
      var image = dom.css('background-image').replace('_b.png', '.png');
      if (e.button == 0) { // left click
        lvl[0] = max ? lvl[0]+1 : lvl[1];
        dom.css('background-image', image);
      } else if (e.button == 2) { // right click
        lvl[0] = max ? lvl[0]-1 : 0;
        dom.css('background-image', image.replace('.png', '_b.png'));
      }
    },

    mouseenter: function() {

    }
  })
}

function adj_skill_lvl(id, dom, delta) {
  var lvl = dom.data('lvl').split(',').map(parseInt)
  var image = dom.css('background-image').replace('_b.png', '.png');
  var grayed = lvl[0] == 0 ? '_b' : '';
  dom.css('background', "url('"+ urls.mainbar  +"/skillicon" + sprite[0] + grayed + ".png') " + sprite[1] + "px " + sprite[2] + "px");
  dom.find('.skill-bdr').css('background', "url('" + urls.border + "') 100px 0").addClass(lvl[0] > 0 ? null : 'gray');
  dom.find('.skill-lvl').text(lvl[0] + '/' + lvl[1]);
}
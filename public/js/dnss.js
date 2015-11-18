var $persist;
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
      dom.data('desc', 'hover');
      var skillID = int(dom.data('skill'));
      dom.popover({
        animation: false,
        html: true,
        placement: 'right',
        trigger: 'manual',
        title: db.Lookup[db.Skills[skillID].NameID],
        placement: 'auto right',
        content: "<p>Hello, world</p><p>What</p><p>now</p>",
        container: $('body')
      })
      .on('mouseenter', function() {
        var dom = $(this), trigger = dom.data('desc');
        if (trigger == 'hover' && !$persist) {
          dom.popover('show');
        }
      })
      .on('mouseleave', function() {
        var dom = $(this), trigger = dom.data('desc');
        if (trigger == 'hover') {
          dom.popover('hide');
        }
      })
      .on('mousedown', function(e) {
        if (e.button == 1) {
          var dom = $(this), trigger = dom.data('desc');
          if (trigger == 'hover') {
            dom.data('desc', 'mclick');
            $persist = dom;
          } else {
            dom.data('desc', 'hover');
            $persist = null;
          }
        }
      });
    });
  });

  $('.skill[data-skill]').each(function() {
    var dom = $(this);
    var lvl = dom.data('lvl').split(',');
    var grayed = lvl[0] == 0 ? '_b' : '';
    var sprite = dom.data('sprite').split(',');
    sprite[1] *= -50;
    sprite[2] *= -50;

    dom.css('background', "url('"+ urls.mainbar  +"/skillicon" + sprite[0] + grayed + ".png') " + sprite[1] + "px " + sprite[2] + "px"); // initial setup
    dom.find('.skill-bdr').css('background', "url('" + urls.border + "') 100px 0").addClass(lvl[0] > 0 ? null : 'gray');
    dom.find('.skill-lvl').text(lvl.join('/'));

    dom.bind({mousedown: skill_adj, mouseenter: skill_description});

    // disable right click; maybe disable whole panel body?
    dom.on({contextmenu:function(e) {e.preventDefault()}});
  });
}

function int(v) {
  return parseInt(v);
}

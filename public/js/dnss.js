function dnss(urls) {
  // initialize all the images
  $('.jobsprite').each(function() {
    $(this).css('background-image', "url('" + urls.mainbar + "/jobicon_pvp.png')");
  });

  // is async, don't care when we get it
  $.getJSON(urls.job, function(data) {
    db = data;    
  });
  
  $('.skill[data-skill]').each(function() {
    var dom = $(this);
    var lvl = dom.data('lvl').split(',');
    var sprite = dom.data('sprite').split(',');
    sprite[1] *= -50;
    sprite[2] *= -50;
    var grayed = lvl[0] == 0 ? '_b' : '';
    dom.css('background', "url('"+ urls.mainbar  +"/skillicon" + sprite[0] + grayed + ".png') " + sprite[1] + "px " + sprite[2] + "px");
    dom.find('.skill-bdr').css('background', "url('" + urls.border + "') 100px 0").addClass(lvl[0] > 0 ? null : 'gray');
    dom.find('.skill-lvl').text(lvl[0] + '/' + lvl[1]);
    bind_skill(dom.data('skill'), dom);
  });


}


function dnss(urls) {
  // initialize all the images
  $('.jobsprite').each(function() {
    $(this).css('background', "url('" + urls.mainbar + "/jobicon_pvp.png') no-repeat")
  });
  
  $('.skill[data-skill]').each(function() {
    var sprite = $(this).data('sprite').split(',')
    sprite[1] *= -50
    sprite[2] *= -50
    var grayed = $(this).find('.gray').length ? '_b' : ''
    $(this).css('background', "url('"+ urls.mainbar  +"/skillicon" + sprite[0] + grayed + ".png') " + sprite[1] + "px " + sprite[2] + "px")
  });

  $('.skill-bdr').each(function() {
    $(this).css('background', "url('" + urls.border + "') 100px 0")
  });
}


function dnss(urls) {
  // initialize all the images
  $('.jobsprite').each(function() {
    $(this).css('background-image', "url('" + urls.mainbar + "/jobicon_pvp.png')")
  });
  
  $('.skill[data-skill]').each(function() {
    var lvl = $(this).data('lvl').split(',')
    var sprite = $(this).data('sprite').split(',')
    sprite[1] *= -50
    sprite[2] *= -50
    var grayed = lvl[0] == 0 ? '_b' : ''
    $(this).css('background', "url('"+ urls.mainbar  +"/skillicon" + sprite[0] + grayed + ".png') " + sprite[1] + "px " + sprite[2] + "px")    
    $(this).find('.skill-bdr').css('background', "url('" + urls.border + "') 100px 0").addClass(lvl[0] > 0 ? null : 'gray')
    $(this).find('.skill-lvl').text(lvl[0] + '/' + lvl[1])
  });



  $.getJSON(urls.job, function(data) {
    db = data;
    
  });
}


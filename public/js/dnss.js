function dnss() {
  $('.skill[data-skill]').each(function() {
    var sprite = $(this).data('sprite').split(',')
    sprite[1] *= -50
    sprite[2] *= -50
    var grayed = $(this).find('.gray').length ? '_b' : ''
    $(this).css('background', "url('"+ mainbar  +"/skillicon" + sprite[0] + grayed + ".png') " + sprite[1] + "px " + sprite[2] + "px")
  })
}


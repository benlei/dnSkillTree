function dnss() {
  $('.skill[data-skill]').each(function() {
    var sprite = $(this).data('sprite').split(',')
    sprite[1] *= -50
    sprite[2] *= -50
    $(this).css('background', "url('"+ skillicons  +"/skillicon" + sprite[0] + ".png') " + sprite[1] + "px " + sprite[2] + "px")
  })
}

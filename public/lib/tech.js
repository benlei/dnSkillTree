function techniques() {
  var modal = $('#modal');
  var title = $('#modal-title');
  var body = $('#modal-body');

  title.text("Techniques");
  body.empty();

  var necklace = tag('div', 'row').append(
    tag('div', 'col-xs-2', "Necklace"),
    tag('div', 'col-xs-10').append(
      tag('div', 'skill')
        .css('background', 'url(http://static.localdomain.com/images/ui/mainbar/1449036774-skillicon01_b.png) -100px -50px')
        .append(
          tag('div', 'skill-bdr g').css('background', "url('" + urls.border + "') 100px 0")
      )
    )
  )

  body.append(necklace);

  modal.modal('show');
}

function skill_icon(skillID) {

}
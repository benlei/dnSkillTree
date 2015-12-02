function techniques() {
  var modal = $('#modal');
  var title = $('#modal-title');
  var body = $('#modal-body');

  title.text("Techniques");
  body.empty();

  var necklace = tag('div', 'row').append(
    tag('div', 'col-xs-2', "Necklace"),
    tag('div', 'col-xs-10', "stuff stuff stuff")
  )

  body.append(necklace);

  modal.modal('show');
}
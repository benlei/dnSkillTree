function techniques() {
  var modal = $('#modal');
  var title = $('#modal-title');
  var body = $('#modal-body');

  title.text("Techniques");
  body.empty();

  var necklace = tag('div', 'row').append(tag('div', 'col-xs-2', 'Necklace'))
  var earring = tag('div', 'row').append(tag('div', 'col-xs-2', 'Earring'))
  var ring1 = tag('div', 'row').append(tag('div', 'col-xs-2', 'Ring 1'))
  var ring2 = tag('div', 'row').append(tag('div', 'col-xs-2', 'Ring 2'))
  var weapon = tag('div', 'row').append(tag('div', 'col-xs-2', 'Weapon'))
  var crest = tag('div', 'row').append(tag('div', 'col-xs-2', 'Crest'))
  var select;

  // necklace
  select = tag('select', 'form-control').attr('id', 'tech-necklace');
  select.append(tag('option').text('None'));
  db.Techs.Necklace.forEach(function(skillID) {
    select.append(tag('option').val(skillID).text(db.Lookup[db.Skills[skillID].NameID]));
  });
  necklace.append(tag('div', 'col-xs-10').append(
    tag('div', 'form-inline').append(
      select,
      tag('button', 'btn btn-primary', 'Tech!')
    )
  ));

  select = tag('select', 'form-control').attr('id', 'tech-earring');
  select.append(tag('option').text('None'));
  db.Techs.Earring.forEach(function(skillID) {
    select.append(tag('option').val(skillID).text(db.Lookup[db.Skills[skillID].NameID]));
  });
  earring.append(tag('div', 'col-xs-10').append(select));

  select = tag('select', 'form-control').attr('id', 'tech-ring-1');
  select.append(tag('option').text('None'));
  db.Techs.Ring.forEach(function(skillID) {
    select.append(tag('option').val(skillID).text(db.Lookup[db.Skills[skillID].NameID]));
  });
  ring1.append(tag('div', 'col-xs-10').append(select));

  select = tag('select', 'form-control').attr('id', 'tech-ring-2');
  select.append(tag('option').text('None'));
  db.Techs.Ring.forEach(function(skillID) {
    select.append(tag('option').val(skillID).text(db.Lookup[db.Skills[skillID].NameID]));
  });
  ring2.append(tag('div', 'col-xs-10').append(select));

  select = tag('select', 'form-control').attr('id', 'tech-weapon');
  select.append(tag('option').text('None'));
  db.Techs.Weapon.forEach(function(skillID) {
    select.append(tag('option').val(skillID).text(db.Lookup[db.Skills[skillID].NameID]));
  });
  weapon.append(tag('div', 'col-xs-10').append(select));

  select = tag('select', 'form-control').attr('id', 'tech-crest');
  select.append(tag('option').text('None'));
  for (var skillID in db.Skills) {
    select.append(tag('option').val(skillID).text(db.Lookup[db.Skills[skillID].NameID]));
  }
  crest.append(tag('div', 'col-xs-10').append(select));

  /*
   *
   *     tag('div', 'col-xs-2', 'Earring'),
    tag('div', 'col-xs-2', 'Ring 1'),
    tag('div', 'col-xs-2', 'Ring 2'),
    tag('div', 'col-xs-2', 'Weapon'),
    tag('div', 'col-xs-2', 'Crest')
   */

  body.append(necklace, earring, ring1, ring2, weapon, crest);
  modal.modal('show');
}

function create_skill_icon(skillID) {
/*    var lvl = Job.Cache[skillID];
    var grayed = lvl[0] == 0 ? '_b' : '';
    var sprite = Job.Sprites[skillID];
    sprite[1] *= -50;
    sprite[2] *= -50;

    this.style.background = "url('"+ urls.mainbar  +"/" + $TIMESTAMP + "-skillicon" + sprite[0] + grayed + ".png') " + sprite[1] + "px " + sprite[2] + "px"; // initial setup
    this.getElementsByClassName('skill-bdr')[0].style.background = "url('" + urls.border + "') 100px 0";
*/
}
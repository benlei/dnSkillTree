var techHTML;
function techniques() {
  var modal = $('#modal');
  var title = $('#modal-title');
  var body = $('#modal-body');

  title.text("Techniques");
  body.empty();
  if (!techHTML) {
    body.text('Loading data...');
    body.load('/api/tech/' + Job.EnglishName, function(res) {
      techHTML = res;
      tech_disable(Job.Techs);
      attach_tech_events();
    });
  } else {
    body.html(techHTML);
    tech_disable(Job.Techs);
    attach_tech_events();
  }

  modal.modal('show');
}

function attach_tech_events() {
  var ids = ['necklace', 'earring', 'ring-1', 'ring-2', 'weapon', 'crest'];
  var keys = ['Necklace', 'Earring', 'Ring1', 'Ring2', 'Weapon', 'Crest'];
  ids.forEach(function(id, i) {
    var tech = $('#tech-' + id);
    var btn = tech.next();
    var skillID = Job.Techs[keys[i]];
    if (skillID) { // already has something
      tech.val(skillID);
      btn.removeClass('btn-default').addClass('btn-danger').text('-1');
      tech.prop('disabled', true);
    }

    btn.prop('disabled', !tech.val() || !skillID);
    tech.change(function() {
      btn.removeClass('btn-default btn-primary');
      btn.addClass(tech.val() ? 'btn-primary' : 'btn-default');
      btn.prop('disabled', !tech.val());
    });

    btn.click(function() {
      var skillID = Job.Techs[keys[i]];
      btn.removeClass('btn-default btn-primary btn-danger');
      if (skillID) { // remove tech
        delete Job.Techs[keys[i]];
        btn.text('+1');
        btn.addClass('btn-primary');
      } else { // add tech
        Job.Techs[keys[i]] = num(tech.val());
        btn.text('-1');
        btn.addClass('btn-danger');
      }
      tech.prop('disabled', !skillID);
      tech_disable(Job.Techs);
    });
  });

}

function get_tech_count(techs, skillID) {
  var c = 0;
  for (var key in techs) {
    if (techs[key] == skillID) {
      c++;
    }
  }

  return c;
}

function tech_disable(techs) {
  // general disabling
  var ids = ['necklace', 'earring', 'ring-1', 'ring-2', 'weapon'];
  var keys = ['Necklace', 'Earring', 'Ring1', 'Ring2', 'Weapon'];

  $('.modal').find('option:disabled').prop('disabled', false); // re-enable for now

  for (var i = 0; i < keys.length; i++) {
    var skillID = techs[keys[i]];
    if (!skillID) {
      continue;
    }

    var remainder = [].concat(ids);
    remainder.splice(i,1); // take out self
    remainder.forEach(function(id) {
      $('#tech-' + id).find('option[value=' + skillID + ']').prop('disabled', true);
    });

    if (!techs.Crest) {
      continue;
    }

    var lvl = Job.Cache[skillID];
    var skill = db.Skills[skillID];
    var counts = get_tech_count(skillID);
    if (lvl[0] + counts > skill.MaxLevel) {
      $('#tech-crest').find('option[value=' + skillID + ']').prop('disabled', true);
    }
  }

  // crest disabling
  var skillID = techs.Crest;
  if (skillID) {
    var lvl = Job.Cache[skillID];
    var skill = db.Skills[skillID];
    var counts = get_tech_count(skillID);
    if (lvl[0] + counts > skill.MaxLevel) {
      ids.forEach(function(id) {
        $('#tech-' + id).find('option[value=' + skillID + ']').prop('disabled', true);
      });
    }
  }
}

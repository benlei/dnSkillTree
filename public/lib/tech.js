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
    });
  } else {
    body.html(techHTML);
    tech_disable(Job.Techs);
  }

  modal.modal('show');
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

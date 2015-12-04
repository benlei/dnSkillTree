var express = require('express');
var router = express.Router();

// two way search
function get_skill_max(skill, cap) {
  var max = 1;
  for (var i = skill.MaxLevel - skill.SPMaxLevel, j = 1; i > 0; i--, j++) {
    if (skill.Levels[i].LevelLimit <= cap) {
      return i;
    }

    if (skill.Levels[j].LevelLimit <= cap) {
      max = j;
    } else {
      break;
    }
  }

  return max;
}

function get_skill_tsp(skill, level) {
  if (level == 0) {
    return 0;
  }

  var total = 0;
  for (var i = 1; i <= level; i++) {
    total += skill.Levels[i].SkillPoint;
  }

  return total;
}

var buildChars = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_".split('');
module.exports = function(configs) {
  var maze = configs.maze,
      lang = configs.lang,
      jobs = configs.jobs,
      db = configs.db,
      format = configs.format;

  router.get('/:job([a-z]+)-:level([0-9]+)/:build([-_a-zA-Z0-9]{72,})', function(req, res) {
    req.params.level = parseInt(req.params.level);
    if (req.params.level < 1 || req.params.level > db.Levels.length) throw format(lang.error.level_not_found, req.params.level)
    var job = db.FinalJobs[req.params.job];
    if (!job) throw format(lang.error.job_not_found, req.params.job)
    if (req.params.build.length > 78) throw lang.error.build_too_long

    var apply_type = 0, free = true;
    if (req.cookies) {
      if (req.cookies.apply_type == 1) {
        apply_type = 1;
      }

      if (req.cookies.free !== undefined && req.cookies.free == 0) {
        free = false;
      }
    }


    var line = [jobs[jobs[job.ParentJob].ParentJob], jobs[job.ParentJob], job];
    var lvls = {};
    var build = req.params.build.split('');
    var skilltree = line.reduce(function(p, j) {
                      return p.concat(j.SkillTree.reduce(function($p, s) {
                                        return $p.concat(s);
                                      }, []));
                    }, []);

    var max_sp = db.Levels.slice(0, req.params.level).reduce(function(p,c) { return p+c }, 0)
    var job_max_sp = [parseInt(max_sp * db.SP[0]),
                      parseInt(max_sp * db.SP[1]),
                      parseInt(max_sp * db.SP[2])];

    var i,j, job_num = 0, job_sp = [0,0,0], baseskills = {}, skillgroups = {}, sprites = {};
    for (i = 0, j = 0; i < 72; i++, j++) {
      var c = build[j], id = skilltree[i];
      if (c === undefined) throw lang.error.build_path
      if (id === null) {
        if (c != '-') throw lang.error.build_path
        continue;
      }

      var $job, skill;
      if (i == 0) {
        $job = line[0];
      } else if (i == 24) {
        $job = line[1];
        job_num = 1;
      } else if (i == 48) {
        $job = line[2];
        job_num = 2;
      }

      skill = $job.Skills[id];

      var tech = 0;
      if (build[j + 1] == '!') { // single tech
        tech++, j++;
        if (build[j + 1] == '!') { // double tech
          tech++, j++;
        }
      }

      var maybePlus1 = skill.Levels[1].LevelLimit == 1 ? 1 : 0;
      var level = buildChars.indexOf(c) + maybePlus1;
      if (level + tech > skill.MaxLevel || (level == 0 && tech > 0)) throw lang.error.build_path
      var trueMax = get_skill_max(skill, req.params.level);
      if (level > trueMax) throw lang.error.build_path
      var tsp = get_skill_tsp(skill, level);
      job_sp[job_num] += tsp;
      lvls[id] = [level, trueMax, tsp, tech, skill.MaxLevel - skill.SPMaxLevel];

      if (maybePlus1 && level > 1) {
        free = true;
      } else if (!maybePlus1 && level > 0) {
        free = true;
      }

      if (skill.SkillGroup && level) {
        if (tech > 0) throw lang.error.build_path

        if (!skillgroups[skill.SkillGroup]) {
          skillgroups[skill.SkillGroup] = [];
        }

        skillgroups[skill.SkillGroup].push(id);
      }

      if (skill.BaseSkillID && level) {
        if (!baseskills[skill.BaseSkillID]) {
          baseskills[skill.BaseSkillID] = [];
        }

        baseskills[skill.BaseSkillID].push(id);
      }

      sprites[id] = [skill.Sprite, skill.IconCol, skill.IconRow, i];
    }

    if (j < build.length) throw lang.error.build_path

    // sum of sp checks
    if (job_sp[0] > job_max_sp[0] || job_sp[1] > job_max_sp[1]
                                  || job_sp[2] > job_max_sp[2]
                                  || job_sp[0] + job_sp[1] + job_sp[2] > max_sp) throw lang.error.build_path

    var data = {
      EnglishName: line[2].EnglishName,
      MaxLevel: req.params.level,
      Levels: db.Levels,
      SP: db.SP,
      TSP: job_sp,
      Names: [line[0].JobName, line[1].JobName, line[2].JobName],
      ApplyType: apply_type,
      Free: free,
      BaseSkills: baseskills,
      SkillGroups: skillgroups,
      Cache: lvls,
      Sprites: sprites,
      Techs: {}
    };

    var json_data = JSON.stringify(data);

    var json_urls  = JSON.stringify({
      mainbar: maze.fn.url.mainbar(),
      border: maze.fn.url.uitemplatetexture('uit_gesturebutton'),
      job: maze.fn.url.json(line[2].EnglishName)
    });

    var json_lang = JSON.stringify(lang['public']);

    res.render('simulator', {
      title: format(lang.job_title, job.JobName, "MAZE"),
      jobs: jobs,
      line: line,
      cap: db.Levels.length,
      fn: maze.fn,
      max_sp: max_sp,
      job_max_sp: job_max_sp,
      tree_pos: 0,
      lang: lang['public'],
      format: format,
      timestamp: maze.timestamp,
      data: data,
      json_data: json_data,
      json_lang: json_lang,
      urls: json_urls
    })
  })

  return router;
};
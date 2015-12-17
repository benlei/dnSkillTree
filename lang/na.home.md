MAZE is a DragonNest Skill Calculator/Simulator. It is the successor of DNSS, which is a derivative of YADNSS.

### Features

- **Build URL + History**: The URL bar is now the Build URL

- **Search**: Use [Regular Expressions](http://www.w3schools.com/jsref/jsref_obj_regexp.asp) to filter out skills descriptions.

- **Level Selection**: Change level caps

- **Free/Strict Mode**: Freely put SP anywhere, or be strict and abide by parent skill/job SP requirements.

  *NOTE* Changing between modes will persist throughout every build. Every shared Build URL defaults to free mode, though.

- **PvE/PvP Mode**: Show PvE or PvP description

  PvE/PvP mode is not locked into the Build URL, but by the user session. It is a user preference, not part of the build itself.

- **Interactive Keys**:

  - Left click: Increases the level of skill skill

    \+ CTRL: Maxes skill (SHIFT also works for Chrome)

  - Right click: Decreases the level of the skill

    \+ CTRL: Reduces skill to minimal level (SHIFT also works for Chrome)

  - Middle click: Locks skill description in place.

- **Techniques**: Tech your skills

  DISCLAIMER: Weapon techs do not reflect in game weapon techs. Please ensure what you choose is also available in game.

### In-Game vs. MAZE

Most of the data you see in this simulator is obtained + compiled directly from DragonNest's pak files. While trying to be as close to In-Game as possible, there are a few things which are not, usually because the data could not be found or it was more convenient to hard code the feature.

- While the numbers and skill descriptions are directly from the pak, the fields/value of fields (such as "Skill Type", "Passive", "Fire", "Instant", the "sec" from "10 sec", etc) are hard coded.
- The words "Necklace, Earring, ..., Crest" from the Technique popup are all hardcoded.
- For Weapon Techs I could not find any client sided files that specified the list of available skills that can be teched. I am under the impression it's server sided.

  If you think you have knowledge on how to properly obtain all available skill IDs for weapon techs, please post your findings in https://github.com/ben-lei/dn-maze/issues

  Your help is help to everyone who uses MAZE.


All images are obtained from and belong to Nexon.
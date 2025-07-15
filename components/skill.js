'use strict'

import helpers from "../scripts/helpers.js"

const renderSkill = (parentNode, skill, id) => {
  //Create elements
  const el = document.createElement('div');
  const level = helpers.getLevel(skill.xp);
  const skillIcon = document.createElement("div");
  const skillLevelUp = document.createElement("div");
  const skillLevelDown = document.createElement("div");

  //Add classes and ids
  el.className = "skill";
  skillIcon.className = "skill-icon";
  skillLevelUp.className = "skill-level-up";
  skillLevelDown.className = "skill-level-down";

  //Add attributes and innerHTML
  skillIcon.style.backgroundImage = `url(${skill.icon})`;
  skillLevelUp.innerHTML = level;
  skillLevelDown.innerHTML = level;

  //Add event listeners
  el.addEventListener("click", e => {
    location.assign(`./skill.html?id=${id}`)
  });

  //Build structure
  el.appendChild(skillIcon);
  el.appendChild(skillLevelUp);
  el.appendChild(skillLevelDown);

  parentNode.appendChild(el);
}

export default renderSkill;

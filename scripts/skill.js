'use strict'

import renderFooter from '../components/footer.js'
import renderQuote from '../components/quote.js'
import renderActivity from '../components/activity.js'
import helpers from '../scripts/helpers.js'

const getSkill = () => {
  const params = new URLSearchParams(document.location.search);
  const skillId = params.get("id");
  const user = JSON.parse(localStorage.getItem('lifescape'));
  const skill = user.skills[skillId];

  return skill;
}

const getProgress = (skill) => {
  const level = helpers.getLevel(skill.xp);
  let low = 0;
  let high = 0;

  for (let i = 0; i < level - 1; i++) {
    low += helpers.xpTable[i];
  }

  for (let i = 0; i < level; i++) {
    high += helpers.xpTable[i];
  }

  let max = high - low;
  let value = skill.xp - low;

  return { max, value };
}

const render = () => {
  //Create elements
  const root = document.getElementById('root');
  const card = document.getElementById('card-inner');
  const logbookButton = document.getElementById("logbook-button");
  const skillNode = document.querySelector('.skill');
  const skillIcon = document.querySelector('.skill-icon');
  const skillLevelUp = document.querySelector('.skill-level-up');
  const skillLevelDown = document.querySelector('.skill-level-down');
  const skillName = document.getElementById('skill-name');
  const skillXP = document.getElementById('skill-xp');
  const progressNode = document.getElementById('xp-progress');
  const activities = document.getElementById('activities');

  const skill = getSkill();
  const progress = getProgress(skill);
  const level = helpers.getLevel(skill.xp);

  //Add classes and ids
  skillName.id = "skill-name";

  //Add attributes and innerHTML
  skillIcon.style.backgroundImage = `url(${skill.icon})`;
  skillLevelUp.innerHTML = level;
  skillLevelDown.innerHTML = level;
  skillName.innerHTML = skill.name;
  skillXP.innerHTML = "Total XP: " + skill.xp;
  progressNode.max = progress.max;
  progressNode.value = progress.value;

  //Add event listeners
  logbookButton.addEventListener('click', e => {
    e.preventDefault();

    const params = new URLSearchParams(document.location.search);
    const skillId = params.get("id");
    location.assign(`./log.html?id=${skillId}`)
  });

  //Build structure
  for (let i = 0; i < skill.activities.length; i++) {
    renderActivity(card, skill.activities[i]);
  }
  renderQuote(root);
  renderFooter(root);
}

render();

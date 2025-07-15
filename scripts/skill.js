'use strict'

import renderScale from '../components/scale.js'
import renderQuote from '../components/quote.js'
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

const logActivity = (name, xp) => {
  const params = new URLSearchParams(document.location.search);
  const skillId = params.get("id");
  const user = helpers.getLocalStorage();
  const date = new Date();
  const dateParsed = date.toISOString();

  const log = {
    activity: name,
    xp: xp,
    date: dateParsed
  }

  user.skills[skillId].log.unshift(log);
  user.skills[skillId].xp += parseInt(xp);

  helpers.setLocalStorage(user);
  location.assign(`./skill.html?id=${skillId}`)
}

const createActivityXP = (activity) => {
  let activityXP;

  if (activity.type == "One-Time") {
    activityXP = document.createElement('p');
    activityXP.innerHTML = activity.xp;
  }
  else {
    activityXP = document.createElement('input');
    activityXP.type = "number";
    activityXP.placeholder = "Time in minutes";
    activityXP.name = "xp";
  }

  return activityXP;
}

const renderActivity = (activity) => {
  //Create elements
  const card = document.getElementById("card-inner");
  const logbookButton = document.getElementById("logbook-button");
  const activityNode = document.createElement('div');
  const activityName = document.createElement('p');
  const activityXP = createActivityXP(activity);
  const activitySubmit = document.createElement('input');

  //Add classes and ids
  activityNode.className = "activity-node";

  //Add attributes and innerHTML
  activityName.innerHTML = activity.name;
  activitySubmit.type = "submit";
  activitySubmit.value = "Log activity";
  
  //Add event listeners
  activitySubmit.addEventListener('click', e => {
    e.preventDefault();

    if (activity.type == "One-Time") {
      logActivity(activity.name, activityXP.innerHTML);
    }
    else {
      logActivity(activity.name, activityXP.value);
    }
  })

  logbookButton.addEventListener('click', e => {
    e.preventDefault();

    const params = new URLSearchParams(document.location.search);
    const skillId = params.get("id");
    location.assign(`./log.html?id=${skillId}`)
  })
  
  //Build structure
  activityNode.appendChild(activityName);
  activityNode.appendChild(activityXP);
  activityNode.appendChild(activitySubmit);
  card.appendChild(activityNode);
}

const render = () => {
  //Create elements
  const root = document.getElementById('root');
  const skillNode = document.querySelector('.skill');
  const skillIcon = document.querySelector('.skill-icon');
  const skillLevelUp = document.querySelector('.skill-level-up');
  const skillLevelDown = document.querySelector('.skill-level-down');
  const skillName = document.getElementById('skill-name');
  const skillXP = document.getElementById('skill-xp');
  const progressNode = document.getElementById('xp-progress');
  const activities = document.getElementById('activites');

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

  //Build structure
  for (let i = 0; i < skill.activities.length; i++) {
    renderActivity(skill.activities[i]);
  }
  renderQuote(root);
  renderScale(root);
}

render();

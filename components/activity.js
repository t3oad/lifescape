'use strict'

import helpers from '../scripts/helpers.js'

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

const logActivity = (name, xp) => {
  const params = new URLSearchParams(document.location.search);
  const skillId = params.get("id");
  const user = helpers.getLocalStorage();
  const date = new Date();
  const dateParsed = date.toISOString();
  const xpParsed = parseInt(xp);
  const skill = user.skills[skillId];

  if (!xpParsed) throw new Error("Please enter a number.");

  const log = {
    activity: name,
    xp: xp,
    date: dateParsed
  }

  const oldLevel = helpers.getLevel(skill.xp);
  skill.log.unshift(log);
  skill.xp += parseInt(xp);
  const newLevel = helpers.getLevel(skill.xp);
  helpers.setLocalStorage(user);

  if (newLevel > oldLevel) {
    alert(`Congratulations!\n\nYour ${skill.name} level is now ${newLevel}.`);
  }

  location.assign(`./skill.html?id=${skillId}`)
}

const renderActivity = (parentNode, activity) => {
    //Create elements
    const el = document.createElement('div');
    const activityName = document.createElement('p');
    const activityXP = createActivityXP(activity);
    const activitySubmit = document.createElement('input');

    //Add classes and ids
    el.className = "activity-node";

    //Add attributes and innerHTML
    activityName.innerHTML = activity.name;
    activitySubmit.type = "submit";
    activitySubmit.value = "Log activity";
    
    //Add event listeners
    activitySubmit.addEventListener('click', e => {
      try {
        e.preventDefault();

        if (activity.type == "One-Time") {
          logActivity(activity.name, activityXP.innerHTML);
        }
        else {
          logActivity(activity.name, activityXP.value);
        }
      }
      catch (err) {
        alert(err);
      }
    })

    //Build structure
    el.appendChild(activityName);
    el.appendChild(activityXP);
    el.appendChild(activitySubmit);
    parentNode.appendChild(el);
}

export default renderActivity;

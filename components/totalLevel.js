'use strict'

import helpers from '../scripts/helpers.js'

const getTotalLevel = () => {
  let totalLevel = 0;
  const user = helpers.getLocalStorage()

  for (let i = 0; i < user.skills.length; i++) {
    const level = helpers.getLevel(user.skills[i].xp);
    totalLevel += level;
  }

  return totalLevel;
}

const renderTotalLevel = (parentNode) => {
  //Create Elements
  const el = document.createElement('div');

  //Add classes and ids
  el.id = "total-level";

  //Add attributes and innerHTML
  el.innerHTML = "Total Level: \n" + getTotalLevel();

  //Add event listeners

  //Build structure
  parentNode.appendChild(el);
}

export default renderTotalLevel;

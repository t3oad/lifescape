'use strict'

import renderNewSkillButton from '../components/newSkillButton.js'
import renderSkill from '../components/skill.js'
import renderTotalLevel from '../components/totalLevel.js'
import renderScale from '../components/scale.js'
import renderQuote from '../components/quote.js'
import helpers from '../scripts/helpers.js'

const populateSkills = (user) => {
  const skillGrid = document.getElementById('skill-grid');

  for (let i = 0; i < user.skills.length; i++) {
    renderSkill(skillGrid, user.skills[i], i)
  }

  if (user.skills.length < 24) {
    renderNewSkillButton(skillGrid);
  }

  renderTotalLevel(skillGrid);
}

const render = () => {
  const root = document.getElementById('root');
  const user = helpers.getLocalStorage();

  populateSkills(user);
  renderQuote(root);
  renderScale(root);
}

render();

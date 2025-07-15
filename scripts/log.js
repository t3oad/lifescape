'use strict'

import renderScale from '../components/scale.js'
import renderQuote from '../components/quote.js'
import helpers from '../scripts/helpers.js'

const getLog = () => {
  const params = new URLSearchParams(document.location.search);
  const skillId = params.get('id');
  const user = helpers.getLocalStorage();
  const log = user.skills[skillId].log;

  return log;
}

const render = () => {
  const root = document.getElementById('root');
  const card = document.getElementById('card-inner');
  const title = document.getElementById('log-title');
  const log = getLog();

  for (let i = 0; i < log.length; i++) {
    const entry = document.createElement('p');
    entry.innerHTML = `${log[i].activity} | ${log[i].xp}xp | ${log[i].date}`
    card.appendChild(entry);
  }

  title.innerHTML = "LOG";
  renderQuote(root);
  renderScale(root);
}

render();

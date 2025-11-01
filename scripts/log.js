'use strict'

import renderFooter from '../components/footer.js'
import renderQuote from '../components/quote.js'
import helpers from '../scripts/helpers.js'

const getLog = () => {
  const params = new URLSearchParams(document.location.search);
  const skillId = params.get('id');
  const user = helpers.getLocalStorage();
  const log = user.skills[skillId].log;

  return log;
}

const parseDate = (date) => {
  let d = new Date(date);
  const parsed = d.toUTCString();

  return parsed;
}

const render = () => {
  const root = document.getElementById('root');
  const card = document.getElementById('card-inner');
  const title = document.getElementById('log-title');
  const log = getLog();

  for (let i = 0; i < log.length; i++) {
    const entry = document.createElement('p');
    const date = parseDate(log[i].date);

    entry.className = "logbook-entry";
    entry.innerHTML = `${date}</br>${log[i].activity} - ${log[i].xp}xp`

    card.appendChild(entry);
  }

  title.innerHTML = "LOG";
  renderQuote(root);
  renderFooter(root);
}

render();

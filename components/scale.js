'use strict'

import helpers from '../scripts/helpers.js'

const renderScale = (parentNode) => {
  //Create elements
  const el = document.createElement('div');
  const localStorage = helpers.getLocalStorage();
  const root = document.querySelector(':root');
  const scale1 = document.createElement('button');
  const scale15 = document.createElement('button');
  const scale2 = document.createElement('button');

  //Add classes and ids
  el.id = "scale-wrapper";

  //Add attributes and innerHTML
  scale1.innerHTML = "1x"
  scale15.innerHTML = "1.5x"
  scale2.innerHTML = "2x"

  //Add event listeners
  scale1.addEventListener('click', e => {
    root.style.setProperty('--scale', 1);

    localStorage.scale = 1;
    helpers.setLocalStorage(localStorage);
  });
  scale15.addEventListener('click', e => {
    root.style.setProperty('--scale', 1.5);

    localStorage.scale = 1.5;
    helpers.setLocalStorage(localStorage);
  });
  scale2.addEventListener('click', e => {
    root.style.setProperty('--scale', 2);

    localStorage.scale = 2;
    helpers.setLocalStorage(localStorage);
  });

  //Build structure
  el.appendChild(scale1);
  el.appendChild(scale15);
  el.appendChild(scale2);
  parentNode.appendChild(el);
}

export default renderScale;

'use strict'

const setScale = (user) => {
  const root = document.querySelector(':root');
  root.style.setProperty('--scale', user.scale);
}

const initLocalStorage = () => {
  if (!localStorage.getItem('lifescape')) {
    localStorage.setItem('lifescape', JSON.stringify({
      skills: [],
      scale: 1
    }));
  } 

  return JSON.parse(localStorage.getItem('lifescape'));
}

const init = () => {
  const user = initLocalStorage();
  setScale(user);
}

init();

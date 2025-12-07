'use strict'

const setScale = (user) => {
  const root = document.querySelector(':root');
  root.style.setProperty('--scale', user.scale);
}

const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem("lifescape"));
}

const init = () => {
  const user =  getLocalStorage();
  if (user) setScale(user);
}

init();

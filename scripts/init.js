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

const setPersistentStorage = () => {
  if (navigator.storage && navigator.storage.persist) {
    navigator.storage.persist().then((persistent) => {
      if (persistent) {
        alert("persistent")
      }
      else {
        alert("not persistent")
      }
    });
  }
  else {
    alert(navigator.storage)
  }
}

const init = () => {
  const user = initLocalStorage();
  setPersistentStorage();
  setScale(user);
}

init();

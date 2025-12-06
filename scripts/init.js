'use strict'

const setScale = (user) => {
  const root = document.querySelector(':root');
  root.style.setProperty('--scale', user.scale);
}

//const initLocalStorage = () => {
//  if (!localStorage.getItem('lifescape')) {
//    localStorage.setItem('lifescape', JSON.stringify({
//      skills: [],
//      scale: 1
//    }));
//  } 
//
//  return JSON.parse(localStorage.getItem('lifescape'));
//}
//
//const setPersistentStorage = () => {
//  if (navigator.storage && navigator.storage.persist) {
//    navigator.storage.persist().then((persistent) => {
//      if (persistent) {
//        alert("persistent")
//      }
//      else {
//        alert("not persistent")
//      }
//    });
//  }
//  else {
//    alert(navigator.storage)
//  }
//}
//

const initLocalStorage = async () => {
  try {
    if (!localStorage.getItem('lifescape')) {
      const response = await fetch("http://localhost:3000/new", {
        method: "POST"
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      if (result.type == "error") throw new Error(result.message);

      localStorage.setItem('lifescape', result.data);
      return JSON.parse(result.data);
    } 
    else {
      const data = JSON.parse(localStorage.getItem('lifescape'));
      const response = await fetch(`http://localhost:3000/uuid/${data.uuid}`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      if (result.type == "error") throw new Error(result.message);

      localStorage.setItem('lifescape', result.data);
      return JSON.parse(result.data);
    }
  }
  catch (err) {
    console.error(err);
  }
}

const init = async () => {
  try {
    const user = await initLocalStorage();
    setScale(user);
  }
  catch (err) {
    console.error(err);
  }
}

init();

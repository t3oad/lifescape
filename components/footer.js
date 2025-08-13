'use strict'

import helpers from '../scripts/helpers.js'

const renderFooter = (parentNode) => {
  //Create elements
  const el = document.createElement('div');
  const localStorage = helpers.getLocalStorage();
  const root = document.querySelector(':root');
  const scale1 = document.createElement('button');
  const scale15 = document.createElement('button');
  const scale2 = document.createElement('button');
  const importUser = document.createElement('button');
  const importUserFile = document.createElement('input');
  const exportUser = document.createElement('button');
  const resetUser = document.createElement('button');
  const login = document.createElement('button');

  //Add classes and ids
  el.id = "footer-wrapper";
  importUserFile.id = "import-user-file";

  //Add attributes and innerHTML
  importUserFile.type = "file";
  scale1.innerHTML = "1x"
  scale15.innerHTML = "1.5x"
  scale2.innerHTML = "2x"
  importUser.innerHTML = "import"
  importUser.style.marginLeft = "5px";
  exportUser.innerHTML = "export"
  resetUser.innerHTML = "reset"
  login.innerHTML = "login";
  login.style.marginLeft = "5px";

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

  importUser.addEventListener('click', e => {
    importUserFile.click();
  });
  importUserFile.addEventListener('change', e => {
    if (e.target.files[0]) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        const user = JSON.parse(reader.result);
        helpers.setLocalStorage(user);
        location.assign(`./index.html`);
      })
      reader.readAsText(e.target.files[0]);
    }
  });
  exportUser.addEventListener('click', e => {
    const user = helpers.getLocalStorage();

    helpers.saveTemplateAsFile('lifescape.json', user);
  });
  resetUser.addEventListener('click', e => {
    if (confirm("Are you sure you want to reset your data?")) {
      helpers.deleteLocalStorage();
      location.assign(`./index.html`);
    }
  });

  //Build structure
  el.appendChild(scale1);
  el.appendChild(scale15);
  el.appendChild(scale2);
  el.appendChild(importUser);
  el.appendChild(exportUser);
  el.appendChild(resetUser);
  el.appendChild(login);
  parentNode.appendChild(el);
}

export default renderFooter;

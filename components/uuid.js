'use strict'

import helpers from '../scripts/helpers.js'

const renderUUID = (parentNode) => {
  //Create elements
  const el = document.createElement('details');
  const localStorage = helpers.getLocalStorage();

  const summary = document.createElement('summary');
  const UUID = document.createElement('p');
  const form = document.createElement('form');
  const inputUUID = document.createElement('input');
  const submit = document.createElement('input');

  //Add classes and ids
  el.id = "uuid";
  inputUUID.id = "uuid-input";
  form.id = "uuid-form";

  //Add attributes and innerHTML
  summary.innerHTML = "Click to display your UUID"
  UUID.innerHTML = localStorage.uuid;
  inputUUID.type = "text"
  inputUUID.name = "input-uuid";
  inputUUID.placeholder = "UUID you would like to change to";
  submit.type = "submit";
  submit.value = "Submit";

  //Add event listeners
  submit.addEventListener('click', e => {
    e.preventDefault();

    const uuid = inputUUID.value;

    helpers.setLocalUUID(uuid);
    location.assign(`./index.html`);
  })

  //Build structure
  el.appendChild(summary);
  el.appendChild(UUID);
  el.appendChild(form);
  form.appendChild(inputUUID);
  form.appendChild(submit);
  parentNode.appendChild(el);
}

export default renderUUID;

'use strict'

const renderActivity = (parentNode) => {
  //Create elements
  const el = document.createElement('div');
  const name = document.createElement('input');
  const xp = document.createElement('input');
  const type = document.createElement('select');
  const remove = document.createElement('button');

  //Add classes and ids
  el.className = "new-activity";
  name.className = "new-activity-name";
  xp.className = "new-activity-xp";
  type.className = "new-activity-type";
  remove.className = "new-activity-remove";

  //Add attributes and innerHTML
  name.type = "text"
  name.name = "activity-name";
  name.placeholder = "Activity name";
  xp.type = "text"
  xp.name = "activity-xp";
  xp.placeholder = "XP";
  xp.disabled = true;
  type.appendChild(new Option('Timed', 'Timed'));
  type.appendChild(new Option('One-Time', 'One-Time'));
  type.name = "activity-type";
  remove.innerHTML = "x";

  //Add event listeners
  remove.addEventListener('click', e => {
    el.remove();
  });

  type.addEventListener('change', e => {
    if (e.target.value == "Timed") xp.disabled = true;
    else xp.disabled = false;
  });

  //Build structure
  el.appendChild(name);
  el.appendChild(xp);
  el.appendChild(type);
  el.appendChild(remove);
  parentNode.appendChild(el);
}

export default renderActivity;

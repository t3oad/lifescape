'use strict'

const renderEditActivity = (parentNode, activity) => {
  //Create elements
  const el = document.createElement('div');
  const name = document.createElement('input');
  const xp = document.createElement('input');
  const type = document.createElement('select');
  const remove = document.createElement('button');

  //Add classes and ids
  el.className = "edit-activity";
  name.className = "edit-activity-name";
  xp.className = "edit-activity-xp";
  type.className = "edit-activity-type";
  remove.className = "edit-activity-remove";

  //Add attributes and innerHTML
  name.type = "text"
  name.name = "activity-name";
  name.placeholder = "Activity name";
  name.value = activity.name;
  xp.type = "text"
  xp.name = "activity-xp";
  xp.placeholder = "XP";
  xp.disabled = activity.type == "Timed" ? true : false;
  xp.value = activity.type == "Timed" ? null : activity.xp;
  type.appendChild(new Option('Timed', 'Timed'));
  type.appendChild(new Option('One-Time', 'One-Time'));
  type.name = "activity-type";
  type.value = activity.type;
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

export default renderEditActivity;

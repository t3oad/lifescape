import renderScale from '../components/scale.js'
import renderQuote from '../components/quote.js'
import helpers from '../scripts/helpers.js'

const parseIcon = (icon) => {
  return new Promise((resolve, reject) => {
    if (/\.(?:jpe?g|png|gif)$/i.test(icon.name)) {
      const reader = new FileReader();
      reader.readAsDataURL(icon);

      reader.addEventListener("load", () => {
        resolve(reader.result);
      })
    }
    else {
      reject("Failed to parse icon.");
    }
  });
}

const parseForm = async (form) => {
  try {
    const formData = new FormData(form);

    let icon;
    let skillName;
    let activities = [];
    const skill = {}

    let activityNames = [];
    let activityTypes = [];
    let activityXP = [];

    for (const [ key, value ] of formData.entries()) {
      if (key == "icon") icon = value;
      else if (key == "name") skillName = value;
      else if (key == "activity-name") activityNames.push(value);
      else if (key == "activity-type") activityTypes.push(value);
      else if (key == "activity-xp") activityXP.push(value);
    }

    let activityXPCounter = 0;
    for (let i = 0; i < activityNames.length; i++) {
      const activity = {
        name: activityNames[i],
        type: activityTypes[i],
        xp: activityXP[i],
      }

      if (activity.type == "One-Time") {
        activity.xp = activityXP[activityXPCounter];
        activityXPCounter++;
      }

      activities.push(activity);
    }

    const parsedIcon = await parseIcon(icon);
    skill.icon = parsedIcon;
    skill.name = skillName;
    skill.activities = activities;
    skill.xp = 0;
    skill.log = [];

    return skill;
  }
  catch (err) {
    console.error(err);
  }
}

const renderActivity = () => {
  //Create elements
  const form = document.getElementById('new-skill-form');
  const wrapper = document.createElement('div');
  const name = document.createElement('input');
  const xp = document.createElement('input');
  const type = document.createElement('select');
  const remove = document.createElement('button');

  //Add classes and ids
  wrapper.className = "new-activity";
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
    wrapper.remove();
  });

  type.addEventListener('change', e => {
    if (e.target.value == "Timed") xp.disabled = true;
    else xp.disabled = false;
  });

  //Build structure
  wrapper.appendChild(name);
  wrapper.appendChild(xp);
  wrapper.appendChild(type);
  wrapper.appendChild(remove);
  form.appendChild(wrapper);
}

const render = () => {
  //Create elements
  const root = document.getElementById('root');
  const form = document.getElementById('new-skill-form');
  const addIconButton = document.getElementById('add-icon-button');
  const addActivityButton = document.getElementById('add-activity-button');
  const submit = document.createElement('input');

  //Add classes and ids

  //Add attributes and innerHTML
  submit.type = "submit";
  submit.value= "Submit";

  //Add listeners
  addIconButton.addEventListener('change', e => {
    if (e.target.files[0]) {
      const newIconPreview = document.getElementById('new-icon-preview');
      newIconPreview.style.backgroundImage = `url(${URL.createObjectURL(e.target.files[0])})`;
    }
  });

  addActivityButton.addEventListener('click', e => {
    renderActivity();
  });

  submit.addEventListener('click', async e => {
    try {
      e.preventDefault();

      const user = helpers.getLocalStorage();
      const skill = await parseForm(form);

      user.skills.push(skill);
      helpers.setLocalStorage(user);
      location.assign(`./index.html`);
    }
    catch (err) {
      console.error(err)
    }
  })

  //Build structure
  form.appendChild(submit);
  renderQuote(root);
  renderScale(root);
}

render();

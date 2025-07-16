import renderFooter from '../components/footer.js'
import renderQuote from '../components/quote.js'
import helpers from '../scripts/helpers.js'

let iconURI; //Keep a copy of the icon URI for upload

const parseForm = async (form) => {
  try {
    const formData = new FormData(form);

    let skillName;
    let activities = [];
    const skill = {}

    let activityNames = [];
    let activityTypes = [];
    let activityXP = [];

    for (const [ key, value ] of formData.entries()) {
      if (key == "name") skillName = value;
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

    skill.icon = iconURI;
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

  //Code from: https://img.ly/blog/how-to-resize-an-image-with-javascript/
  addIconButton.addEventListener('change', async e => {
    const [file] = addIconButton.files;
    const imageToResize = document.createElement('img');
    const newIconPreview = document.getElementById('new-icon-preview');

    imageToResize.src = await helpers.fileToDataURI(file);
    imageToResize.addEventListener('load', () => {
      const url = helpers.resizeImage(imageToResize);

      iconURI = url;
      newIconPreview.style.backgroundImage = `url(${url})`;
    });
  });


  //Build structure
  form.appendChild(submit);
  renderQuote(root);
  renderFooter(root);
}

render();

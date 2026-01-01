import renderFooter from '../components/footer.js'
import renderQuote from '../components/quote.js'
import renderUUID from '../components/uuid.js'
import renderNewActivity from '../components/newActivity.js'
import renderEditActivity from '../components/editActivity.js'
import helpers from '../scripts/helpers.js'

let iconURI; //Keep a copy of the icon URI for upload

const validateInput = (skill) => {
  //Validate skill
  if (!skill.icon || !iconURI) throw new Error("Please upload an icon.");
  if (!skill.name || skill.name.length == 0) throw new Error("Please include skill name.");

  //Validate activities
  for (let i = 0; i < skill.activities.length; i++) {
    const activity = skill.activities[i];

    if (!activity.name || activity.name.length == 0) throw new Error("Please include activity name.");
    if (!activity.type) throw new Error("Please select an activity type.");

    if (activity.type == "Timed") continue;
    else if (activity.type == "One-Time" && !activity.xp) throw new Error("One-Time activities require an XP value.");
    else if (activity.type == "One-Time" && activity.xp) continue;
    else throw new Error("Unrecognized activity type.");
  }

  return true;
}

const parseForm = async (form) => {
  try {
    const original = helpers.getSkill();
    const formData = new FormData(form);
    let skillName;
    const activities = [];
    const skill = {}

    //Parse activities
    const activityNames = [];
    const activityTypes = [];
    const activityXP = [];

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
      }

      if (activity.type == "One-Time") {
        activity.xp = parseInt(activityXP[activityXPCounter]);
        if (!activity.xp) throw new Error("The XP value must be a number.");

        activityXPCounter++;
      }

      activities.push(activity);
    }

    //Build skill object
    skill.icon = iconURI;
    skill.name = skillName;
    skill.activities = activities;
    skill.xp = original.xp;
    skill.log = original.log;

    if (validateInput(skill)) return skill;
  }
  catch (err) {
    throw err;
  }
}

const populateCard = (form) => {
  const skill = helpers.getSkill();

  const iconPreview = document.getElementById('edit-icon-preview');
  const skillName = document.getElementById('edit-skill-name');
  const skillLevelUp = document.querySelector('.skill-level-up');
  const skillLevelDown = document.querySelector('.skill-level-down');
  const skillLevel = helpers.getLevel(skill.xp);

  iconPreview.style.backgroundImage = `url(${skill.icon})`;
  iconURI = skill.icon;
  skillName.value = skill.name;
  skillLevelUp.innerHTML = skillLevel;
  skillLevelDown.innerHTML = skillLevel;

  for (let i = 0; i < skill.activities.length; i++) {
    renderEditActivity(form, skill.activities[i]);
  }
}

const render = () => {
  //Create elements
  const root = document.getElementById('root');
  const form = document.getElementById('edit-skill-form');
  const addIconButton = document.getElementById('add-icon-button');
  const addActivityButton = document.getElementById('add-activity-button');
  const submit = document.createElement('input');

  //Add classes and ids

  //Add attributes and innerHTML
  submit.type = "submit";
  submit.value= "Submit";

  //Add listeners
  addActivityButton.addEventListener('click', e => {
    renderNewActivity(form);
  });

  submit.addEventListener('click', async e => {
    try {
      e.preventDefault();

      const user = helpers.getLocalStorage();
      const params = new URLSearchParams(document.location.search);
      const skillId = params.get("id");
      const skill = await parseForm(form);

      user.skills[skillId] = skill;
      await helpers.setStorage(user);
      location.assign(`./index.html`);
    }
    catch (err) {
      alert(err);
    }
  })

  //Code from: https://img.ly/blog/how-to-resize-an-image-with-javascript/
  addIconButton.addEventListener('change', async e => {
    const [file] = addIconButton.files;
    const imageToResize = document.createElement('img');
    const editIconPreview = document.getElementById('edit-icon-preview');

    imageToResize.src = await helpers.fileToDataURI(file);
    imageToResize.addEventListener('load', () => {
      const url = helpers.resizeImage(imageToResize);

      iconURI = url;
      editIconPreview.style.backgroundImage = `url(${url})`;
    });
  });


  //Build structure
  form.appendChild(submit);
  populateCard(form);
  renderQuote(root);
  renderUUID(root);
  renderFooter(root);
}

render();

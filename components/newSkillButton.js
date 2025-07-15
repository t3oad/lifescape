'use strict'

const renderNewSkillButton = (parentNode) => {
  //Create Elements
  const el = document.createElement('div');

  //Add classes and ids
  el.id = "new-skill-button";

  //Add attributes and innerHTML

  //Add event listeners
  el.addEventListener("click", e => {
    location.assign("./new.html")
  });

  //Build structure
  parentNode.appendChild(el);
}

export default renderNewSkillButton;

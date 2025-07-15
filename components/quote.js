'use strict'

const generateQuote = () => {
  const quoteList = [
    `"Hustle until your haters ask if you're hiring." - Unknown`,
    `"Hustle beats talent when talent doesn't hustle." - Unknown`,
    `"Grind now, shine later." - Unknown`,
    `"The dream is free, but the hustle is sold separately." - Unknown`,
    `"When you feel like quitting, think about why you started." - Unknown`,
    `"Work hard in silence, let your success be your noise." - Frank Ocean`,
    `"Success is not owned, it's rented. And the rent is due every day." - JJ Watt`,
    `"Believe you can and you're halfway there." - Theodore Roosevelt`,
    `"Success is not a destination; it's a journey. The moment you stop trying to achieve more, you become less than you are." - Unknown`,
  ]
  const randomNumber = Math.floor(Math.random() * quoteList.length);

  return quoteList[randomNumber];
}

const renderQuote = (parentNode) => {
  //Create elements
  const el = document.getElementById('quote');

  //Add classes and ids

  //Add attributes and innerHTML
  el.innerHTML = generateQuote();

  //Add event listeners
  //Build structure
}

export default renderQuote;

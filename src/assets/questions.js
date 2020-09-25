/**
 *  Questions and answers
 * 
 */
let questions = [
  {
    text: `The only alphabetical character not in the periodic table is the letter 'J'`,
    correct: true
  },
  {
    text: `A bunch of bananas is called a 'hand', with individual bananas called 'fingers'`,
    correct: true
  },
  {
    text: `The collective noun for a group of crows is called a 'murder' or a 'parliament'`,
    correct: true
  },
  {
    text: `The collective noun for a group of geese is called an 'navy'`,
    correct: false
  },
  {
    text: `The original GoldenEye N64 game was made with less than 10 developers`,
    correct: true
  },
  {
    text: `James Bond was not originally Scottish, but Ian Fleming changed Bond's backstory because he was so impressed with Sean Connery's portrayal in film`,
    correct: true
  },
  {
    text: `Cow-tipping was a common past time in rural America in the 19th century`,
    correct: false
  },
  {
    text: `Salted water boils quicker`,
    correct: false
  },
  {
    text: `Most body heat for human adults is lost through the head`,
    correct: false
  },
  {
    text: `Bananas do not grow on trees, but are actually massive tree-like herbs`,
    correct: true
  },
  {
    text: `SOS is morse code for for Save Our Souls`,
    correct: false
  }
];

/**
 *  Export randomQuestion closure function
 * 
 */
export default function randomQuestion(){
  let random = q => q[Math.floor(Math.random() * q.length)];

  return random(questions);
}

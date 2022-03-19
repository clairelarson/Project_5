document.addEventListener('DOMContentLoaded', () => {

//variables and storing document elements
  const qwerty = document.querySelector('#qwerty');
  const startButton = document.querySelector('.btn__reset');
  const overlay = document.querySelector('#overlay');
  const title = document.querySelector('.title');
  const buttons = document.querySelectorAll("#qwerty button")
  const phrases = [
    'bad apple',
    'at first glance',
    'available now',
    'making matters worse',
    'on the go',
    'raise the roof'
  ];
  let score = 0;
  let tries = document.querySelectorAll(".tries")

  // Start the game

  startButton.addEventListener ('click', () => {
     overlay.style.display = 'none';
  });

// get random phrase from an array and store it in @phraseArray

  function getRandomPhraseAsArray(array) {
    const i = Math.floor(Math.random() * phrases.length);
    return array[i].split('');
    }
  const phraseArray = getRandomPhraseAsArray(phrases);

// set display

  function addPhraseToDisplay(array) {
    for (let i=0; i<array.length; i++) {
      const string = array[i];
      const ul = document.querySelector('#phrase');
      const li = document.createElement('li');
      li.textContent = string;
      ul.append(li);
      if (string === ' ') {
        li.className = 'space';
      } else {
        li.className = 'letter';
      }
    }
  }
  addPhraseToDisplay(phraseArray);

// check if letter is part of the array phrase

  function checkLetter(button) {
    const letter = document.querySelectorAll('.letter');
    const selectedLetter = button.textContent;
    let correct = null;
    for (let i=0; i<letter.length; i++) {
      const item = letter[i];
      const correctLetter = item.textContent;
      if (selectedLetter === correctLetter) {
        item.classList.add('show');
        correct = selectedLetter;
      }
    }
    return correct;
  }

// keeps track of what letters the player clicks and the score
  qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const playerButton = e.target;
        playerButton.className = 'chosen';
        playerButton.disabled = true;
        const letterFound = checkLetter(playerButton);

          if (letterFound === null) {
           score++;
           const hearts = document.querySelector('img[src="images/liveHeart.png"]');
           hearts.src = 'images/lostHeart.png';
          }
      }
      checkWin();
    });

  // checkWin function controls app behavior for when a player wins or loses the game

  function checkWin() {
    const shown = document.querySelectorAll('.show');
    const letter = document.querySelectorAll('.letter');

// clicking this button restarts the game
    function restartButton(text) {
      startButton.textContent = text;

      startButton.addEventListener('click', (e)=> {
        overlay.style.display = 'none';
        score = 0;
        phrase.innerHTML = '';
        let newPhrase = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(newPhrase);

        for (let heart of tries) {
          heart.innerHTML = `<img src="images/liveHeart.png" width="30px" height="35px" />`
        }
        for (let button of buttons) {
          button.className = ""
          button.disabled = false
        }
      });
    }

    // set overlay for win or loss
    if (shown.length === letter.length) {
      overlay.style.display = '';
      title.textContent = 'Congratulations, you won!';
      restartButton('Play Again');

    } else if (score >= 5) {
      overlay.style.display = '';
      title.textContent = 'Sorry, try again!';
      restartButton('Try Again');
    }
  };

});

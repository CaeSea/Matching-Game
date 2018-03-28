// Function to create html for shuffled cards.
function createCardLayout(shuffledCards) {
  let html = "";
  let symbol = "";
  for (i = 0; i < shuffledCards.length; i++) {
    symbol = shuffledCards[i].substring(0, shuffledCards[i].length - 1);
    html += '<div class="card-container"><div class="card" id="'+symbol+'"><li class="front"></li><li class="back"><i class="fa fa-'+symbol+' symbol"></i></li></div></div>';
  }
  return html;
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
// Flips each card on click.
function displaySymbol() {

  // Remove the reset card class.
  if (this.classList.contains('reset-card')) {
     this.classList.remove('reset-card');  // If the card has been unflipped before the we must remove that class.
   }

  flippedCards.push(this); // Add the div to flippedCards array
  openCards.push(this.id); // Adds card id to openCards array.

  if (flippedCards.length === 1) {
    this.classList.add('flip-card');
    this.style.pointerEvents = "none";
  }

  if (openCards.length == 2) { // If 2 Cards have been flipped.
    // Cards have been matched.
    this.classList.add('flip-card');
    moveRating();
    checkMatch();
    if(!timerStarted) {
      gameTimer();
    }
 }
}
// Checks if cards match on each flip.
function checkMatch() {
  if (openCards[0] === openCards[1]) { // if the cards match.

    flippedCards[0].classList.add('no-events');
    flippedCards[1].classList.add('no-events');
    cardsMatch();

  } else { // If the cards don't match

    //disableCards - A way to disable all cards until code below is run.
    disableCards();

    cardsDontMatch();
 }
}
// Adds the matched cards to a matched cards array.
function cardsMatch() {
  /*
  Copy the flippedCards array to the matchedCards Array if matchedCards is empty
  else push the flippedCards array to the end of the matchedCards.
  */
  if (matchedCards.length == 0) {
    matchedCards = flippedCards.splice(0);
  } else {
    matchedCards.push(...flippedCards);
  }
  finishGame();
  // Empty the flippedCards array.
  flippedCards = [];
  // Empty the openCards array.
  openCards = [];
  console.log(matchedCards);
}
// Turns all unmatched cards back over.
function cardsDontMatch() {
  // Flip the 2nd clicked card.
  flippedCards[1].classList.add('flip-card');

  if (!matchedCards.includes(this)) { // If the cards have not yet been matched.
    setTimeout(function(){
      flippedCards[0].classList.remove('flip-card');
      flippedCards[0].classList.add('reset-card');
      flippedCards[1].classList.remove('flip-card');
      flippedCards[1].classList.add('reset-card');
      // enable the cards again.
      enableCards();
      // Empty the flippedCards array.
      flippedCards = [];
    }, 800);
  }
  // Empty the openCards array.
  openCards = [];
}
// Disables the clicking of cards whilst 2 have already been picked.
function disableCards() {
  //let cardsToDisable = document.querySelectorAll('.card');
  for(let clickedCard of clickedCards) {
    clickedCard.style.pointerEvents = "none";
  }
}
// Re-enables clicking of cards.
function enableCards() {
  //let cardsToDisable = document.querySelectorAll('.card');
  for(let clickedCard of clickedCards) {
    clickedCard.style.removeProperty('pointer-events');
  }
}
// Counts the number of moves and takes away stars based on number of moves.
function moveRating() {
  const starsHolder = document.querySelector('.stars');
  let stars = starsHolder.children;
  const moveCounter = document.querySelector('.moves');
  moveCount++;
  moveCounter.innerHTML = moveCount + " Move(s)";
  if (moveCount === 9) {
    starsHolder.removeChild(stars[0]);
  } else if(moveCount === 14) {
    starsHolder.removeChild(stars[1]);
  }
}
// Function that restarts the game on click of restart button.
function restartGame() {

  // if restart is made from congrats modal, close the modal.
  if (modal.style.display = "block") {
    modal.style.display = "none";
  }

  // Shuffle Cards again.
  document.getElementById('deck-container').innerHTML = createCardLayout(shuffle(cards));

  // Add the listeners again if reset button is clicked.
  const clickedCards = document.getElementsByClassName("card");
  let deck = [...clickedCards];
  // loop to add event listeners to each card
  for (let i = 0; i < deck.length; i++){
   deck[i].addEventListener("click", displaySymbol);
  };

  // Reset move counter.
  moveCount = 0;
  const moveCounter = document.querySelector('.moves');
  moveCounter.innerHTML = 0 + " Move(s)";

  // Reset timer.
  let timer = document.querySelector(".timer");
  timerStarted = false;
  second = 0, minute = 0;
  timer.innerHTML = "0 Mins 0 Secs";
  clearInterval(interval);

  // Reset stars.
  const starsHolder = document.querySelector('.stars');
  let stars = starsHolder.children;
  const li = document.createElement('li');
  const li2 = document.createElement('li');
  if(stars.length === 1) {
    li.classList.add('star');
    li2.classList.add('star');
    li.innerHTML = '<i class="fa fa-star"></i>';
    li2.innerHTML = '<i class="fa fa-star"></i>';
    starsHolder.appendChild(li);
    starsHolder.appendChild(li2);
    console.log(stars);
  } else if(stars.length === 2) {
    li.classList.add('star');
    li.innerHTML = '<i class="fa fa-star"></i>';
    starsHolder.appendChild(li);
  }

  // Empty arrays
  openCards = [];
  matchedCards = [];
  flippedCards = [];

}
// Dispays the congrats modal and takes away the event listeners on the cards.
function finishGame() {
  if(matchedCards.length === 16) {
    // Game has been won.

    // Stop timer
    clearInterval(interval);

    // Populate modal with game info
    let ratings = document.querySelector('.stars');
    let moves = document.querySelector('.moves');
    //console.log(rating);
    timeSpan.innerHTML = timer.innerHTML;
    ratingUl.innerHTML = ratings.innerHTML;
    movesSpan.innerHTML = moves.innerHTML;

    // Show modal after 1 second.
    setTimeout(function(){
      modal.style.display = "block";
    }, 1000);

    // Removes event listener after game has been won.
    for(clickedCard of clickedCards) {
      clickedCard.removeEventListener('click', displaySymbol);
    }
    matchedCards = [];
  }
}
// Function to control the game timer.
function gameTimer() {
  timerStarted = true;
  interval = setInterval(function(){
  second++;
  timer.innerHTML = minute+" Mins "+second+" Secs";
  if(second == 59){
    minute++;
    second = 0;
  }
  if(minute == 59){
    hour++;
    minute = 0;
  }
  },1000);
}

/* ------- Variable Declarations --------- */
let openCards = [];
let matchedCards = [];
let flippedCards = [];
let cards = ['diamond1','diamond2','paper-plane-o1','paper-plane-o2','anchor1','anchor2','bolt1','bolt2','cube1','cube2','leaf1','leaf2','bicycle1','bicycle2','bomb1','bomb2'];
// move counter
let moveCount = 0;
// Timer vars
let second = 0, minute = 0;
let timer = document.querySelector(".timer");
let interval;
let timerStarted = false;
// Modal time, rating and moves.
let timeSpan = document.getElementById('modal-time');
let ratingUl = document.getElementById('modal-rating');
let movesSpan = document.getElementById('modal-moves');

/* ------- Adds each card's HTML to the page ------------ */
document.getElementById('deck-container').innerHTML = createCardLayout(shuffle(cards));

// Grabs the cards on the page.
const clickedCards = document.getElementsByClassName("card");
let deck = [...clickedCards];
// loop to add event listeners to each card
for (let i = 0; i < deck.length; i++){
 deck[i].addEventListener("click", displaySymbol);
};

/*------- Handles closing the congratulations modal ---------*/
const modal = document.getElementById('myModal');
// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

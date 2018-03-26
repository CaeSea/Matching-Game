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

function displaySymbol() {

  //starRating();

  // Remove the reset card class.
  if (this.classList.contains('reset-card')) {
     this.classList.remove('reset-card');  // If the card has been unflipped before the we must remove that class.
   }

  flippedCards.push(this); // Add the div to flippedCards array
  openCards.push(this.id); // Adds card id to openCards array.

  if (flippedCards.length === 1) {
    this.classList.add('flip-card');
  }

  if (openCards.length == 2) { // If 2 Cards have been flipped.
    if (openCards[0] === openCards[1]) { // if the cards match.
      // Cards have been matched.
      this.classList.add('flip-card');
      /*
      Copy the flippedCards array to the matchedCards Array if matchedCards is empty
      else push the flippedCards array to the end of the matchedCards.
      */
      if (matchedCards.length == 0) {
        matchedCards = flippedCards.splice(0);
      } else {
        matchedCards.concat(flippedCards);
      }
      // Empty the flippedCards array.
      flippedCards = [];
      // Empty the openCards array.
      openCards = [];

    } else { // If the cards don't match

    //disableCards - A way to disable all cards until code below is run.
    disableCards();

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
      }, 1500);
    }
    // Empty the openCards array.
    openCards = [];
  }
 }
}

function disableCards() {
  //let cardsToDisable = document.querySelectorAll('.card');
  for(let clickedCard of clickedCards) {
    clickedCard.style.pointerEvents = "none";
  }
}

function enableCards() {
  //let cardsToDisable = document.querySelectorAll('.card');
  for(let clickedCard of clickedCards) {
    clickedCard.style.removeProperty('pointer-events');
  }
}

function starRating() {
  const stars = document.querySelectorAll('#star');
  moveCount++;
  console.log(moveCount);

}

/* Array that holds all cards and the currently open cards */
let openCards = [];
let matchedCards = [];
let flippedCards = [];
let cards = ['diamond1','diamond2','paper-plane-o1','paper-plane-o2','anchor1','anchor2','bolt1','bolt2','cube1','cube2','leaf1','leaf2','bicycle1','bicycle2','bomb1','bomb2'];

// move counter
let moveCount = 0;
/*  Adds each card's HTML to the page */
document.getElementById('deck-container').innerHTML = createCardLayout(shuffle(cards));

/* Adds the click event listener the cards */
let clickedCards = document.querySelectorAll(".card");
for(clickedCard of clickedCards) {
  clickedCard.addEventListener('click', displaySymbol);
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

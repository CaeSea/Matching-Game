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
  // Remove the unflip card class.
  if (this.classList.contains('unflip-card')) {
     this.classList.remove('unflip-card');  // If the card has been unflipped before the we must remove that class.
   }
  // Flip the card.
  this.classList.add('flip-card');

  flippedCards.push(this); // Add the div to flippedCards array
  openCards.push(this.id); // Adds card id to openCards array.

  if (openCards.length == 2) { // If 2 Cards have been flipped.
    if (checkMatch(openCards, this.id) == 2) { // if the cards match.
      // Cards have been matched.

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
    // We need to flip the cards back again.

    if (!matchedCards.includes(this)) {
      for (let flippedCard of flippedCards) {
        flippedCard.classList.remove('flip-card'); // Flips the cards back over.
        flippedCard.classList.add('unflip-card'); // Flips the cards back over.
      }
    }
    // Empty the flippedCards array.
    flippedCards = [];
    // Empty the openCards array.
    openCards = [];
  }
}
  //console.log(matchedCards);
  console.log(openCards);
}

// Function to check if cards have been matched. Counts the duplicates in openCards array.
function checkMatch(array, card) {
  let count = 0;
  for (let i = 0; i < array.length; i++) {
      if (array[i] === card) {
          count++;
      }
  }
  return count;
}

/* Array that holds all cards and the currently open cards */
let openCards = [];
let matchedCards = [];
let flippedCards = [];
let cards = ['diamond1','diamond2','paper-plane-o1','paper-plane-o2','anchor1','anchor2','bolt1','bolt2','cube1','cube2','leaf1','leaf2','bicycle1','bicycle2','bomb1','bomb2'];

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

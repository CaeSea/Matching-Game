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
 }
}
// Checks if cards match on each flip.
function checkMatch() {
  if (openCards[0] === openCards[1]) { // if the cards match.

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
}
// Turns all unmatched cards back over.
function cardsDontMatch() {
  // Flip the 2nd clicked card.
  console.log(flippedCards);
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
  const stars = starsHolder.children;
  const moveCounter = document.querySelector('.moves');
  moveCount++;
  moveCounter.innerHTML = moveCount;
  if (moveCount === 9) {
    starsHolder.removeChild(stars[0]);
  } else if(moveCount === 14) {
    starsHolder.removeChild(stars[1]);
  }
}

function restartGame() {

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
  moveCounter.innerHTML = 0;

  // Reset timer.

  // Reset stars.
  const starsHolder = document.querySelector('.stars');
  let stars = starsHolder.children;
  const li = document.createElement('li');
  if(stars.length === 1) {
    li.classList.add('star');
    li.innerHTML = '<i class="fa fa-star"></i>&nbsp;<i class="fa fa-star"></i>';
    starsHolder.appendChild(li);
  } else if(stars.length === 2) {
    li.classList.add('star');
    li.innerHTML = '<i class="fa fa-star"></i>';
    starsHolder.appendChild(li);
  }

  // Empty arrays
  let openCards = [];
  let matchedCards = [];
  let flippedCards = [];

}

function finishGame() {
  if(matchedCards.length === 16) {
    // Game has been won.
    modal.style.display = "block";
    // Removes event listener after game has been won.
    for(clickedCard of clickedCards) {
      clickedCard.removeEventListener('click', displaySymbol);
    }
  }
}

/* Variable Declarations */
let openCards = [];
let matchedCards = [];
let flippedCards = [];
let cards = ['diamond1','diamond2','paper-plane-o1','paper-plane-o2','anchor1','anchor2','bolt1','bolt2','cube1','cube2','leaf1','leaf2','bicycle1','bicycle2','bomb1','bomb2'];
// move counter
let moveCount = 0;

/* ------- Adds each card's HTML to the page ------------ */
document.getElementById('deck-container').innerHTML = createCardLayout(shuffle(cards));

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

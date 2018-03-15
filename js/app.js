/*
 * Create a list that holds all of your cards
 */
 let cards = [
 'diamond1',
 'diamond2',
 'plane1',
 'plane2',
 'anchor1',
 'anchor2',
 'bolt1',
 'bolt2',
 'box1',
 'box2',
 'leaf1',
 'leaf2',
 'bike1',
 'bike2',
 'bomb1',
 'bomb2'
];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Function to create html for shuffled cards.
  function createCardLayout(shuffledCards) {
    let symbol = "";
    let html = '<ul class="deck">';
    for (i = 0; i < shuffledCards.length; i++) {
      symbol = shuffledCards[i].substring(0, shuffledCards[i].length - 1);
      html += '<li class="card"><i class="fa ' + symbol + ' symbol"></li>';
   }
   html += '</ul>';
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

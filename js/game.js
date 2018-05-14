console.log("Laster...");

function shuffle(deck) {
  console.log("shuffle...");
  return shuffleArray(deck);
}

function showCard(card){
  const gameBoard = document.querySelector("#gameBoard");
  var cardElem = document.createElement('div');
  cardElem.classList.add("card");
  cardElem.classList.add("draggable");
  if(card.suit == "Hearts" || card.suit == "Diomonds"){
    cardElem.classList.add("red-suit");
  }

  var valueElem = document.createElement('div');
  var valueTextElem = document.createTextNode(card.value);
  valueElem.appendChild(valueTextElem);

  var suitElem = document.createElement('div');
  var suitTextElem = document.createTextNode(mapSuitToUnicodeCharacter(card.suit));
  suitElem.appendChild(suitTextElem);

  cardElem.appendChild(valueElem);
  cardElem.appendChild(suitElem);

  gameBoard.appendChild(cardElem);
}

function dealCard(){
  const card = deck.pop();
  console.log("deal card...", card);
  showCard(card);
}

function mapSuitToUnicodeCharacter(suit){
    // var omega = '\u03A9';
    if(suit == "Hearts"){
      return '\u2665'
    }else if(suit == "Diomonds"){
      return '\u2666'
    }else if(suit == "Spades"){
      return '\u2660'
    }else if(suit == "Clubs"){
      return '\u2663'
    }
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function createDeck(){
  var deck = [];

  suits.forEach(function(suit){
    console.log("Dealing " + suit);
    values.forEach(function(value){
      console.log("Dealing value: " + value)
      deck.push({"suit": suit, "value": value});
    });
  });

  return deck;
}

function mainStackInit(){
  console.log("main stack init");

  deck = createDeck();

  console.log("Deck", deck);

  shuffle(deck);

  console.log("Shuffled deck", deck);

  var mainStack = document.querySelector("#mainStack");

  console.log("mainStack:", mainStack);

  mainStack.onclick = dealCard;
}

var deck;
const suits = ["Hearts", "Diomonds", "Spades", "Clubs"];
const values = [1,2,3,4,5,6,7,8,9,10,11,12,13];



mainStackInit();

interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      /*var textEl = event.target.querySelector('p');

      textEl && (textEl.textContent =
        'moved a distance of '
        + (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                     Math.pow(event.pageY - event.y0, 2) | 0))
            .toFixed(2) + 'px');*/

      event.target.classList.remove('isLifted');
    }
  });

  function dragMoveListener (event) {

    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    target.classList.add('isLifted');

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);

  }

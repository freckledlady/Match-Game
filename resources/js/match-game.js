function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



var MatchGame = {};


/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

/*
  Generates and returns an array of matching card values.
 */
 $(document).ready(function(){
   MatchGame.renderCards(MatchGame.generateCardValues(), $('#game'));
 });


MatchGame.generateCardValues = function () {
  var inOrder = [];
  for(var i = 1; i <= 8; i++) {
    inOrder.push(i,i);
  };
  var randomOrder = [];
  while(inOrder.length > 0){
    var index = getRandomIntInclusive(0, inOrder.length-1);
    randomOrder.push(inOrder[index]);
    inOrder.splice(index, 1);
  }
  return randomOrder;
};


/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  $game.data("flippedCards", []);
  var colors =
  ['hsl(25, 85%, 65%)','hsl(55, 85%, 65%)','hsl(90, 85%, 65%)','hsl(160, 85%, 65%)','hsl(220, 85%, 65%)','hsl(265, 85%, 65%)','hsl(310, 85%, 65%)','hsl(360, 85%, 65%)'];
  $game.empty();
  for(var i = 0; i < cardValues.length; i++){
    var $card = $('<div class = "card col-xs-3"></div>');
    $card.data("value", cardValues[i]);
    $card.data("flipped", false);
    $card.data("color", colors[cardValues[i]-1]);
    $game.append($card);
  }
  $('.card').click(function(){
    MatchGame.flipCard($(this), $('#game'));
  })

};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  var flips = $game.data("flippedCards");
  var $otherCard;
  if ($card.data("flipped") || flips.length === 2) {
    return;
  } else {
    MatchGame.flip($card);
    flips.push($card);
  }
  if (flips.length === 2) {
    $otherCard = flips[0];

    if($card.data("value") === $otherCard.data("value")){
      MatchGame.matched($card);
      MatchGame.matched($otherCard);

    } else {
      window.setTimeout(function () {
        MatchGame.unflip($card);
        MatchGame.unflip($otherCard);
      }, 500);
    }
    $game.data("flippedCards", []);
  }
};

MatchGame.flip = function ($card) {
  $card.css("background-color", $card.data("color"));
  $card.html("<p>" + $card.data("value") + "</p>");
  $card.data("flipped", true);
}

MatchGame.unflip = function ($card) {
  $card.css("background-color", "rgb(32,64,86)");
  $card.empty();
  $card.data("flipped", false);
}

MatchGame.matched = function($card) {
  $card.css("background-color", "rgb(153,153,153)");
  $card.css("color", "rgb(204,204,204)")
}
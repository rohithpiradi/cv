//variables used in the script
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var result = true;

//for adding one more color by upgrading the level by one at a time
function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  gamePattern.push(randomChosenColor);

  //intialising since user must push color right from the start after every level with memory power
  userClickedPattern = [];
}

function playSound(color) {
  new Audio("sounds/" + color + ".mp3").play();
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
}

//checks whether user enters at the current level till he reaches all colors in the level
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel - 1] === userClickedPattern[currentLevel - 1])
    return '1';
  return '0';
}


function startOver() {
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
  result = true;
}


//start of the Game
$(document).keypress(function() {

  //once game started no keys should work or disturb these block of lines
  if (level === 0) {

    var userChosenColor;
    nextSequence();

    $(".btn").click(function() {

      userChosenColor = this.id;
      animatePress(userChosenColor);
      userClickedPattern.push(userChosenColor);
      playSound(userChosenColor);

      if (userClickedPattern.length >= level && checkAnswer(userClickedPattern.length) === '1') {
        setTimeout(function() {
          nextSequence();
        }, 800);
      } else if (checkAnswer(userClickedPattern.length) === '0') {
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function() {
          $("body").removeClass("game-over");
        }, 200);
        playSound("wrong");
        result = false;
      }

    });

  }
  //after game and result failed if key pressed we need to restart
  else if (!result) {
    startOver();
    nextSequence();
  }

});

var gamePattern=[];

var buttonColours=["red", "blue", "green", "yellow"];

var userClickedPattern=[];

//To check whether the game has started or not
var started = false;

// Create a new variable called level and start at level 0.
var level = 0;

//To detect keyboard press for first time to start the game
$(document).keypress(function() {
  if (!started) {

    // The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//To detect mouse click for first time to start the game
$(document).mousedown(function() {
  if (!started) {

    // The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//When the game is over 

function startOver(){
  gamePattern=[];
  started=false;
  level=0;
}


function checkAnswer(currentLevel) {

  //to check your answer to the required answer
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    //now checking if after the last correct answer, have you reached the end of that particular level
    if (userClickedPattern.length === gamePattern.length){

      //starting the next level and generating the next sequence
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  } else {

    //if your answer was wrong, this resets the game
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}


function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(name){

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){

  //resetting the user input answer to null for the next level
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  //generating the next random pattern
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
    
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
}





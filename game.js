//alert("hello");
var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red","blue","green","yellow"];
var level = 0;
//start game listener//
var gameStarted = false;

$(document).keydown(function(){
  if (!gameStarted){
    $("h1").text("Level " + level);
    nextSequence();
  }
});

//answer check//
function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    var gameOverSound = new Audio("sounds/wrong.mp3");
    gameOverSound.play();
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over")}, 200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
  }

}

//click listener and handler//
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
  gameStarted = true;
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  // console.log(randomNumber);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //sounds and blip

var animatedButton = $("#" + randomChosenColour);
animatedButton.fadeOut(100).fadeIn(100);

playSound(randomChosenColour);
animatePress(randomChosenColour);
}

function playSound(name){
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  //console.log('pressedbutton');
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed")}, 100);
}

//Restart
function startOver(){
  level = 0;
  gamePattern = [];
  gameStarted = false;
}

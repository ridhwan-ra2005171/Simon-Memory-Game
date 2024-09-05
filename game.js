
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPatttern = [];
var level = 0;
var started = false;

function nextSequence() {
    userClickedPatttern = []; //resets the array

    //increase level everytime its called
    level++;
    $("#level-title").text("Level " + level);


    //generate new random 0 - 3 
    var randomNum = Math.floor(Math.random() * 4);
    console.log(randomNum);

    var randomChosenColour = buttonColours[randomNum]
    //stores the pattern
gamePattern.push(randomChosenColour)

    console.log(gamePattern);
    
    //to animate button demo when generating new pattern

    for(var i = 0; i < gamePattern.length; i++){
        // console.log(gamePattern[i]);
        (function(index) {
            setTimeout(function() {
                $("#"+ gamePattern[index]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
                playSound(gamePattern[index]);
            }, index * 500);
        })(i);
        //there is a delay in each iteration, so it will play sound in order
    }

}


//to play sound
$(".btn").click(function() {
    var userChoserColour; // to store id of button pressed
    userChoserColour = $(this).attr("id");
    userClickedPatttern.push(userChoserColour);
    console.log(userClickedPatttern);
    playSound(userChoserColour);
    animatePress(userChoserColour);
    checkAnswer(userClickedPatttern.length-1);
})

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//to animate presses
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100) //wait 100ms

}

//to start on web
$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

//to start on mobile/ipad
//to start game on mobile
$("body").click(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
  });

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPatttern[currentLevel]){
        console.log("success");
        if(userClickedPatttern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else{

        console.log("wrong");

        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)


        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
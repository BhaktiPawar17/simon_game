var userPattern = [];
var gamePattern = [];
var buttonColors = ["red","green","blue","yellow"];
var started = false;
var level = 0;

function nextSequence(){
    userPattern = [];
    level++;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomColor =  buttonColors[randomNumber];
    gamePattern.push(randomColor);
    $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animateBtn(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    },100);
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userPattern.push(userChosenColour);
    playSound(userChosenColour);
    animateBtn(userChosenColour);
    checkAnswer(userPattern.length-1);
});

function checkAnswer(currentLevel){
    if(userPattern[currentLevel]==gamePattern[currentLevel]){

        if(gamePattern.length==userPattern.length){
            
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        playSound("wrong");

        $("body").addClass("game-over");

        $("h1").text("Game Over, Press Any Key to Restart!")

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        
        startOver();
    }
}

$(document).keypress(function(){
    if(!started){
        $("h1").text("Level "+level);
        nextSequence();
        started = true;
    }
});

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;

$(document).on("keypress", function() {
    if (!gameStarted) {
        startGame();
    }
});


$(".btn").on("click", function() {
    if (!gameStarted) return;
    
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    checkAnswer(userClickedPattern.length - 1);
});

function startGame() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    gameStarted = true;
    nextSequence();
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    
    let randomNumber = Math.floor(Math.random() * 4); 
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    const audio = new Audio("./sounds/" + name + ".mp3");
    audio.play().catch(error => {
        console.error("Sound playback failed:", error);
    });
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    gameStarted = false;
}
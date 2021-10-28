/*
* 0 = up
* 1 = right
* 2 = down
* 3 = left
* */
var dir = 1;

var menu_snake = $(".menu-snake");
var map = $('.map');
var x = 450;
var y = 400;
var xFood;
var yFood;
var speed = 50;
var playing = false;
var score = 0;
var firstGame = true;
var size = 10;
var sizeAddBody = 5;
var color = "white";

createBody();

function startGame() {
    if (!firstGame){
        cleanMap();
        createBody(10);
    }
    $('.score').text(score);
    menu_snake.fadeOut();
    playing = true;
    firstGame = false;
    moveSnake();
    dropFood();
}

$('.colors .button').click(function () {
    color = $(this).attr('class').split(' ')[1];
    $('.body-snake').remove();
    resetVariables();
    createBody();
});

function cleanMap() {
    $('.body-snake').remove();
    $('.food').remove();
}

function createBody() {
    for (let i=0; i< size; i++){
        map.append(bodySnake(x, y));
        setDirection();
    }
}

function moveSnake() {
    validateBorder();
    validateBody();
    if (playing){
        map.append(bodySnake(x,y));
        $('.map .body-snake').first().remove();
        validateEatFood();
        setDirection();
        setTimeout(moveSnake, speed);
    }else return true;
}

function dropFood() {
    xFood = randomIntFromInterval(0, 99)*10;
    yFood = randomIntFromInterval(0, 79)*10;
    map.append("<div class='food' style='left: "+xFood+"px; bottom: "+yFood+"px;'></div>")
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function addBody(n) {
    for (let i=0; i<=n; i++)map.append(bodySnake(x,y));
}

function validateBody(){
    if($(".body-snake[style='left: "+x+"px; bottom: "+y+"px;']").length > 0)endGame();
}

function validateEatFood() {
    if(x === xFood && y === yFood){
        $('.food').remove();
        score+=10;
        addBody(sizeAddBody);
        $('.score').text(score);
        if (score === 200)speed-=10;
        else if (score === 400)speed-=10;
        else if (score === 600)speed-=10;
        dropFood();
    }
}

function validateBorder(){
    if(x > 990 || x < 0 || y > 790 || y < 0)endGame();
}

function endGame(){
    playing = false;
    menu_snake.fadeIn();
    resetVariables()
}

function setDirection() {
    if (dir === 0) y+=10;
    else if (dir === 1) x+=10;
    else if (dir === 2) y-=10;
    else if (dir === 3) x-=10;
}

function resetVariables() {
    score = 0;
    x = 450;
    y = 400;
    dir = 1;
    playing = false;
}

function bodySnake(x, y) {
    return "<div class='body-snake "+color+"' style='left: "+x+"px; bottom: "+y+"px;'></div>";
}

$(document).keydown(function(e){
    k = e.keyCode;
    if (k===38 && dir !== 2)dir=0;
    else if (k===39 && dir !== 3)dir=1;
    else if (k===40 && dir !== 0)dir=2;
    else if (k===37 && dir !== 1)dir=3;
});
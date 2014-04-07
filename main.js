var CANVAS_WIDTH = 480;
var CANVAS_HEIGHT = 500;
var BUBBLE_X = 200, BUBBLE_Y = 55;
var numberArr = ['1','2','3','4','5','6','7','8','9'];
var operatorArr = ['+','-', '*'];
var FPS = 30;
var randomPuzzle = getRandomPuzzle();
var canvas = ($("canvas")[0]).getContext("2d");
var speed = 2;
var gameRunning = true;
function getRandomPuzzle(){
	var number1 = numberArr[getRandomInt(0,8)];
	var number2 = numberArr[getRandomInt(0,8)];
	var randomPuzzle= "";
	if(number1>number2)
		randomPuzzle=  number1 + " " + operatorArr[getRandomInt(0,2)] + " " + number2; 
	else
		randomPuzzle=  number2 + " " + operatorArr[getRandomInt(0,2)] + " " + number1; 
	return randomPuzzle;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
var interval = setInterval(function() {
  update();
  draw();
}, 1000/FPS);

function restartGame(){
	gameRunning = true;
	$("#score").text("0");
	$("canvas").unbind('click');
	speed = 2;
	bottomStack.height = 0;
	interval = setInterval(function() {
	  update();
	  draw();
	}, 1000/FPS);
}
function update() {
   BUBBLE_Y += speed;
   if(BUBBLE_Y >= CANVAS_HEIGHT-bottomStack.height) {
   		bottomStack.height += 25;
   		if(bottomStack.height >= CANVAS_HEIGHT+25){    			
  			gameOver();
   		}
   		randomPuzzle = getRandomPuzzle();
   		BUBBLE_Y = 0;
   }
   if(gameRunning){
   		canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}
function gameOver(){
	$("canvas").bind('click',function(){
  		restartGame();
  	});
   	clearInterval(interval);
	canvas.fillStyle    = '#fff';
	canvas.font         = '18px verdana';
	canvas.textBaseline = 'top';	
	canvas.fillText('Game Over, Click to restart game', 80, 225);
	gameRunning = false;
}
function draw() {
	if(gameRunning){   	
		  canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		  canvas.fillStyle = "#444";
		  canvas.beginPath();
		  var radius = 50; 
		  canvas.arc(BUBBLE_X, BUBBLE_Y, radius, 0, Math.PI * 2);
		  canvas.closePath();
		  canvas.fill();
		  canvas.fillStyle = "#fff"; 
		  var font = "20px serif";
		  canvas.font = font;
		  canvas.textBaseline = "top";
		  canvas.fillText(randomPuzzle, BUBBLE_X-20, BUBBLE_Y-10);
		  bottomStack.draw();
	}
 }

 var bottomStack = {
  color: "#4183C4",
  height: 10,
  draw: function() {
    canvas.fillStyle = this.color;
    canvas.fillRect(0, CANVAS_HEIGHT-bottomStack.height, CANVAS_WIDTH, bottomStack.height);
  }
};

function addKeyVal(val){
	var oldVal = $("#puzzleResult").val();
	$("#puzzleResult").val(oldVal+val);
}
function removeKeyVal(){
	var val = $("#puzzleResult").val();
	if(val.length>0){
		val = val.substring(0,val.length-1);
		$("#puzzleResult").val(val);
	}
}
function clearVal(){
	$("#puzzleResult").val("");
}
function validateVal(){
	var valueEntered = $("#puzzleResult").val();
	var actualResult = eval(randomPuzzle);
	if(valueEntered == actualResult){		
		randomPuzzle = getRandomPuzzle();
   		updateScore();   		
   		BUBBLE_Y = 0;
	}
	clearVal();
}
function updateScore(){
	var score = $("#score").text();
   	var earnedPoints = Math.floor((CANVAS_HEIGHT- BUBBLE_Y)/50);   	
   	var newScore = parseInt($("#score").text())+earnedPoints;
   	if(newScore>100){
   		speed = 3;
   	}
   	if(newScore>200){
   		speed = 4;
   	}
   	if(newScore>300){
   		speed = 5;
   	}
   	if(newScore>600){
   		speed = 6;
   	}
   	if(newScore>900){
   		speed = 7;
   	}
   	if(newScore>1200){
   		speed = 8;
   	}
   	if(newScore>1500){
   		speed = 9;
   	}
   	if(newScore>2500){
   		speed = 10;
   	}
   	$("#score").text(newScore);
}
jQuery(document).bind('keypress', '0',function (evt){addKeyVal('0'); return false;});
jQuery(document).bind('keypress', '1',function (evt){addKeyVal('1'); return false;});
jQuery(document).bind('keypress', '2',function (evt){addKeyVal('2'); return false;});
jQuery(document).bind('keypress', '3',function (evt){addKeyVal('3'); return false;});
jQuery(document).bind('keypress', '4',function (evt){addKeyVal('4'); return false;});
jQuery(document).bind('keypress', '5',function (evt){addKeyVal('5'); return false;});
jQuery(document).bind('keypress', '6',function (evt){addKeyVal('6'); return false;});
jQuery(document).bind('keypress', '7',function (evt){addKeyVal('7'); return false;});
jQuery(document).bind('keypress', '8',function (evt){addKeyVal('8'); return false;});
jQuery(document).bind('keypress', '9',function (evt){addKeyVal('9'); return false;});
jQuery(document).bind('keydown', 'del',function (evt){clearVal(); return false;});
jQuery(document).bind('keydown', 'backspace',function (evt){removeKeyVal();evt.preventDefault(); return false;});
jQuery(document).bind('keydown', 'space',function (evt){validateVal(); return false;});
jQuery(document).bind('keydown', 'return',function (evt){validateVal(); return false;});


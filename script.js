// UI Variables
var canvas;
var canvasWidth;
var canvasHeight;
var gameScreen;
var scoreDisplay;

// Game Variables
var gameRunning;
var shipShooting;
var alienShooting;
var score;

// Ship Variables
var shipDiameter;
var shipX;
var shipY;
var shipSpeed;
var shipColor;

// Bullet Variables
var bulletDiameter;
var bulletX;
var bulletY;

// Alien Variables
var alienDiameter;
var alienX;
var alienY;
var alienVelocity;

// Alien Bullet Variables
var alienBulletDiameter;
var alienBulletX;
var alienBulletY;




  function setup(){
  	canvasWidth=500;
  	canvasHeight=400;
  	canvas=createCanvas(canvasWidth,canvasHeight);
  	
  	gameScreen = select("#game-screen");
  	canvas.parent('game-screen');
  	scoreDisplay = select("#score-display");
  	resetGame();

  }


function gameOver(){
	gameRunning=false;
	alert("Game Over");
	resetGame();
}
 

function resetGame(){
	shipColor=139;
  	shipDiameter= 150;
  	shipSpeed=8;
  	shipX= width/2;
  	shipY=360;
  	ellipse(shipX,shipY,shipDiameter/2,shipDiameter/2);
  	shipShooting = false;
  	bulletDiameter=75;

  	alienDiameter=50;
  	alienVelocity=10;
  	alienX=25;
  	alienY=25;

  	alienBulletDiameter=15;
  	alienShooting=false;
  	score=0;
  	scoreDisplay.html(score);
	gameRunning=true;

}



 function draw(){
 	if(gameRunning=true){
 	background(0,0,128);
 	for(i=0;i<width;i+=20){
 		for(j=0;j<height;j+=20){
 			fill(255,255,255,100);
 			ellipse(i+5,j+5,5,5);
 		}
 	} 
 	drawShip();
 	if(shipShooting==true){
 		drawBullet();
 	}
 	drawAlien();
 	if(alienShooting==true){
 	drawAlienBullet();
 	}
 	checkCollision(alienX,alienY,alienDiameter,bulletX,bulletY,bulletDiameter);
 	checkCollision(shipX,shipY,shipDiameter,alienBulletX,alienBulletY,alienBulletDiameter);
 	}
 }



 function drawShip(){
 	fill(34,shipColor,34);
 	rect(shipX-5,shipY-35,10,40);
 	arc(shipX,shipY,shipDiameter/2,shipDiameter/2,radians(0),radians(180));
 	fill(255,0,0);
 	triangle(shipX-5,shipY-35,shipX-5,shipY-20,shipX+20,shipY-27.5);
 	fill(34,shipColor,34);
 	rect(shipX-20,shipY+5,8,12);
 	rect(shipX+15,shipY+5,8,12);
 	if(keyIsDown(LEFT_ARROW) && shipX >45){
 		shipX-=shipSpeed;
 	}
 	else if(keyIsDown(RIGHT_ARROW) && shipX <455){
 		shipX+=shipSpeed;
 	}
 }


function keyPressed(){
	if(keyCode==32 && shipShooting==false && gameRunning==true){
		bulletX=shipX;
		bulletY=shipY;
		shipShooting=true;
	}
}

function drawBullet(){
	var hitAlien = checkCollision(alienX,alienY,alienDiameter,bulletX,bulletY,bulletDiameter);
	if(bulletY > 0 && !hitAlien){
		shipShooting= true;
	}
	else if(hitAlien){
		resetAlien();
		alienVelocity++;
		shipShooting = false;
		score++;
		scoreDisplay.html(score);
	}
	else {
		shipShooting = false;
	}
	
	if (bulletY>=0){
	fill(34,139,34);
	ellipse(bulletX,bulletY,bulletDiameter/2,bulletDiameter/2);
	bulletY-=13;
	}
	else{
		shipShooting=false;
	}
}



 function drawAlien(){
 	alienX +=alienVelocity;
if(alienX>=475){
	alienVelocity = -10;
}
else if(alienX<=25){
	alienVelocity=10;
}
	noStroke();
 	fill(255,255,51);
 	ellipse(alienX,alienY,alienDiameter,alienDiameter);
 	ellipse(alienX-10,alienY+20,alienDiameter/4,alienDiameter/2);
 	ellipse(alienX+15,alienY+20,alienDiameter/4,alienDiameter/2);
 	fill(0);
 	ellipse(alienX-5,alienY-5,alienDiameter/4,alienDiameter/4);
 	ellipse(alienX+15,alienY-5,alienDiameter/4,alienDiameter/4);
 	stroke(0);
 	fill(255);
 	rect(alienX-10,alienY+8,20,3);
 	rect(alienX-10,alienY+12,20,3);
 	if(random(4) < 1 && !alienShooting){
 		alienBulletY=alienY;
 		alienBulletX=alienX;
 		alienShooting=true;
 	}
 }


function drawAlienBullet(){
	var hitShip = checkCollision(shipX,shipY,shipDiameter,alienBulletX,alienBulletY,alienBulletDiameter);
	if(alienBulletY > 0 && !hitShip){
		alienShooting= true;
	}
	else if(hitShip){
		gameOver();
		alienVelocity++;
		alienShooting = false;
	}
	else {
		alienShooting= false;
	}
	if(alienBulletY<=400){
		fill(255,255,51);
		ellipse(alienBulletX,alienBulletY,alienBulletDiameter,alienBulletDiameter);
		alienBulletY+=8;
	}
	else{
		alienShooting=false;
	}
}


function resetAlien(){
	alienX=25
	alienY=25
	var x = -10;
	alienVelocity = abs(x);
}


function checkCollision(aX,aY,aD,bX,bY,bD){
	var distance = dist(aX,aY,bX,bY);
	if(distance <= (aD + bD) / 4){
		return true;
	}
	else{
		return false;
	}
}

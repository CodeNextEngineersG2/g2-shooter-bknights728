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

  	shipColor=139;
  	shipDiameter= 150;
  	shipSpeed=8;
  	shipX= width/2;
  	shipY=360;
  	ellipse(shipX,shipY,shipDiameter/2,shipDiameter/2);
  }


/*
 * gameOver()
 * This function stops the game from running and shows an alert telling the
 * player what their final score is. Finally it resets the game by calling
 * resetGame()
 */


/*
 * resetGame()
 * This function "resets the game" by initializing ship, alien, and game
 * variables.
 */



 function draw(){
 	background(0,0,128);
 	drawShip();
 }



 function drawShip(){
 	fill(34,shipColor,34);
 	ellipse(shipX,shipY,shipDiameter/2,shipDiameter/2);
 	if(keyIsDown(LEFT_ARROW) && shipX >45){
 		shipX-=shipSpeed;
 	}
 	else if(keyIsDown(RIGHT_ARROW) && shipX <455){
 		shipX+=shipSpeed;
 	}
 }


/*
 * keyPressed()
 * This function runs automatically when the player presses the spacebar
 * (keyCode === 32). If they do, and a bullet is not currently being fired
 * ("shipShooting" variable is false), it positions the bullet relative to the
 * ship. Then it sets the "shipShooting" variable to "true", indicating a ship
 * bullet is currently being fired.
 */


/*
 * drawBullet()
 * This function draws a bullet. It also checks to see if the bullet has hit
 * the alien. If it has, the alien is reset to the top-left of the screen
 * and the player earns a point. The alien aslo becomes faster (i.e., harder
 * to hit) each time it is hit by a bullet.
 */


/*
 * drawAlien()
 * This function draws an alien. It also checks to see if the alien has touched
 * the player's ship. If it has, the function calls gameOver().
 */


/*
 * drawAlienBullet()
 * This function behaves much like drawBullet(), only it fires from the alien
 * and not the player's ship. If the bullet hits the player, it's game over.
 */


/*
 * resetAlien()
 * This function sets the alien to its original position at the top-left of
 * the screen. It also sets its velocity to its absolute value (so, if the
 * velocity was negative when it died, it becomes positive upon reset, making
 * it always start by moving to the right).
 */


/*
 * checkCollision(aX, aY, aD, bX, bY, bD)
 * This function first calculates the distance between two circles based on
 * their X and Y values. Based on the distance value, the function returns
 * "true" if the circles are touching, and false otherwise.
 * Circles are considered touching if
 * (distance <= (circle1Diameter + circle2Diameter) / 2)
 */

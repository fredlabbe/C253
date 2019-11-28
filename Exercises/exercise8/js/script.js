"use strict";

/*****************

Exercise 8 (Prototype 2)
Frederick Labbe

In this prototype, I am writing a code that makes a camera on the player move
according to the player's position.
1: start with mouseX & Y : achieved
2: try to make it follow a rectangle: currently in developpement
3(bonus): make it so the camera follows the player only when a certain percentage
  of the screen is reached so it doesn't appear like the player is not moving
  at the middle of the screen but the background move: Not there yet

******************/
//image's properties
let backgroundImg;
let imageX = -400;
let imageY = -400;

//Variable containing the value for the position of the eye of camera
let eyePosition;

//WASD moving keys
let upKey = 87; //W
let downKey = 83; //S
let leftKey = 65; //A
let rightKey = 68; //D

//player's properties
let vx = 0;
let vy = 0;
let speed = 5;
let player;
let playerX = -200;
let playerY = -200;
let playerSize = 100;


// preload()
//
// Description of preload

function preload() {
backgroundImg = loadImage("assets/images/Forest.png");
}


// setup()
//
// Description of setup

function setup() {
  createCanvas(800, 800, WEBGL);

  eyePosition = (height/2) / tan(PI/6);
}

// draw()
//
// Draws a player as a rectangle on a canva with a camera that follows the player

function draw() {

  //draws the background as an image
  image(backgroundImg, imageX, imageY, 2*width, 2*height);
  //maps the x position of the camera to the player's x position
  //same thing for y
  let cameraX = map(playerX,0,width,0,width);
  let cameraY = map(playerY,0,height,0,height);

  //creating translation variables that are constrained according to the position
  //of the player inside the canvas
  let translateX = constrain(playerX,-imageX/2,width);
  let translateY = constrain(playerY,-imageY/2,height);

  camera(translateX, translateY, eyePosition, translateX, translateY, 0, 0 ,1, 0);
  translate(translateX,translateY,0);

  // Handling the inputs
  // Horizontal movement
  if (keyIsDown(leftKey)) {
    vx = -speed;
  }
  else if (keyIsDown(rightKey)) {
    vx = speed;
  }
  else {
    vx = 0;
  }
  // Vertical movement
  if (keyIsDown(upKey)) {
    vy = -speed;
  }
  else if (keyIsDown(downKey)) {
    vy = speed;
  }
  else {
    vy = 0;
  }

  //moving the player
  playerX += vx;
  playerY += vy;

  //preventing the player to go out of the map
  playerX = constrain(playerX, imageX + playerSize/2, width - playerSize/2);
  playerY = constrain(playerY, imageY + playerSize/2, height - playerSize/2);

  //drawing the player as a red rectangle
  rectMode(CENTER);
  fill(255,0,0);
  player = rect(playerX, playerY, playerSize, playerSize);

}

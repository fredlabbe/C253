"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
//image's properties
let backgroundImg;
let imageX = -400;
let imageY = -400;

let eyePosition;

//WASD moving keys
upKey = 87; //W
downKey = 83; //S
leftKey = 65; //A
rightKey = 68; //D

//player's properties
vx = 0;
vy = 0;
speed = 5;

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
  //translate(-width/2, -height/2, 0);

  eyePosition = (height/2) / tan(PI/6);
}

// draw()
//
// Description of draw()

function draw() {

  image(backgroundImg, imageX, imageY, 2*width, 2*height);


  let cameraX = map(mouseX,0,width,0,width);
  let cameraY = map(mouseY,0,height,0,height);

  //camera(cameraY, 0, eyePosition, cameraY, 0, 0, 0 ,1, 0);
  let translateX = constrain(mouseX,-width/2,width);
  let translateY = constrain(mouseY,-height/2,height);
  //camera(translateX, 0, eyePosition, translateX, 0, 0, 0 ,1, 0);
  camera(translateX, translateY, eyePosition, translateX, translateY, 0, 0 ,1, 0);
  translate(translateX,translateY,0);



}
// handleInput
//
// Checks if an arrow key is pressed and sets the predator's
// velocity appropriately.
handleInput() {
  // Horizontal movement
  if (keyIsDown(leftKey)) {
    vx = -speed;
  } else if (keyIsDown(rightKey)) {
    vx = speed;
  } else {
    vx = 0;
  }
  // Vertical movement
  if (keyIsDown(upKey)) {
    vy = -speed;
  } else if (keyIsDown(downKey)) {
    vy = speed;
  } else {
    vy = 0;
  }
}

"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/


// This will contain our Predator object
let tiger;
let lion;
let antelope;
let warthog;

// variables containing the images
let lionImg;
let warthogImg;
let antelopeImg;
let tigerImg;

//variable for the state of the game
let state = "Menu";

//size of winning image
let winImgSize = 200;

// preload()
//
// Description of preload

function preload() {
  //preloads the images and put it in variables
  lionImg = loadImage("assets/images/scar.png");
  warthogImg = loadImage("assets/images/pumba.png");
  antelopeImg = loadImage("assets/images/antelope.png");
  tigerImg = loadImage("assets/images/tiger.png");
}


// setup()
//
// Description of setup

function setup() {
  createCanvas(1280, 720);
  tiger = new Predator(width / 2, height / 2, 5, color(255, 165, 0), 60, 38, 40, 37, 39, 77, tigerImg);
  lion = new Predator(random(0, width), random(0, height), 5, color(255, 10, 10), 60, 87, 83, 65, 68, 16, lionImg);
  antelope = new Prey(random(0, width), random(0, height), 8, color(143, 111, 71), 40, antelopeImg);
  warthog = new Prey(random(0, width), random(0, height), 8, color(204, 168, 151), 50, warthogImg);

  //setting the texts' characteristics
  fill(255,0,0);
  textSize(30);
  textAlign(CENTER);
}


// draw()
//
// Description of draw()

function draw() {
  background(0);

  if (state === "Menu") {
    text("Play", width/2, height/2);
  }
  else if (state === "Game") {
    //they take the users' inputs in
    tiger.handleInput();
    lion.handleInput();

    //Making the animals move
    tiger.move();
    lion.move();
    antelope.move();
    warthog.move();

    //Displaying the animals on the screen
    tiger.display();
    lion.display();
    antelope.display();
    warthog.display();

    //calls the functions that checks and handles if the preys are eaten
    tiger.handleEating(antelope);
    tiger.handleEating(warthog);
    lion.handleEating(antelope);
    lion.handleEating(warthog);

    if (tiger.health <= 0 || lion.health <= 0) {
      state = "GameOver";
    }
  } else if (state === "GameOver") {
    if(tiger.health <= 0){
      image(lionImg,width/2,height/2, winImgSize,winImgSize);
      text("Won!", width/2, (height/2)+winImgSize+50);
    }
    else if(lion.health <= 0){
      image(tigerImg,width/2,height/2, winImgSize,winImgSize);
      text("Won!", width/2, (height/2)+winImgSize+50);
    }
    else{
      text("Nobody won!",width/2,height/2);
    }
  }

}

function mousePressed() {
  if (state === "Menu") {
    state = "Game";
  }
}

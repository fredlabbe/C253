"use strict";

/*****************

The Predator King (Lion King pun)
Frederick Labbe

A chasing 2 player game where the predators try to eat the preys to stay alive.
last man(or animal) standing wins.

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
  lionImg = loadImage("assets/images/Scar.png");
  warthogImg = loadImage("assets/images/pumba.png");
  antelopeImg = loadImage("assets/images/antelope.png");
  tigerImg = loadImage("assets/images/tiger.png");
}


// setup()
//
// Creates the predators and the preys and sets up the texts

function setup() {
  createCanvas(1280, 720);
  tiger = new Predator(width / 2, height / 2, 5, color(255, 165, 0), 60, 38, 40, 37, 39, 77, tigerImg);
  lion = new Predator(random(0, width), random(0, height), 5, color(255, 10, 10), 60, 87, 83, 65, 68, 16, lionImg);
  antelope = new Prey(random(0, width), random(0, height), 8, color(143, 111, 71), 40, antelopeImg);
  warthog = new Prey(random(0, width), random(0, height), 8, color(204, 168, 151), 50, warthogImg);

  //setting the texts' characteristics
  fill(255, 0, 0);
  textSize(30);
  textAlign(CENTER);
  textFont("Gill Sans");
}


// draw()
//
// Manages the state of the game(the screen), and handles the game itslef.
//Checks if either predator has died and displays who won accordingly
function draw() {
  background(0);

  if (state === "Menu") {
    text("Play", width / 2, height / 2);
  } else if (state === "Game") {
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
    //checks weather the tiger or lion or neither won and diplays the image
    //and message accordingly
  } else if (state === "GameOver") {
    if (tiger.health === 0 && lion.health === 0) {
      text("Nobody won!", width / 2, height / 2);
    } else if (tiger.health <= 0) {
      imageMode(CENTER);
      image(lionImg, width / 2, height / 2, winImgSize, winImgSize);
      text("Won!", width / 2, (height / 2) + winImgSize);
    } else if (lion.health <= 0) {
      imageMode(CENTER);
      image(tigerImg, width / 2, height / 2, winImgSize, winImgSize);
      text("Won!", width / 2, (height / 2) + winImgSize);
    }
  }

}
//Swithces the screens from menu to game
function mousePressed() {
  if (state === "Menu") {
    state = "Game";
  }
}

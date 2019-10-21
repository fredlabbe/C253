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


// preload()
//
// Description of preload

function preload() {

}


// setup()
//
// Description of setup

function setup() {
  createCanvas(1280, 720);
  tiger = new Predator(width/2, height/2, 5, color(255, 165, 0), 40, 38, 40, 37, 39);
  lion = new Predator(random(0,width),random(0,height), 5, color(255, 10, 10), 40, 87, 83, 65, 68);
  antelope = new Prey(random(0,width),random(0,height),8, color(143, 111, 71), 15);
  warthog = new Prey(random(0,width),random(0,height),8, color(204, 168, 151), 10);

}


// draw()
//
// Description of draw()

function draw() {
  background(0);

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

  if(tiger.health<0 ){

  }

}

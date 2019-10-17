"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/


// This will contain our Predator object
let tiger;
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
  tiger = new Predator(width/2, height/2, 5, color(255, 165, 0), 40);
  antelope = new Prey(random(0,width),random(0,height),8, color(143, 111, 71), 15);
  warthog = new Prey(random(0,width),random(0,height),8, color(204, 168, 151), 10);

}


// draw()
//
// Description of draw()

function draw() {
  background(0);

  tiger.handleInput();
  tiger.move();
  antelope.move();
  warthog.move();

  tiger.display();
  antelope.display();
  warthog.display();
  tiger.handleEating(antelope);
  tiger.handleEating(warthog);

  if(tiger.health<0){

  }

}

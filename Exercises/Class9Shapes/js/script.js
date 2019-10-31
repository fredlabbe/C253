"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

let mySquare1;
let circle1;

// preload()
//
// Description of preload

function preload() {

}


// setup()
//
// Description of setup

function setup() {
  createCanvas(1000,1000);

  mySquare1 = new Square(random(0,width),random(0,height),100,150);
  circle1 = new Circle(random(0,width),random(0,height),100);
}


// draw()
//
// Description of draw()

function draw() {
  background(255);

  mySquare1.update();
  mySquare1.display();

  circle1.update();
  circle1.display();
}

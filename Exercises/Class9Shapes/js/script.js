"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

let square;
let circle;

let shapes = [];
function setup() {
  createCanvas(windowWidth,windowHeight);

  for(let i = 0; i<100; i++){
    square = new Square(random(0,width),random(0,height),100,color(0,0,255));
    shapes.push(square);
  }

  for(let i = 0; i<100; i++){
    circle = new Circle(random(0,width),random(0,height),200);
    shapes.push(circle);
  }
}
function draw() {
  background(255);
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].update();
    shapes[i].display();
  }
}

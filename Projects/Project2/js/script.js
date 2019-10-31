// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predator
let tiger;

// The three prey
//let player;
let zebra;
let bee;

//the player
let player;

//animation array
let walkAnimation = [];

//state variable containing the state of the game
let state = "Menu";

//preload()
//
//preloads the images and sounds
function preload(){
  //the images
  for(let i = 0; i < 2; i++){
    let image = loadImage("assets/animations/playerWalking/walkingAnimation"+i+".png");
    walkAnimation.push(image);
    console.log("assets/animations/playerWalking/walkingAnimation"+i+".png");

  }

  //frameRate(10);
}
// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(100, 100, 5, color(200, 200, 0), 40,walkAnimation);
  player = new Prey(500, 500, 3, color(255, 100, 10), 50);
  //zebra = new Prey(100, 100, 8, color(255, 255, 255), 60);
  //bee = new Prey(100, 100, 20, color(255, 255, 0), 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(200,200,200);

  if(state === "Menu"){
    textSize(50);
    textAlign(CENTER);
    text("Click to play", (width / 2), (height / 2));

  }
  if(state === "Narrative"){
    text("Narrative", (width / 2), (height / 2));
  }
  if(state === "Game"){
    // Handle input for the tiger
    player.handleInput();

    // Move all the "animals"
    tiger.move();
    player.move();
    //zebra.move();
    //bee.move();

    // Handle the tiger eating any of the prey
    tiger.handleEating(player);
    //tiger.handleEating(zebra);
    //tiger.handleEating(bee);

    // Display all the "animals"
    tiger.display();
    player.display();
    //zebra.display();
    //bee.display();
  }

}

function mousePressed() {

  if (state === "Menu") {
    state = "Narrative";
  } else if (state === "Narrative") {
    state = "Game";
  } else if (state === "GameOver") {
    state = "Menu";
    //Should reset all the values to beginning values
  }
}

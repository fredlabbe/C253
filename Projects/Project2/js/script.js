// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predator
let tiger;

//the player
let player;

//the potion
let potion;

//animation array
let walkAnimation = [];

//state variable containing the state of the game
let state = "Menu";

//variables for counting the frames and the rate
//at which they change in the animation
let currentFrame = 0;
let animationRate = 10;//in frames per seconds

//images
let potionImg;

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
  potionImg = loadImage("assets/images/potion.png");

  //the framerate of the program
  frameRate(30);
}
// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(100, 100, 10, color(200, 200, 0), 40,walkAnimation, currentFrame,animationRate);
  player = new Prey(500, 500, 3, color(255, 100, 10), 50);
  potion = new Potion(500,500,50,potionImg);

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
    let playText = text("Click to play", (width / 2), (height / 2));
    //playText.mouseOver(textHover);
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
    //handles if the player drinks the potion
    potion.handleHealing(player);

    // Display all the "animals"
    tiger.display();
    potion.display();
    //player.display();
    push();
    imageMode(CENTER);
    if(player.isMoving === true || player.isMovingSideways === true){
    //this.size = this.health;
    //if(this.isMoving === true){
        image(walkAnimation[currentFrame],player.x,player.y,player.size * 2, player.size* 2);
        //Checking to see if the currentFrame of the overall program is a
        //multiple of the frameRate of the animation by using modulo (%).
        //Only changes the frames if it is.
        if((frameCount % floor(frameRate())/animationRate)){
          currentFrame++;
          if(currentFrame >= walkAnimation.length){
            currentFrame = 0;
          }
        }
      }
      else{
        image(walkAnimation[0],player.x,player.y,player.size * 2, player.size* 2);
      }
        pop();
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

function textHover(){
  push();
  fill(150,150,150);
  pop();
}

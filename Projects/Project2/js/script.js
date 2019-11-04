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

//the Wall
let wall;

//the door and its properties
let door;
let doorX;
let doorY;

//animation array
let playerWalkAnimation = [];
let orcLeftAnimation = [];
let orcRightAnimation = [];

//state variable containing the state of the game
let state = "Menu";

//variables for counting the frames and the rate
//at which they change in the animation
let currentFrame = 0;
let animationRate = 10;//in frames per seconds

//images
let potionImg;
let backgroundImg;
let doorImg;

//preload()
//
//preloads the images and sounds
function preload(){
  //the images
  for(let i = 0; i < 3; i++){
    let playerImage = loadImage("assets/animations/playerWalking/walkingAnimation"+i+".png");
    playerWalkAnimation.push(playerImage);
    console.log("assets/animations/playerWalking/walkingAnimation"+i+".png");
    let orcLeftImage = loadImage("assets/animations/orcWalking/leftWalking/orcAnimation"+i+".png");
    orcLeftAnimation.push(orcLeftImage);
    let orcRightImage = loadImage("assets/animations/orcWalking/rightWalking/orcAnimation"+i+".png")
    orcRightAnimation.push(orcRightImage);
  }
  potionImg = loadImage("assets/images/potion.png");
  doorImg = loadImage("assets/images/door.png");
  backgroundImg = loadImage("assets/images/background.png");

  //the framerate of the program
  frameRate(20);
}
// setup()
//
// Sets up a canvas
// Creates objects for the predator, the player, the potions and the walls
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(100, 100, 20, color(200, 200, 0), 60,playerWalkAnimation, currentFrame,animationRate);
  player = new Prey(30, 30, 6, color(255, 100, 10), 50);
  potion = new Potion(500,500,50,potionImg);
  wall = new Wall(0,80,700,30);
  door = new Door(doorX,doorY,100,200,doorImg,state);

  //setting up the door properties
  doorX = windowWidth - 100;
  doorY = windowHeight - 100;
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  //putting the dungeon backgound under everything on the canvas
  image(backgroundImg, 0, 0, width, height);

  if(state === "Menu"){
    textSize(50);
    textAlign(CENTER);
    let playText = text("Click to play", (width / 2), (height / 2));
    //playText.mouseOver(textHover);
  }
  if(state === "Narrative"){
    text("Narrative", (width / 2), (height / 2));
  }
  if(state === "Level1"){
    // Handle input for the tiger
    player.handleInput();

    // Move all the "animals"
    tiger.move();
    player.move();

    // Handle the tiger eating any of the prey
    tiger.handleEating(player);

    //handles if the player drinks the potion
    potion.handleHealing(player);

    //handling the solid characteristics of a wall object
    //in relationship to the player
    wall.handleSolid(player);

    // Display all the "animals"
    //tiger.display();
    potion.display();
    wall.display();
    //door.display();

    //player.display();
    push();
    imageMode(CENTER);
    if(player.isMoving === true || player.isMovingSideways === true){
    //this.size = this.health;
    //if(this.isMoving === true){
        image(playerWalkAnimation[currentFrame],player.x,player.y,player.size * 2, player.size* 2);
        //Checking to see if the currentFrame of the overall program is a
        //multiple of the frameRate of the animation by using modulo (%).
        //Only changes the frames if it is.
        if((frameCount % floor(frameRate())/animationRate)){
          currentFrame++;
          if(currentFrame >= playerWalkAnimation.length){
            currentFrame = 0;
          }
        }
      }
      else{
        image(playerWalkAnimation[0],player.x,player.y,player.size * 2, player.size* 2);
      }
        pop();

  //orc animation when it moves left
  push();
  imageMode(CENTER);
  if(tiger.vx < 0){
    image(orcLeftAnimation[currentFrame],tiger.x,tiger.y,tiger.size*2,tiger.size*2);
    //Checking to see if the currentFrame of the overall program is a
    //multiple of the frameRate of the animation by using modulo (%).
    //Only changes the frames if it is.
    if((frameCount % floor(frameRate())/animationRate)){
      currentFrame++;
      if(currentFrame >= playerWalkAnimation.length){
        currentFrame = 0;
      }
    }
  }
  if(tiger.vx > 0){
    image(orcRightAnimation[currentFrame],tiger.x,tiger.y,tiger.size*2,tiger.size*2);
    //Checking to see if the currentFrame of the overall program is a
    //multiple of the frameRate of the animation by using modulo (%).
    //Only changes the frames if it is.
    if((frameCount % floor(frameRate())/animationRate)){
      currentFrame++;
      if(currentFrame >= playerWalkAnimation.length){
        currentFrame = 0;
      }
    }
  }
  pop();
  }
  else if(state === "Level 2"){
    //the code for the level 2
  }
  else if(state === "Level 3"){
    //the code for the level 3
  }
}

function mousePressed() {

  if (state === "Menu") {
    state = "Narrative";
  } else if (state === "Narrative") {
    state = "Level 1";
  } else if (state === "GameOver") {
    //Should reset all the values to beginning values
    state = "Menu";
  }
}

function textHover(){
  push();
  fill(150,150,150);
  pop();
}

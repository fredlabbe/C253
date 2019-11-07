// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our ennemies
let orcArray = [];
let orc1;

//the player
let player;

//the potion
let potion;

//the Walls
let wall1;
let wall2;

//the door and its properties
let door;
let doorX;
let doorY;

//the keys
let key;

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
let menuImg;
let narrativeImg;
let potionImg;
let backgroundImg;
let doorImg;
let keyImg;

//array containing the informations of the walls
let wallProperties = [
  {x: 0, y: 100, width: 500, height: 30},
  {x: 600,y: 200,width: 30,height: 500},
  {x: 560,y: 10,width: 800,height: 30}

];
//array containing the walls
let wallArray = [];

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
  keyImg = loadImage("assets/images/key.png");
  backgroundImg = loadImage("assets/images/background.png");
  menuImg = loadImage("assets/images/Menu.jpg");
  narrativeImg = loadImage("assets/images/Narrative.jpg");

  //the framerate of the program
  frameRate(20);
}
// setup()
//
// Sets up a canvas
// Creates objects for the predator, the player, the potions and the walls
function setup() {
  createCanvas(windowWidth, windowHeight);
  //setting up the door properties
  doorX = windowWidth - 150;
  doorY = windowHeight - 200;

  player = new Prey(30, 30, 6, color(255, 100, 10), 50, playerWalkAnimation, currentFrame,animationRate);

  //the wall array
  for(let i = 0; i< wallProperties.length; i++){
    wall = new Wall(wallProperties[i]);
    wallArray.push(wall);
  }
  //the array containing the orcs
  for(let i = 0; i< 3; i++){
    let orc = new Predator(100, 400, 20, 60,orcLeftAnimation,orcRightAnimation,currentFrame,animationRate);
    orcArray.push(orc);
  }
  //The objects of level 1
  potion = new Potion(500,500,50,potionImg);
  door = new Door(doorX,doorY,100,200,doorImg,"Level 1");
  key = new Key(700,200,keyImg);
  wall1 = new Wall(0,100,500,30);
  orc1 = new Predator(500, 500, 20, 60,orcLeftAnimation,orcRightAnimation,currentFrame,animationRate);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  //putting the dungeon backgound under everything on the canvas
  image(backgroundImg, 0, 0, width, height);
  if(state === "Menu"){
    //the menu image only for the menu
    image(menuImg, 0, 0, width, height);
  }
  if(state === "Narrative"){
    image(narrativeImg, 0, 0, width, height);
  }
  if(state === "Level 1"){
    // Handle input for the orc
    player.handleInput();

    // Move all the "animals"
    orc1.move();
    player.move();

    // Handle the orc eating any of the prey
    orc1.handleEating(player);

    //handles if the player drinks the potion
    potion.handleHealing(player);

    //handling the solid characteristics of a wall object
    //in relationship to the characters
    wall1.handleSolid(player);
    //wall2.handleSolid(player);
    //wall.handleSolid(orc);
    //wall2.handleSolid(orc);

    //handling if the key is found
    key.handleFound(player);

    //handling the exit of the player
    door.handleExit(player);
    //the walls
    for(let i = 0; i< wallArray.length; i++){
      wallArray[i].handleSolid(player);
      //wallArray[i].handleSolid(orc);
      wallArray[i].display();
    }
    //the orcs
    for(let i = 0; i< orcArray.length; i++){
      orcArray[i].move();
      orcArray[i].handleEating(player);
      orcArray[i].display();
    }

    // Display all the objects
    potion.display();
    wall1.display();
    //wall2.display();
    door.display();
    key.display();
    orc1.display();
    player.display();
    player.healthBar();
  }
  else if(state === "Level 2"){
    //the code for the level 2
  }
  else if(state === "Level 3"){
    //the code for the level 3
  }
  else if(state === "GameOver"){
    //Shows the game over screen and resets all values to starting values
    text("Game Over Click to play again!", (width / 2), (height / 2));

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

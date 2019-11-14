// A Waltz of Orcs
// by Frederick Labbe
//
// A dungeon game where the player has to flee from the orcs, get a key
//and open the door. Player can take a potion to gain back his/her health.
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
let animationRate = 10; //in frames per seconds

//images
let menuImg;
let narrativeImg;
let overImg;
let potionImg;
let backgroundImg;
let doorImg;
let keyImg;

//sounds
let keySFX;
let potionSFX;
let dieSFX;

//array containing the informations of the walls
let wallProperties = [{
    x: 0,
    y: 100,
    width: 500,
    height: 30
  },
  {
    x: 650,
    y: 100,
    width: 400,
    height: 30
  },
  {
    x: 600,
    y: 535,
    width: 30,
    height: 900
  },
  {
    x: 600,
    y: 285,
    width: 30,
    height: 400
  },
  {
    x: 900,
    y: 500,
    width: 250,
    height: 30
  },


];
//array containing the walls
let wallArray = [];

//preload()
//
//preloads the images and sounds
function preload() {
  //the images and animations
  for (let i = 0; i < 3; i++) {
    let playerImage = loadImage("assets/animations/playerWalking/walkingAnimation" + i + ".png");
    playerWalkAnimation.push(playerImage);
    console.log("assets/animations/playerWalking/walkingAnimation" + i + ".png");
    let orcLeftImage = loadImage("assets/animations/orcWalking/leftWalking/OrcAnimation" + i + ".png");
    orcLeftAnimation.push(orcLeftImage);
    let orcRightImage = loadImage("assets/animations/orcWalking/rightWalking/OrcAnimation" + i + ".png")
    orcRightAnimation.push(orcRightImage);
  }
  potionImg = loadImage("assets/images/potion.png");
  doorImg = loadImage("assets/images/door.png");
  keyImg = loadImage("assets/images/key.png");
  backgroundImg = loadImage("assets/images/background.png");
  menuImg = loadImage("assets/images/Menu.jpg");
  narrativeImg = loadImage("assets/images/Narrative.jpg");
  overImg = loadImage("assets/images/gameOver.jpg");

  //the sounds

  keySFX = loadSound('assets/sounds/key.wav');
  potionSFX = loadSound('assets/sounds/potion.wav');
  dieSFX = loadSound('assets/sounds/die.wav');
  //the framerate of the program
  frameRate(20);
}
// setup()
//
// Sets up a canvas
// Creates objects for the predator, the player, the potions and the walls
function setup() {
  createCanvas(1000, 800);
  //setting up the door properties
  doorX = width - 150;
  doorY = height - 150;

  player = new Prey(30, 30, 6, color(255, 100, 10), 50, playerWalkAnimation, currentFrame, animationRate);

  //the wall array
  for (let i = 0; i < wallProperties.length; i++) {
    wall = new Wall(wallProperties[i].x, wallProperties[i].y, wallProperties[i].width, wallProperties[i].height);
    wallArray.push(wall);
  }
  //the array containing the orcs
  for (let i = 0; i < 3; i++) {
    let orc = new Predator(100, 400, 15, 60, orcLeftAnimation, orcRightAnimation, currentFrame, animationRate);
    orcArray.push(orc);
  }
  //The objects of level 1
  potion = new Potion(500, 500, 50, potionImg);
  door = new Door(doorX, doorY, 100, 200, doorImg, "Level 1");
  key = new Key(100, 700, keyImg);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  //putting the dungeon backgound under everything on the canvas
  image(backgroundImg, 0, 0, width, height);
  if (state === "Menu") {
    //the menu image only for the menu
    image(menuImg, 0, 0, width, height);
  }
  if (state === "Narrative") {
    image(narrativeImg, 0, 0, width, height);
  }
  if (state === "Level 1") {
    // Handle input for the orc
    player.handleInput();

    // Move all the player
    player.move();

    //handles if the player drinks the potion
    potion.handleHealing(player);

    //handling if the key is found
    key.handleFound(player);

    //handling the exit of the player
    door.handleExit(player);

    // Display all the objects
    potion.display();
    door.display();
    key.display();

    //the walls
    //handling the solid characteristics of a wall object
    //in relationship to the characters
    for (let i = 0; i < wallArray.length; i++) {
      wallArray[i].handleSolid(player);
      for (let j = 0; j < orcArray.length; j++) {
        wallArray[i].handleSolid(orcArray[j]);
      }
      wallArray[i].display();
    }
    //the orcs
    // Handle the orc eating any of the prey and moves and display
    for (let i = 0; i < orcArray.length; i++) {
      orcArray[i].move();
      orcArray[i].handleEating(player);
      orcArray[i].display();
    }
    player.display();
    player.healthBar();
  } else if (state === "GameOver") {
    //Shows the game over screen and resets all values to starting values
    image(overImg, 0, 0, width, height);
    player.reset();
    key.isFound = false;
    potion.isDrank = false;

  }
}
// mousePressed()
//
//switches the state of the game, the screeens
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

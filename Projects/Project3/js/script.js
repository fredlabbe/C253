// A Waltz of Orcs
// by Frederick Labbe
//
// A dungeon game where the player has to flee from the orcs, get a key
//and open the door. Player can take a potion to gain back his/her health.

//camera & screen properties
let sceneWidth = 2768;
let sceneHeight = 1792;
let camXMin = 500;
let camXMax = 2200;
let camYMin = 350;
let camYMax = 1437;

// Our ennemies
let orcArray = [];
let orc1;

//array containing the projectiles
let projectiles = [];

//the player
let player;

//the potion
let potion;
let potion2;

//the Walls
let wall1;
let wall2;

//the door and its properties
let door;
let doorX;
let doorY;

//dungeon entry and its properties
let dungeonEntry;

//the keys
let key;
let dungeonKey;

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
let entryImg;
let keyImg;
let forestImg;
let fireballImg;
let treeImg;
let wallImg;
let necroImg;

//sounds
let keySFX;
let potionSFX;
let dieSFX;

//the cooldown to be able to shoot of player
let coolDown = 0;
let coolDownMax = 10;
//the cooldown of Necromancer
let necroCoolDown = 0;
let necroCoolDownMax = 20;

//the necromancers
let necro;

//array containing the informations of the walls of the dungeon
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
    y: 300,
    width: 250,
    height: 30
  },


];
//array containing the walls
let wallArray = [];

//array containing the trees' properties
let treeProperties = [{
    x: 540,
    y: 210,
    width: 100,
    height: 200
  },
  {
    x: 930,
    y: 195,
    width: 100,
    height: 200
  },
  {
    x: 1290,
    y: 150,
    width: 100,
    height: 200
  },
  {
    x: 1900,
    y: 330,
    width: 100,
    height: 200
  },
  {
    x: 1575,
    y: 210,
    width: 100,
    height: 200
  },


];
let treeArray = [];

//a basic tree
let tree;

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
  entryImg = loadImage("assets/images/Entry.png");
  keyImg = loadImage("assets/images/key.png");
  backgroundImg = loadImage("assets/images/background.png");
  menuImg = loadImage("assets/images/Menu.jpg");
  narrativeImg = loadImage("assets/images/Narrative.jpg");
  overImg = loadImage("assets/images/gameOver.jpg");
  forestImg = loadImage("assets/images/Tileset.jpg");
  fireballImg = loadImage("assets/images/fireball.png");
  treeImg = loadImage("assets/images/tree.png");
  wallImg = loadImage("assets/images/wall.png");
  necroImg = loadImage("assets/images/Necromancer.png");

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
// Creates objects for the Orc, the player, the potions and the walls
function setup() {
  createCanvas(1000, 700);
  //setting up the door properties
  doorX = width - 50;
  doorY = height - 100;

  player = new Player(315, 70, 15, 50, playerWalkAnimation, currentFrame, animationRate);

  //the wall array
  for (let i = 0; i < wallProperties.length; i++) {
    wall = new Wall(wallProperties[i].x, wallProperties[i].y, wallProperties[i].width, wallProperties[i].height, wallImg);
    wallArray.push(wall);
  }
  //the wall array
  for (let i = 0; i < treeProperties.length; i++) {
    tree = new Wall(treeProperties[i].x, treeProperties[i].y, treeProperties[i].width, treeProperties[i].height, treeImg);
    treeArray.push(tree);
  }
  //the array containing the orcs
  for (let i = 0; i < 3; i++) {
    let orc = new Orc(100, 400, 15, 60, orcLeftAnimation, orcRightAnimation);
    orcArray.push(orc);
  }
  //the necromancers
  necro = new Necromancer(500,500,0,100,necroImg);

  //the objects of the forest
  dungeonEntry = new Door(2550, 1380, 200, 200, entryImg, "Forest");
  dungeonKey = new Key(100, 500, keyImg);

  //The objects of Dungeon
  potion = new Potion(500, 500, potionImg, 50);
  potion2 = new Potion(500, 300, potionImg, 50);
  door = new Door(doorX, doorY, 100, 200, doorImg, "Dungeon");
  key = new Key(100, 600, keyImg);

   //forestImg = createSprite(0,0,640,480);
   //forestImg.addAnimation('default', "assets/images/Tileset.jpg");
  // forestImg.scale = 4;
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {

  if (state === "Menu") {
    //the menu image only for the menu
    image(menuImg, 0, 0, width, height);
  }
  if (state === "Narrative") {
    image(narrativeImg, 0, 0, width, height);
  }
  if(state === "Forest"){
    image(forestImg, 0, 0, sceneWidth, sceneHeight);
    //the camera follwing the player in p5.Play
    // console.log(player.x);
    // console.log(player.y);
    if(player.x > camXMin && player.x < camXMax){
     camera.position.x = player.x;
   }
   if(player.y > camYMin && player.y < camYMax){
     camera.position.y = player.y;
   }

    //the dungeon entry
    dungeonEntry.handleExit(player);

    //handling if the key is found
    dungeonKey.handleFound(player);

    // Handle input for the orc
    player.handleInput();

    // Move the player
    player.move();

    //checking the projectiles
    checkProjectiles();

    necro.shoot();
    necro.display();

    //the trees as walls
    //handling the solid characteristics of a wall object
    //in relationship to the characters
    for (let i = 0; i < treeArray.length; i++) {
      treeArray[i].handleSolid(player);
      treeArray[i].display();
    }

    //drawSprites(forestImg);

    dungeonEntry.display();
    dungeonKey.display();
    player.display();
    player.healthBar();
    player.magicBar();

  }
  if (state === "Dungeon") {
    //putting the dungeon backgound under everything on the canvas
    image(backgroundImg, 0, 0, width, height);
    // Handle input for the orc
    player.handleInput();

    // Move all the player
    player.move();

    //handles if the player drinks the potion
    potion.handleFound(player);
    potion2.handleFound(player);

    //handling if the key is found
    key.handleFound(player);

    //handling the exit of the player
    door.handleExit(player);

    // Display all the objects
    potion.display();
    potion2.display();
    door.display();
    key.display();

    checkProjectiles();

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
    // Handle the orc eating any of the Player and moves and displays
    for (let i = 0; i < orcArray.length; i++) {
      orcArray[i].move();
      orcArray[i].handleEating(player);
      orcArray[i].display();
    }
    player.display();
    player.healthBar();
    player.magicBar();
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
    state = "Forest";
  } else if(state === "Forest"){
    state = "Dungeon";
  }else if (state === "GameOver") {
    //Should reset all the values to beginning values
    state = "Menu";
  }
}
//checkProjectiles()
//
//manages the coolDowns of the characters and makes the projectiles
//move, displays them and checks if it hits something or went off screen
function checkProjectiles(){
  // The projectile cooldown determines when you can fire again (when it's at 0)
// So count down
coolDown -= 1;
necroCoolDown -=1 ;
console.log("works\n"+ necroCoolDown);
// Constrain the projectile cooldown to avoid weird numbers
coolDown = constrain(coolDown - 1, 0, coolDownMax)
necroCoolDown = constrain(necroCoolDown - 1, 0, necroCoolDownMax)
  for (var i = 0; i < projectiles.length; i++){
    // Go through all the projectiles and display the image for each one
    //handling the interactions between the projectiles and the character
    projectiles[i].display();
    projectiles[i].move();
    projectiles[i].update(necro);
    projectiles[i].update(player);
  //   if(state === "Dungeon"){
  //   for (let j = 0; j < orcArray.length; j++) {
  //     projectiles[i].update(orcArray[j]);
  //   }
  // }
  }
}

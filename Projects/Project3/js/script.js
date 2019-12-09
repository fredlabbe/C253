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

//the Wall objects
let wall1;
let rock;

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
let playerRightAnimation = [];
let playerLeftAnimation = [];
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
let rockImg;
let skullImg;

//sounds
let keySFX;
let potionSFX;
let dieSFX;
let orcDieSFX;
let necroDieSFX;
let fireballSFX;
let skullSFX;

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
    y: 150,
    width: 500,
    height: 30
  },
  {
    x: 650,
    y: 150,
    width: 400,
    height: 30
  },
  {
    x: 600,
    y: 750,
    width: 30,
    height: 400
  },
  {
    x: 600,
    y: 365,
    width: 30,
    height: 400
  },
  {
    x: 900,
    y: 350,
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
    width: 120,
    height: 200
  },
  {
    x: 930,
    y: 195,
    width: 120,
    height: 200
  },
  {
    x: 1290,
    y: 150,
    width: 120,
    height: 200
  },
  {
    x: 1900,
    y: 330,
    width: 120,
    height: 200
  },
  {
    x: 1575,
    y: 210,
    width: 120,
    height: 200
  },
  {
    x: 105,
    y: 850,
    width: 120,
    height: 200
  },
  {
    x: 215,
    y: 1682,
    width: 150,
    height: 230
  },
  {
    x: 770,
    y: 1642,
    width: 120,
    height: 200
  },
  {
    x: 1715,
    y: 1672,
    width: 120,
    height: 200
  },
  {
    x: 2395,
    y: 772,
    width: 120,
    height: 200
  },
  {
    x: 2035,
    y: 950,
    width: 160,
    height: 240
  },


];
//array containing the rocks' properties
let rockProperties = [{
    x: 65,
    y: 240,
    width: 120,
    height: 120
  },
  {
    x: 710,
    y: 170,
    width: 120,
    height: 120
  },
  {
    x: 915,
    y: 670,
    width: 200,
    height: 200
  },
  {
    x: 765,
    y: 710,
    width: 120,
    height: 120
  },
  {
    x: 555,
    y: 820,
    width: 100,
    height: 100
  },
  {
    x: 535,
    y: 980,
    width: 200,
    height: 200
  },
  {
    x: 635,
    y: 690,
    width: 100,
    height: 100
  },
  {
    x: 655,
    y: 1200,
    width: 150,
    height: 150
  },
  {
    x: 1075,
    y: 630,
    width: 100,
    height: 100
  },
  {
    x: 1205,
    y: 670,
    width: 160,
    height: 160
  },
  {
    x: 915,
    y: 1270,
    width: 190,
    height: 190
  },
  {
    x: 495,
    y: 1130,
    width: 100,
    height: 100
  },
  {
    x: 755,
    y: 1300,
    width: 100,
    height: 100
  },
  {
    x: 1075,
    y: 1230,
    width: 100,
    height: 100
  },
  {
    x: 1195,
    y: 1230,
    width: 200,
    height: 200
  },
  {
    x: 1335,
    y: 770,
    width: 170,
    height: 170
  },
  {
    x: 1355,
    y: 1210,
    width: 200,
    height: 200
  },
  {
    x: 1895,
    y: 890,
    width: 120,
    height: 120
  },
  {
    x: 2495,
    y: 950,
    width: 300,
    height: 300
  },
  {
    x: 2475,
    y: 230,
    width: 200,
    height: 200
  },
  {
    x: 2280,
    y: 850,
    width: 120,
    height: 120
  },
  {
    x: 2235,
    y: 1662,
    width: 170,
    height: 170
  },
  {
    x: 390,
    y: 1630,
    width: 150,
    height: 150
  },


];
let objectsArray = [];

let necroProperties = [{
    x: 1135,
    y: 1050,
    speed: 0,
    size: 100
  },
  {
    x: 1135,
    y: 900,
    speed: 0,
    size: 100
  },

];
let necroArray = [];

//a basic tree
let tree;

//preload()
//
//preloads the images and sounds
function preload() {
  //the images and animations
  for (let i = 0; i < 3; i++) {
    let playerImage = loadImage("assets/animations/playerWalking/walkingAnimation" + i + ".png");
    playerRightAnimation.push(playerImage);
    let playerLeftImage = loadImage("assets/animations/playerWalking/leftAnimation" + i + ".png");
    playerLeftAnimation.push(playerLeftImage);
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
  rockImg = loadImage("assets/images/rock.png");
  skullImg = loadImage("assets/images/skull.png");

  //the sounds

  keySFX = loadSound('assets/sounds/key.wav');
  potionSFX = loadSound('assets/sounds/potion.wav');
  dieSFX = loadSound('assets/sounds/playerDie.mp3');
  orcDieSFX = loadSound('assets/sounds/die.wav');
  fireballSFX = loadSound('assets/sounds/fire.wav');
  skullSFX = loadSound('assets/sounds/skull.wav');
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

  player = new Player(315, 70, 6, 100, playerRightAnimation, currentFrame, animationRate);

  //the wall array
  for (let i = 0; i < wallProperties.length; i++) {
    wall = new Wall(wallProperties[i].x, wallProperties[i].y, wallProperties[i].width, wallProperties[i].height, wallImg);
    wallArray.push(wall);
  }
  //the wall array
  for (let i = 0; i < treeProperties.length; i++) {
    tree = new Wall(treeProperties[i].x, treeProperties[i].y, treeProperties[i].width, treeProperties[i].height, treeImg);
    objectsArray.push(tree);
  }
  // continue loading the array containing the objects with the rocks and their properties
  for (let i = 0; i < rockProperties.length; i++) {
    rock = new Wall(rockProperties[i].x, rockProperties[i].y, rockProperties[i].width, rockProperties[i].height, rockImg);
    objectsArray.push(rock);
  }
  //the array containing the orcs with random values in a certain range for x & y
  for (let i = 0; i < 3; i++) {
    let orc = new Orc(random(100, 500), random(200, 700), 15, 60, orcLeftAnimation, orcRightAnimation);
    orcArray.push(orc);
  }
  for (let i = 0; i < necroProperties.length; i++) {
    necro = new Necromancer(necroProperties[i].x, necroProperties[i].y, necroProperties[i].speed, necroProperties[i].size, necroImg);
    necroArray.push(necro);
  }

  //the objects of the forest
  dungeonEntry = new Door(2550, 1380, 200, 200, entryImg, "Forest");
  dungeonKey = new Key(795, 1100, keyImg);

  //The objects of Dungeon
  potion = new Potion(500, 500, potionImg, 50);
  potion2 = new Potion(500, 300, potionImg, 50);
  door = new Door(doorX, doorY, 100, 200, doorImg, "Dungeon");
  key = new Key(100, 600, keyImg);
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
  if (state === "Forest") {
    image(forestImg, 0, 0, sceneWidth, sceneHeight);
    //the camera follwing the player in p5.Play
    if (player.x > camXMin && player.x < camXMax) {
      camera.position.x = player.x;
    }
    if (player.y > camYMin && player.y < camYMax) {
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

    //the necromancers
    for (let i = 0; i < necroArray.length; i++) {
      necroArray[i].shoot();
      necroArray[i].display();
    }
    //the trees as walls
    //handling the solid characteristics of a wall object
    //in relationship to the characters
    for (let i = 0; i < objectsArray.length; i++) {
      objectsArray[i].handleSolid(player);
      objectsArray[i].display();
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
    //checking the projectiles and part of their collisions
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
  } else if (state === "GameOver") {
    //Should reset all the values to beginning values
    state = "Menu";
  }
}
//checkProjectiles()
//
//manages the coolDowns of the characters and makes the projectiles
//move, displays them and checks if it hits something or went off screen
function checkProjectiles() {
  // The projectile cooldown determines when you can fire again (when it's at 0)
  // So count down
  coolDown -= 1;
  necroCoolDown -= 1;
  // Constrain the projectile cooldown to avoid weird numbers
  coolDown = constrain(coolDown - 1, 0, coolDownMax)
  necroCoolDown = constrain(necroCoolDown - 1, 0, necroCoolDownMax)
  for (var i = 0; i < projectiles.length; i++) {
    // Go through all the projectiles and display the image for each one
    //handling the interactions between the projectiles and the character
    projectiles[i].display();
    projectiles[i].move();
    projectiles[i].update(player);
    projectiles[i].checkDelete(objectsArray);
    projectiles[i].checkDelete(wallArray);
    for (let j = 0; j < orcArray.length; j++) {
      projectiles[i].update(orcArray[j]);
    }
    //checking for the necromancers
    for (let j = 0; j < necroArray.length; j++) {
      projectiles[i].update(necroArray[j]);
    }
  }
  //taking out the objects that must be deleted by taking into account the fact
  //that when you take out from an array, you make it shrink and it can lead to
  //issues and errors (that was the way I found to solve my errors)
  for (let i = projectiles.length - 1; i >= 0; i--) {
    if (projectiles[i].toDelete === true) {
      projectiles.splice(i, 1);
    }
  }
  for (let i = orcArray.length - 1; i >= 0; i--) {
    if (orcArray[i].toDelete === true) {
      orcArray.splice(i, 1);
    }
  }
}

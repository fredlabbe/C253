// Player
//
// A class that represents a simple Player that moves
// on screen based on a noise() function. It can move around
// the screen and be consumed by Orc objects.

class Player extends Character{

  // constructor
  //
  // Sets the initial values for the Orc's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, size, walkAnimation, currentFrame, animationRate) {
    super(x,y,speed,size);

    //healthbar properties
    this.healthBarX = 10;
    this.barY = height - 50;//same value in Y for both bars
    this.healthBarOff = 480;
    //magicBar properties
    this.magicBarX = width-310;//10 pixels between the end of the 200px bar and the end of screen
    this.magicBarOff = this.magicBarX - 520;
    //magic properties
    this.magic = 100;
    this.maxMagic = 100;
    // Health properties
    this.maxHealth = size;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    // Display properties
    this.size = this.health;
    // Input properties
    this.upKey = 87; //W
    this.downKey = 83; //S
    this.leftKey = 65; //A
    this.rightKey = 68; //D
    this.shootKey = 32; //Spacebar to shoot
    //the animation
    this.walkAnimation = walkAnimation;
    //booleans to know if the object is moving
    this.isMoving = false;
    this.isMovingSideways = false;
    //properties for the frames and animation
    this.currentFrame = currentFrame;
    this.animationRate = animationRate;
    this.frame = 0;
  }

  // handleInput
  //
  // Checks if an arrow key is pressed and sets the Orc's
  // velocity appropriately.
  handleInput() {
    // Horizontal movement
    if (keyIsDown(this.leftKey)) {
      this.vx = -this.speed;
      this.isMovingSideways = true;
    } else if (keyIsDown(this.rightKey)) {
      this.vx = this.speed;
      this.isMovingSideways = true;
    } else {
      this.vx = 0;
      this.isMovingSideways = false;
    }
    // Vertical movement
    if (keyIsDown(this.upKey)) {
      this.vy = -this.speed;
      this.isMoving = true;
    } else if (keyIsDown(this.downKey)) {
      this.vy = this.speed;
      this.isMoving = true;
    } else {
      this.vy = 0;
      this.isMoving = false;
    }
    //shooting the fireball when the space bar is pressed
    if(keyIsDown(this.shootKey)){
    // Check if the shoot key is pressed and the cooldown is at 0 so you can fire
    //and when you have magic
    if (coolDown === 0 && this.magic > 0) {
      let projectile = new Projectile(this.x+this.size,this.y,30,30,0,fireballImg);
      // Add the projectile to the projectiles array of the ship
      projectiles.push(projectile);
      this.magic -=20;
      console.log("WORKS");
      }
      // Set the cooldown to max so it can start counting down
      coolDown = coolDownMax;
    }
  }

  // display
  //
  // Draw the Player as an image on the canvas
  // with a constant size that does not change with its health.
  display() {
    push();
    imageMode(CENTER);
    if (this.isMoving === true || this.isMovingSideways === true) {
      image(playerWalkAnimation[currentFrame], this.x, this.y, this.size * 2, this.size * 2);
      //Checking to see if the currentFrame of the overall program is a
      //multiple of the frameRate of the animation by using modulo (%).
      //Only changes the frames if it is.
      if ((frameCount % floor(frameRate()) / animationRate)) {
        currentFrame++;
        if (currentFrame >= playerWalkAnimation.length) {
          currentFrame = 0;
        }
      }
    } else {
      image(playerWalkAnimation[0], this.x, this.y, this.size * 2, this.size * 2);
    }
    pop();
  }

  // reset
  //
  // Set the position to a random location and reset health
  // and size back to default
  reset() {
    if(state === "Forest"){
      camera.position.x = 500;
      camera.position.y = 370;
    this.x = 315;
    this.y = 70;

    //healthbar properties
    this.healthBarX = 10;
    this.barY = height - 50;//same value in Y for both bars
    this.healthBarOff = 480;
    //magicBar properties
    this.magicBarX = width-310;//10 pixels between the end of the 200px bar and the end of screen
    this.magicBarOff = this.magicBarX - 520;
  }
    if(state === "Dungeon"){
    this.x = 50;
    this.y = 50;
  }
    // Default health
    this.health = this.maxHealth;
    // default magic
    this.magic = this.maxMagic;
  }

  // healthBar()
  //
  //creates the player's healthBar by mapping it to the health and max health
  //and using a rectangle
  healthBar() {

    //making the healthbar follow the player but not at the edges
    //of the background image
    if(player.y > camYMin && player.y < camYMax && state === "Forest"){
    this.barY = player.y + 280;
  }
    if(player.y > camYMax && state === "Forest"){
      this.barY = sceneHeight - 50;
    }
    if(player.x > camXMin && state === "Forest"){
      // a satisfying distance so the healthbar is not off
      //when it follows the player
      this.healthBarX = player.x - this.healthBarOff;
      if(player.x > camXMax){
        this.healthBarX = camXMax - this.healthBarOff;
      }
    if(state === "Dungeon"){
      //putting back the values when the camera doesn't move
      this.healthBarX = 10;
      this.barY = height - 50;
    }
  }
    let healthSize;
    healthSize = map(this.health, 0, this.maxHealth, 0, 300);
    push();
    //dark red color
    fill(125, 37, 32);
    //creating the red rectangle
    rect(this.healthBarX, this.barY, 300, 20);
    //the green color
    fill(60, 94, 55);
    //creating the rectangle that is mapped, the green one, the life
    rect(this.healthBarX, this.barY, healthSize, 20);
    pop();

  }

  // magicBar()
  //
  //creates the player's magicBar by mapping it to the magic and max magic
  //and using a rectangle
  magicBar() {

    if(this.magic<100){
      //always increasing the magic as it restores with time but slower than how
      //much it takes to fire the spell
      this.magic+=0.5;
    }
    //making the healthbar follow the player but not at the edges
    //of the background image
    if(player.x > camXMin && state === "Forest"){
      // a satisfying distance so the healthbar is not off
      //when it follows the player
      this.magicBarX = player.x + this.magicBarOff;
      if(player.x > camXMax){
        this.magicBarX = camXMax + this.magicBarOff;
      }
    if(state === "Dungeon"){
      //putting it back to the starting value
      this.magicBarX = width-310;
    }
  }
    let magicSize;
    magicSize = map(this.magic, 0, this.maxMagic, 0, 300);

    push();
    //light blue color
    fill(178, 189, 244);
    //creating the light blue rectangle on bottom
    rect(this.magicBarX, this.barY, 300, 20);
    if(this.magic > 0){
    //the dark blue color on top
    fill(66, 87, 191);
    //creating the rectangle that is mapped, the dark blue one, the magic
    rect(this.magicBarX, this.barY, magicSize, 20);
  }
    pop();
  }
}

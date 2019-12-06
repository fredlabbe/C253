// Player
//
// A class that represents a simple Player that moves
// on screen based on a noise() function. It can move around
// the screen and be consumed by Predator objects.

class Player extends Character{

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, size, walkAnimation, currentFrame, animationRate) {
    super(x,y,speed,size);
    this.barX = 10;
    this.barY = height - 50;
    this.barOff = 480;

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
  // Checks if an arrow key is pressed and sets the predator's
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
    if(keyIsDown(this.shootKey)){
      let projectile = new Projectile(this.x,this.y,30,10,0,fireballImg);
      projectile.shoot();
      console.log("WORKS");
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
    // Random position
    this.x = 50;
    this.y = 50;
    // Default health
    this.health = this.maxHealth;
    // Default size
    this.size = this.health;
  }

  // healthBar()
  //
  //creates the player's healthBar by mapping it to the health and max health
  //and using a rectangle
  healthBar() {

    //making the healthbar follow the player but not at the edges
    //of the background image
    if(player.x > camXMin && state === "Forest"){
      // a satisfying distance so the healthbar is not off
      //when it follows the player
      this.barX = player.x - this.barOff;
      if(player.x > camXMax){
        this.barX = camXMax - this.barOff;
      }
    if(state === "Dungeon"){
      this.barX = 10;
    }
  }
    let healthSize;
    healthSize = map(this.health, 0, this.maxHealth, 0, 300);
    push();
    //dark red color
    fill(125, 37, 32);
    //creating the red rectangle
    rect(this.barX, this.barY, 300, 20);
    //the green color
    fill(60, 94, 55);
    //creating the rectangle that is mapped, the green one, the life
    rect(this.barX, this.barY, healthSize, 20);
    pop();

  }
}

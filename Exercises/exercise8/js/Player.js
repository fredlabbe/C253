// Player
//
// A class that represents a simple Player that moves
// on screen based on a noise() function. It can move around
// the screen and be consumed by Predator objects.

class Player {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, fillColor, size, walkAnimation, currentFrame, animationRate) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    this.barX = 10;
    this.barY = height - 50;

    // Health properties
    this.maxHealth = size;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    // Display properties
    this.fillColor = fillColor;
    this.size = this.health;
    // Input properties
    this.upKey = 87; //W
    this.downKey = 83; //S
    this.leftKey = 65; //A
    this.rightKey = 68; //D

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
  }

  // move
  //
  // Updates the position according to velocity
  // Lowers health (as a cost of living)
  // Handles wrapping
  move() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    console.log(this.vx);
    // Update health
    //this.health = this.health - this.healthLossPerMove;
    //this.health = constrain(this.health, 0, this.maxHealth);
    // Handle wrapping
    //this.handleWrapping();
    this.handleBoundaries();
  }

  // handleBoundaries()
  //
  // Checks if the Player has gone off the canvas and
  // prevents it from it, as a wall would do
  handleBoundaries() {
    this.x = constrain(this.x, 0 + this.size / 2, width - this.size);
    this.y = constrain(this.y, 0 + this.size / 2, height - this.size);
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
    let healthSize;
    healthSize = map(this.health, 0, this.maxHealth, 0, 300);
    push();
    //dark red color
    fill(125, 37, 32);
    //creating the red rectangle
    rect(10, this.barY, 300, 20);
    //the green color
    fill(60, 94, 55);
    //creating the rectangle that is mapped, the green one, the life
    rect(10, this.barY, healthSize, 20);
    pop();

  }
}

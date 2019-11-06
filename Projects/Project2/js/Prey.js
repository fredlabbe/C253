// Prey
//
// A class that represents a simple prey that moves
// on screen based on a noise() function. It can move around
// the screen and be consumed by Predator objects.

class Prey {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, fillColor, size,walkAnimation,currentFrame,animationRate) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;

    // Health properties
    this.maxHealth = size;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    // Display properties
    this.fillColor = fillColor;
    this.size = this.health;
    // Input properties
    this.upKey = 87;//W
    this.downKey = 83;//S
    this.leftKey = 65;//A
    this.rightKey = 68;//D

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
    }
    else if (keyIsDown(this.rightKey)) {
      this.vx = this.speed;
      this.isMovingSideways = true;
    }
    else {
      this.vx = 0;
      this.isMovingSideways = false;
    }
    // Vertical movement
    if (keyIsDown(this.upKey)) {
      this.vy = -this.speed;
      this.isMoving = true;
    }
    else if (keyIsDown(this.downKey)) {
      this.vy = this.speed;
      this.isMoving = true;
    }
    else {
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
  // Checks if the prey has gone off the canvas and
  // prevents it from it, as a wall would do
  handleBoundaries(){
    // Off the left or right
    if (this.x < 0) {
      this.x += this.speed+this.size/2;
    }
    else if (this.x > width) {
      this.x -= this.speed-this.size/2;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += this.speed+this.size/2;
    }
    else if (this.y > height) {
      this.y -= this.speed-this.size/2;
    }
  }

  // display
  //
  // Draw the prey as an image on the canvas
  // with a constant size that does not change with its health.
  display() {
    push();
    imageMode(CENTER);
    if(this.isMoving === true || this.isMovingSideways === true){
    //this.size = this.health;
    //if(this.isMoving === true){
        image(playerWalkAnimation[currentFrame],this.x,this.y,this.size * 2, this.size* 2);
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
        image(playerWalkAnimation[0],this.x,this.y,this.size * 2, this.size* 2);
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
}

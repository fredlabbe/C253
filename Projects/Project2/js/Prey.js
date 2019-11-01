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
    this.upKey = UP_ARROW;
    this.downKey = DOWN_ARROW;
    this.leftKey = LEFT_ARROW;
    this.rightKey = RIGHT_ARROW;

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
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the prey has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
    }
    else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += height;
    }
    else if (this.y > height) {
      this.y -= height;
    }
  }

  // display
  //
  // Draw the prey as an ellipse on the canvas
  // with a size the same size as its current health.
  display() {
  //   push();
  //   //this.size = this.health;
  //   imageMode(CENTER);
  //   //if(this.isMoving === true){
  //       image(walkAnimation[this.currentFrame],this.x,this.y,80,80);
  //       //Checking to see if the currentFrame of the overall program is a
  //       //multiple of the frameRate of the animation by using modulo (%).
  //       //Only changes the frames if it is.
  //       if((this.frameCount % frameRate())/this.animationRate){
  //         this.currentFrame++;
  //         if(this.currentFrame >= walkAnimation.length){
  //           this.currentFrame = 0;
  //         }
  //       }
  //
  //       // if(this.frame === 1){
  //       //   this.frame = 0;
  //       // }
  //       // else{
  //       //   this.frame = 1;
  //       // }
  //   // }
  //   // else{
  //   //     image(walkAnimation[0],this.x,this.y,this.size * 2, this.size* 2);
  //   // }
  //   pop();
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

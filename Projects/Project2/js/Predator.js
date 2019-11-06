// Predator
//
// A class that represents a simple predator
// controlled by the arrow keys. It can move around
// the screen and consume Prey objects to maintain its health.

class Predator {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, fillColor, size, orcLeftAnimation, orcRightAnimation, currentFrame,animationRate) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Time properties for noise() function
    this.tx = random(0, 1000); // To make x and y noise different
    this.ty = random(0, 1000); // we use random starting values
    // Health properties
    this.maxHealth = size;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    this.healthLossPerMove = 0.1;
    this.healthGainPerEat = 1;
    // Display properties
    this.size = this.health; // size is defined in terms of health
    this.orcLeftAnimation = orcLeftAnimation;
    this.orcRightAnimation = orcRightAnimation;

    //the frames
    this.currentFrame = currentFrame;
    this.animationRate = animationRate;
  }

  // move
  //
  // Sets velocity based on the noise() function and the Prey's speed
  // Moves based on the resulting velocity and handles wrapping
  move() {
    // Set velocity via noise()
    this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update time properties
    this.tx += 0.01;
    this.ty += 0.01;
    // Handle wrapping
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
      this.x -= this.speed+this.size/2;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += this.speed+this.size/2;
    }
    else if (this.y > height) {
      this.y -= this.speed+this.size/2;
    }
  }

  // handleEating
  //
  // Takes a Prey object as an argument and checks if the predator
  // overlaps it. If so, reduces the prey's health and increases
  // the predator's. If the prey dies, it gets reset.
  handleEating(prey) {
    // Calculate distance from this predator to the prey
    let d = dist(this.x, this.y, prey.x, prey.y);
    // Check if the distance is less than their two sizes (an overlap)
    if (d < this.size + prey.size) {
      // Increase predator health and constrain it to its possible range
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);
      // Decrease prey health by the same amount
      prey.health -= this.healthGainPerEat;
      // Check if the prey died and reset it if so
      if (prey.health < 0) {
        prey.reset();
      }
    }
  }

  // display
  //
  // Draw the predator as an ellipse on the canvas
  // with a size the same size as its current health.
  display() {
    //orc animation when it moves left
    push();
    imageMode(CENTER);
    if(this.vx < 0){
      image(orcLeftAnimation[currentFrame],this.x,this.y,this.size*2,this.size*2);
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
    //orc animation when it moves right
    if(this.vx > 0){
      image(orcRightAnimation[currentFrame],this.x,this.y,this.size*2,this.size*2);
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
}

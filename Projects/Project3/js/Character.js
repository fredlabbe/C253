// Character
//
// A parent class that represents a simple character
//
//
class Character{

  // constructor
  //
  // Sets the initial values for the Character's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, size) {
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
    //the offset of characters
    this.charOff = size/2;
    //solid interactions properties so it looks right
    this.endForestX = 2660;
    this.endForestY = 1792 - this.charOff;
  }

  // move
  //
  // Updates the position according to velocity
  //handles the boundaries
  move(){
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    this.handleBoundaries();
  }

  // handleBoundaries()
  //
  // Checks if the Character has gone off the canvas and
  // prevents it from it, as a wall would do
  handleBoundaries() {
    //at the edges at 0, constrain from the size of the character/2
    //and at edges right and down, only with size because it looks
    //better
    if(state === "Forest"){
      this.x = constrain(this.x,0 + this.charOff, this.endForestX);
      this.y = constrain(this.y,0 + this.charOff, this.endForestY);
    }
    else{
      this.x = constrain(this.x, 0 + this.charOff, width - this.size);
      this.y = constrain(this.y, 0 + this.charOff, height - this.size);
    }
  }
}

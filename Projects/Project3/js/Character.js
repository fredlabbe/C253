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


    // this.x = constrain(this.x, 0 + this.size / 2, width - this.size);
    // this.y = constrain(this.y, 0 + this.size / 2, height - this.size);

    // this.x = constrain(0, 2768);
    // this.y = constrain(0, 1792);

  }
}

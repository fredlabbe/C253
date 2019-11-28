// Predator
//
// A class that represents a simple predator
// controlled by the arrow keys. It can move around
// the screen and consume Player object.

class Predator extends Character{

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, size, orcLeftAnimation, orcRightAnimation) {
    super(x,y,speed,size);
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
  }

  // move
  //
  // Sets velocity based on the noise() function and the Predaror's speed
  // Moves based on the resulting velocity and handles the boundaries
  move() {
    // Set velocity via noise()
    if (random() < 0.05) {
      this.vx = map(random(), 0, 1, -this.speed, this.speed);
      this.vy = map(random(), 0, 1, -this.speed, this.speed);
    }
    super.move();
    // Update time properties
    this.tx += 0.01;
    this.ty += 0.01;
  }

  // handleEating
  //
  // Takes a Player object as an argument and checks if the predator
  // overlaps it. If so, reduces the Player's health and increases
  // the predator's. If the Player dies, it gets reset.
  handleEating(Player) {
    // Calculate distance from this predator to the Player
    let d = dist(this.x, this.y, Player.x, Player.y);
    // Check if the distance is less than their two sizes (an overlap)
    if (d < this.size + Player.size) {
      // Increase predator health and constrain it to its possible range
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);
      // Decrease Player health by the same amount
      Player.health -= this.healthGainPerEat;
      // Check if the Player died and reset it if so
      if (Player.health < 0) {
        dieSFX.play();
        Player.reset();
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
    if (this.vx < 0) {
      image(orcLeftAnimation[currentFrame], this.x, this.y, this.size * 2, this.size * 2);
      //Checking to see if the currentFrame of the overall program is a
      //multiple of the frameRate of the animation by using modulo (%).
      //Only changes the frames if it is.
      if ((frameCount % floor(frameRate()) / animationRate)) {
        currentFrame++;
        if (currentFrame >= playerWalkAnimation.length) {
          currentFrame = 0;
        }
      }
    }
    //orc animation when it moves right or at a wall
    if (this.vx >= 0) {
      image(orcRightAnimation[currentFrame], this.x, this.y, this.size * 2, this.size * 2);
      //Checking to see if the currentFrame of the overall program is a
      //multiple of the frameRate of the animation by using modulo (%).
      //Only changes the frames if it is.
      if ((frameCount % floor(frameRate()) / animationRate)) {
        currentFrame++;
        if (currentFrame >= playerWalkAnimation.length) {
          currentFrame = 0;
        }
      }
    }
    pop();
  }
}

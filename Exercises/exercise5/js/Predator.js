//
//This is an example of classes in js. This is a Predator class,
//creating predators
// A Predator class describes what a Predator is and does
class Predator {

  //creates the predator
  constructor(x, y, speed, fillColor, radius, up, down, left, right, sprint, img) {
    // Sets up the Predator when it is created or "constructed"
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.maxHealth = radius; // Maximum health is the starting radius
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    this.healthLossPerMove = 0.1;
    this.healthGainPerEat = 1;
    this.speed = speed;
    this.fillColor = fillColor;
    this.radius = this.health; // Radius is matched to health
    this.upKey = up;
    this.downKey = down;
    this.leftKey = left;
    this.rightKey = right;
    this.sprintKey = sprint;
    this.sprintSpeed = 10;
    this.preyAmt = 0;
    this.image = img;
    this.healthBar = 0;
  }

  // Check for player input and react appropriately
  handleInput() {
    if (keyIsDown(this.leftKey)) {
      this.vx = -this.speed;
    } else if (keyIsDown(this.rightKey)) {
      this.vx = this.speed;
    } else {
      this.vx = 0;
    }
    if (keyIsDown(this.upKey)) {
      this.vy = -this.speed;
    } else if (keyIsDown(this.downKey)) {
      this.vy = this.speed;
    } else {
      this.vy = 0;
    }
    if (keyIsDown(this.sprintKey)) {
      this.speed = this.sprintSpeed;
      console.log(this.speed);
      console.log("works");
    } else {
      this.speed = 5;
    }
  }
  // Move the predator based on velocity
  // Lose health from movement
  // Wrap at the canvas edges
  move() {
    this.x += this.vx;
    this.y += this.vy;

    this.health = this.health - this.healthLossPerMove;
    this.health = constrain(this.health, 0, this.maxHealth);

    // Calls the handleWrapping method, note the use of "this"
    this.handleWrapping();
  }
  //makes the predator wrap around the edges
  handleWrapping() {
    if (this.x < 0) {
      this.x += width;
    } else if (this.x > width) {
      this.x -= width;
    }
    if (this.y < 0) {
      this.y += height;
    } else if (this.y > height) {
      this.y -= height;
    }
  }

  handleEating(prey) {
    // Check for an overlap with this prey
    // And reduce its health if there is one
    // Also increase the predator's health
    let d = dist(this.x, this.y, prey.x, prey.y);
    if (d < this.radius + prey.radius) {
      this.health += this.healthGainPerEat;

      //constrain makes sure that the health doesn't go higher than the maximum
      //amount of health initially set.
      this.health = constrain(this.health, 0, this.maxHealth);
      prey.health -= this.healthGainPerEat;
      if (prey.health <= 0) {
        this.preyAmt++;
        prey.reset();
      }
    }
  }
  display() {
    if(this.health <= 0){
      return;
    }
    // Draws the predator on the canvas
    push();
    noStroke();
    this.radius = this.health;
    imageMode(CENTER);
    console.log(this.radius);
    image(this.image, this.x, this.y, this.radius * 2, this.radius * 2);
    pop();
    push();
    noStroke();
    rectMode(CENTER);
    fill(195, 0, 0);
    rect(this.x, this.y + this.radius, 100, 10);
    this.healthBar = map(this.preyAmt, 0, 10, 0, 100);
    fill(0, 195, 0);
    rect(this.x, this.y + this.radius, this.healthBar, 10);
    pop();
  }
}

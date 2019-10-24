//Prey Class
//
// A Prey class describes what a Preys and does
class Prey {
  constructor(x, y, speed, fillColor, radius, img) {
    // Sets up the Prey when it is created or "constructed"
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    this.maxHealth = radius; // Maximum health is the starting radius
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    this.fillColor = fillColor;
    this.radius = this.health; // Radius is matched to health
    this.tx = random(0,100);
    this.ty = random(0,100);
    this.image = img;
  }
  move() {
    // Move the prey based on noise velocity
    // Wrap at the canvas edges
    this.vx = map(noise(this.tx),0,1,-this.speed,this.speed);
    this.vy = map(noise(this.ty),0,1,-this.speed,this.speed);
    this.x += this.vx;
    this.y += this.vy;
    this.tx += 0.01;
    this.ty += 0.01;
    this.handleWrapping();
  }
  //handles the wrapping aroumd the window of the prey
  handleWrapping(){

    if (this.x < 0) {
      this.x += width;
    }
    else if (this.x > width) {
      this.x -= width;
    }
    if (this.y < 0) {
      this.y += height;
    }
    else if (this.y > height) {
      this.y -= height;
    }
  }
  display() {
    // Draw the prey on the canvas
    push();
    noStroke();
    //fill(this.fillColor);
    this.radius = this.health;
    //ellipse(this.x,this.y,this.radius * 2);
    image(this.image,this.x,this.y,this.radius*2,this.radius*2);
    pop();
  }
  reset(){
    this.health = this.maxHealth;

    let rx = random(0,width);
    let ry = random(0,height);
    this.x = rx;
    this.y = ry;
    this.radius = this.health;
  }
}

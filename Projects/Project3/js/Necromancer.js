// Necromancer
//
// A class that represents a simple Necromancer that extends Character
// parent class. It doesn't move around, it is a turret that shoots
// projectiles to kill the player object.

class Necromancer extends Character {
  // constructor
  //
  // Sets the initial values for the Necromancer's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, size, image) {
    super(x, y, speed, size);
    this.size = size;
    this.image = image;
    // Health properties
    this.maxHealth = 100;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    this.sightX = 800;
    this.sightY = 100;
  }

  // shoot()
  //
  //When the player is in range, shoots in the direction
  shoot() {
    if (necroCoolDown === 0 && player.x > this.x && player.x < this.x + this.sightX && player.y > this.y - this.sightY && player.y < this.y + this.sightY) {
      let projectile = new Projectile(this.x +this.size, this.y, 30, 50, 0, fireballImg);
      // Add the projectile to the projectiles array of the ship
      projectiles.push(projectile);
      // Set the cooldown to max so it can start counting down
      necroCoolDown = necroCoolDownMax;
      console.log(necroCoolDown);
    }
  }

  // display()
  //
  //
  display() {
    if(this.health != 0){
    push();
    imageMode(CENTER);
    image(this.image, this.x, this.y, this.size, this.size + 20);
    pop();
  }
  }

}

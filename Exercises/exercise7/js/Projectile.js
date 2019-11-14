// Projectile
//
// A class that represents a simple projectile
// It appears at the given coordinates and moves according to some angle
// and speed.

class Projectile{
  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x,y,speed,size,angle){

    this.x = x;
    this.y = y;
    this.speed = speed;
    this.size = size;
    this.angle = angle;
    //setting up the damage the bullet will inflict
    this.damage = 20;
    //array containing the projectiles
    this.projectiles = [];
    this.coolDown = 0;
    this.coolDownMax = 10;

    shoot(){
      // The bullet cooldown determines when you can fire again (when it's at 0)
    // So count down
    this.coolDown -= 1;
    // Constrain the bullet cooldown to avoid weird numbers
    this.coolDown = constrain(this.coolDown - 1, 0, this.coolDownMax)
    // Check if the shoot key is pressed and the cooldown is at 0 so you can fire
    if (this.coolDown === 0) {
      // Create a bullet as an object with position and velocity
      var newBullet = {
        // projectiles should start at the location of the ship firing
        x: this.x,
        y: this.y,
        // And they should have a velocity matching the player's angle
        // but should travel at maximum speed
        vx: this.speed * cos(this.angle),
        vy: this.speed * sin(this.angle)
      }
      // Add the bullet to the projectiles array of the ship
      this.projectiles.push(newBullet);
      // Set the cooldown to max so it can start counting down
      this.coolDown = this.coolDownMax;
    }
    }
    // updateprojectiles()
  //
  // Move all the projectiles fired by this ship
  // Check if they hit the other ship and reduces health
  // Note that in this simple version we never actually delete projectiles from the
  // array. For that we'd need to use either pop() or splice().
  update(character) {
    // Go through all the projectiles of this ship
    // (Note this is hugely inefficient since it still looks at projectiles that were fired long ago,
    // we should really remove those from the array!)
    for (var i = 0; i < this.projectiles.length; i++) {
      // Get the bullet based on its index
      var bullet = this.projectiles[i];

      // Update its position based on velocity
      bullet.x += bullet.vx;
      bullet.y += bullet.vy;

      // Check if this bullet overlaps the other ship
      if (bullet.x > character.x - character.size / 2 && bullet.x < character.x + character.size / 2) {
        if (bullet.y > character.y - character.size / 2 && bullet.y < character.y + character.size / 2) {
          // If so, reduces the health of the character (constrained)
          character.health -= this.damage;
          character.health = constrain(character.health, 0, character.maxHealth);
          this.projectiles[i].pop();
        }
      }
    }
  }


}

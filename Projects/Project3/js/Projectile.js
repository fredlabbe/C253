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
  constructor(x, y, speed, size, angle, image){

    this.x = x;
    this.y = y;
    this.speed = speed;
    this.size = size;
    this.angle = angle;
    //setting up the damage the projectile will inflict
    this.damage = 20;
    this.coolDown = 0;
    this.coolDownMax = 10;
    //the image
    this.image = image;
}
    // update()
  //
  // Move all the projectiles fired by this ship
  // Check if they hit the other ship and reduces health
  // Note that in this simple version we never actually delete projectiles from the
  // array. For that we'd need to use either pop() or splice().
  update(character) {
    for (var i = 0; i < projectiles.length; i++){
      // Check if this projectile overlaps the other ship
      if (this.x > character.x - character.size / 2 && this.x < character.x + character.size / 2) {
        if (this.y > character.y - character.size / 2 && this.y < character.y + character.size / 2) {
          // If so, reduces the health of the character (constrained)
          character.health -= this.damage;
          character.health = constrain(character.health, 0, character.maxHealth);
          projectiles.pop(i);
          //checking if it is the player who is at 0
          if(player.health === 0){
            player.reset();
          }
        }
      }
    }
  }

  //display()
  //
  //
  display(){
      push();
      image(this.image, this.x, this.y, this.size, this.size);
      pop();
  }

  move(){

    this.x+=20;

  }


}

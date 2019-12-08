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
  constructor(x, y, speed, size, angle, image, isRight){

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
    //determining if we need to delete this projectile
    this.toDelete = false;
    //to know if it is moving
    this.isLaunched = false;
    this.isRight = isRight;
}
    // update()
  //
  // Move all the projectiles fired by this character
  // Check if they hit another character and reduces health
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
          console.log(player.health);
          this.toDelete = true;
          //checking if it's the player who is at 0 and if yes, respawns it
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
  // move()
  //
  //moves the projectile depending on the side the character faces

  move(){
    if(this.isRight){
    this.x += 20;
    //this.isLaunched = true;
  }
  else if(this.isRight === false){
    this.x -= 20;
    //this.isLaunched = true;
  }
  // else {
  //   this.x += 20;
  //   this.isLaunched = true;
  // }

  }


}

// Potion
//
// A class that represents potion objects that can be found
// by the player. Different potions can heal the player
// by different values.

class Potion extends Item{
  // constructor
  //
  // Sets the initial values for the Potion's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, image, healingValue) {
    super(x,y,image);
    //Properties
    this.healingValue = healingValue;
  }

  ///display()
  //
  //Displays the potion at the received coordinates. If it is drank,
  //it is not displayed.
  display() {
    super.display();
}
  //handleFound()
  //
  //Checks if the player found the potion by taking the distance
  //between the two objects and checks if it is drank. If yes,
  //set the condition to true and it will not be displayed anymore
  //because of the code in display()
  handleFound(player) {
    super.handleFound(player);
      // Increase player's health and constrain it to its possible range
      let d = dist(this.x, this.y, player.x, player.y);
      // Check if the distance is less than their two sizes (an overlap)
      if (d < this.size + player.size) {
        player.health += this.healingValue;
        player.health = constrain(player.health, 0, player.maxHealth);
        potionSFX.play();
      }
  }
}

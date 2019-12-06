// Key
//
// A class that represents Key objects that can be found
// by the player. When the key is found, the player can
// unlock the door to the next level.

class Key extends Item{
  // constructor
  //
  // Sets the initial values for the Potion's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, image) {
    super(x,y,image);
  }

  ///display()
  //
  //Displays the key at the received coordinates. If it is found,
  //it is not displayed.
  display() {
    super.display();
  }

  //handleHealing()
  //
  //Checks if the player found the key by taking the distance
  //between the two objects. If yes,
  //set the condition to true and it will not be displayed anymore
  //because of the code in display()
  handleFound(player) {
    super.handleFound(player);
  }
}

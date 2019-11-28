// Key
//
// A class that represents Key objects that can be found
// by the player. When the key is found, the player can
// unlock the door to the next level.

class Key {
  // constructor
  //
  // Sets the initial values for the Potion's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, image) {
    //Position
    this.x = x;
    this.y = y;
    //size
    this.size = 50;
    //Properties
    this.isFound = false;
    //Image of the potion to be displayed
    this.image = image;
  }

  ///display()
  //
  //Displays the key at the received coordinates. If it is found,
  //it is not displayed.
  display() {
    if (this.isFound === false) {
      //Display
      image(this.image, this.x, this.y, this.size, this.size);
    }
  }

  //handleHealing()
  //
  //Checks if the player found the key by taking the distance
  //between the two objects. If yes,
  //set the condition to true and it will not be displayed anymore
  //because of the code in display()
  handleFound(player) {
    let d = dist(this.x, this.y, player.x, player.y);
    // Check if the distance is less than their two sizes (an overlap)
    if (d < this.size + player.size) {
      keySFX.play()
      this.isFound = true;
    }
  }
}

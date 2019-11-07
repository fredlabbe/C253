// Potion
//
// A class that represents potion objects that can be found
// by the player. Different potions can heal the player
// by different values.

class Potion{
  // constructor
  //
  // Sets the initial values for the Potion's properties
  // Either sets default values or uses the arguments provided
  constructor(x,y,healingValue,image){
    //Position
    this.x = x;
    this.y = y;
    //size
    this.size = 50;
    //Properties
    this.healingValue = healingValue;
    this.isDrank = false;
    //Image of the potion to be displayed
    this.image = image;
  }

  ///display()
  //
  //Displays the potion at the received coordinates. If it is drank,
  //it is not displayed.
  display(){
    if(this.isDrank === false){
      //Display
      image(this.image,this.x,this.y,this.size,this.size);
    }
  }

  //handleHealing()
  //
  //Checks if the player found the potion by taking the distance
  //between the two objects and checks if it is drank. If yes,
  //set the condition to true and it will not be displayed anymore
  //because of the code in display()
  handleHealing(player){
    let d = dist(this.x, this.y, player.x, player.y);
    // Check if the distance is less than their two radii (an overlap)
    //as long as the potion has not been drank
    if (d < this.size + player.size && this.isDrank === false) {
      // Increase player's health and constrain it to its possible range
      player.health += this.healingValue;
      player.health = constrain(player.health, 0, player.maxHealth);
      this.isDrank = true;
    }
  }
}

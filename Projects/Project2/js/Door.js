// Door
//
// A class that represents door objects that can be found
// by the player. When a player steps through them, it changes
// the level to the next level.

class Door{
  // constructor
  //
  // Sets the initial values for the Door's properties
  // Either sets default values or uses the arguments provided
  constructor(x,y,width,height,img,state){
    // Position
    this.x = x;
    this.y = y;

    //size
    this.width = width;
    this.height = height;
    //the image
    this.image = img;
    //the state of the game
    this.state = state;
  }
  //display()
  //
  //Displays the door on the screen as an image
  display(){
    image(image,this.x,this.y,this.width,this.height);
  }
  //handleHealing()
  //
  //Checks if the player found the door by taking the distance
  //between the two objects. If yes, it changes the scenes.
  handleHealing(player){
    let d = dist(this.x, this.y, player.x, player.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.size + player.size) {
      // Increase player's health and constrain it to its possible range
      player.health += this.healingValue;
      player.health = constrain(player.health, 0, player.maxHealth);
      this.isDrank = true;
    }
  }
}

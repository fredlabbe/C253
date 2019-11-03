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
  constructor(x,y,width,height){
    // Position
    this.x = x;
    this.y = y;

    //size
    this.width = width;
    this.height = height;
  }
}

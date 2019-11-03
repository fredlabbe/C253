// Wall
//
// A class that represents wall objects that can't be passed
// through by the player.
//

class Wall{

  // constructor
  //
  // Sets the initial values for the Wall's properties
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

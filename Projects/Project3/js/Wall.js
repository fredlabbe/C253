// Wall
//
// A class that represents wall objects that can't be passed
// through by the character.
//

class Wall {

  // constructor
  //
  // Sets the initial values for the Wall's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, width, height, image) {
    // Position
    this.x = x;
    this.y = y;

    //size
    this.width = width;
    this.height = height;

    //image
    this.image = image;
  }
  //display()
  //
  //Displays the wall on the screen as a rectangle
  display() {
    push();
    imageMode(CENTER);
    image(this.image, this.x, this.y, this.width, this.height);
    pop();
  }
  //handleSolid()
  //
  //Checks if the character is inside the wall so it can move it
  //and act as a solid wall, preventing the character from going
  //through. Receives the character as an argument
  handleSolid(character) {
    if (character.x + character.size / 2 > this.x - this.width / 2 && character.x - character.size / 2 < this.x + this.width / 2 && character.y + character.size / 2 > this.y - this.height / 2 && character.y - character.size / 2 < this.y + this.height / 2) {
      // We have an overlap - just like in pong with the ball and the paddle
      // set velocity to 0
      console.log("overlap works");
      character.x -= character.vx;
      character.y -= character.vy;

      character.vx = 0;
      character.vy = 0;

      return;
    }
  }
}

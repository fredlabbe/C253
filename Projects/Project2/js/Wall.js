// Wall
//
// A class that represents wall objects that can't be passed
// through by the character.
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
  //display()
  //
  //Displays the wall on the screen as a rectangle
  display(){
    push();
    rectMode(CENTER);
    fill(0);
    rect(this.x,this.y,this.width,this.height);
    pop();
  }
  //handleSolid()
  //
  //Checks if the character is inside the wall so it can move it
  //and act as a solid wall, preventing the character from going
  //through. Receives the character as an argument
  handleSolid(character){

    //constrain(character.y,0,this.y);
    // if(character.x > this.x-this.width && character.x < this.x+this.width){
    //   character.vx = character.speed*(-1);
    //   console.log("wallX works");
    // }
    // else{
    //   character.vx = character.speed;
    // }
    // if(character.y > this.y-this.height && character.y < this.y+this.height){
    //   character.vy = character.speed*(-1);
    //   console.log("wallY works");
    // }
    // else{
    //   character.vy = character.speed;
    // }

    if(character.x + character.size/2 > this.x - this.width/2 && character.x - character.size/2 < this.x + this.width/2 && character.y + character.size/2 > this.y - this.height/2 && character.y - character.size/2 < this.y + this.height/2){
      // We have an overlap - just like in pong with the ball and the paddle
      // set velocity to 0
      console.log("overlap works");
      character.x -= character.vx;
      character.y -= character.vy;

      character.vx = 0;
      character.vy = 0;

      return;
    //   // calculate the overlap on x and y
    //   let xOverlap = character.x - wall.x;
    //   let yOverlap = character.y - wall.y;
    //   // push the character out by the overlap amount
    //   if (xOverlap < 0) {
    //     // character to the left
    //     character.x = wall.x - wall.width/2 - character.size/2;
    //   }
    //   else if(xOverlap > 0){
    //     //character to the right
    //     character.x = wall.x + wall.width/2 + character.size/2;
    //   }
    //   if (yOverlap < 0) {
    //     // character to the left
    //     character.y = wall.y - wall.height/2 - character.size/2;
    //   }
    //   else if(yOverlap > 0){
    //     //character to the right
    //     character.y = wall.y + wall.height/2 + character.size/2;
    // }
  }
  }
}

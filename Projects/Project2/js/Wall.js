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
  //display()
  //
  //Displays the wall on the screen as a rectangle
  display(){
    push();
    fill(0);
    rect(this.x,this.y,this.width,this.height);
    pop();
  }
  //handleSolid()
  //
  //Checks if the player is inside the wall so it can move it
  //and act as a solid wall, preventing the player from going
  //through. Receives the player as an argument
  handleSolid(player){

    //constrain(player.y,0,this.y);
    if(player.x > this.x-this.width && player.x < this.x+this.width){
      player.vx = player.speed*(-1);
      console.log("wallX works");
    }
    else{
      player.vx = player.speed;
    }
    if(player.y > this.y-this.height && player.y < this.y+this.height){
      player.vy = player.speed*(-1);
      console.log("wallY works");
    }
    else{
      player.vy = player.speed;
    }
  }
}

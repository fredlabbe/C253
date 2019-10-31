class Square extends Shape {
  constructor(x,y,size,fillColor) {
    super(x,y,size);
    this.fillColor = fillColor;
  }
  display() {
    push();
    rectMode(CENTER);
    fill(this.fillColor,0,0);
    noStroke();
    rect(this.x,this.y,this.size,this.size);
    pop();
  }
}

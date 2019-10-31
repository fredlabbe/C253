class Circle extends Shape{

  constructor(x,y,size) {
    super(x,y,size);
  }

  update(){
    super.update();
    this.size = random(20,200);

  }

  display() {
    push();
    fill(random(0,255),0,random(0,200));
    noStroke();
    ellipse(this.x,this.y,this.size,this.size);
    pop();
  }
}

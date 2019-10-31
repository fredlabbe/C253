class Dog extends Animal {
  constructor(age) {
    super(age);
  }

  eat(){
    super.eat();
    console.log("**Makes a huge mess**");
  }
  bark() {
    console.log("Woof!");
  }
}

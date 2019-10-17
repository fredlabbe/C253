class Predator { // A Predator class describes what a Predator is and does
  constructor() {
    // Sets up the Predator when it is created or "constructed"
  }
  handleInput() {
    // Check for player input and react appropriately
  }
  move() {
    // Move the predator based on velocity
    // Lose health from movement
    // Wrap at the canvas edges
  }
  handleEating(prey) {
    // Check for an overlap with this prey
    // And reduce its health if there is one
    // Also increase the predator's health
  }
  display() {
    // Draw the predator on the canvas
  }
}

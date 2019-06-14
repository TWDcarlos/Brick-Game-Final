class drawPowerUp {
  constructor() {
  }

  //Power Ups
  //Draw the powerUp Hammer which destroy a block
  hammer(x, y, cor, scl) {
    push();
    rectMode(CORNER);
    translate(x, y);
    scale(scl);
    stroke(cor);
    noFill();
    rect(-8, 10, 15, 0);
    rotate(PI - 0.7);
    rect(0, 0, 15, 5);
    rotate(PI);
    rect(0, -10, 10, 17);
    noFill();
    strokeWeight(2);
    ellipse(0, 0, 30, 30);
    pop();
  }

  //Draw the powerUp Score X2 which multiplies the score won by the user
  scoreTimes2(x, y, cor, scl) {
    push();
    rectMode(CORNER);
    translate(x, y);
    scale(scl);
    stroke(cor);
    fill(cor);
    strokeWeight(2);
    textAlign(CENTER);
    textSize(20);
    text("x2", 0, 8);
    noFill();
    strokeWeight(3);
    ellipse(0, 0, 30, 30);
    pop();
  }

  //Draw the powerUp Target which takes the ball to a brick
  target(x, y, cor, scl) {
    push();
    rectMode(CORNER);
    translate(x, y);
    scale(scl);
    stroke(cor);
    noFill();
    strokeWeight(2);
    rect(-15, -5, 8, 10, 10);
    rotate(TWO_PI);
    rect(7, -5, 8, 10, 10);
    rotate(HALF_PI);
    rect(7, -5, 8, 10, 10);
    rotate(-PI);
    rect(7, -5, 8, 10, 10);
    strokeWeight(3);
    ellipse(0, 0, 30, 30);
    pop();
  }
}
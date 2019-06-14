let PADDLE_INDEX = 0;

class Paddle {
  constructor() {
    this.w = 160;
    this.h = 20;
    this.x = width/2 - this.w/2;
    this.y = height  - this.h*2;
    this.isMovingLeft = false;
    this.isMovingRight = false;
  }
  
  //Set the movement of the paddle to the LEFT or RIGHT
  setSide(side) {
    if (side == "RIGHT") {
      this.isMovingRight = true;
      this.isMovingLeft = false;
    } else if (side == "LEFT") {
      this.isMovingLeft = true;
      this.isMovingRight = false;
    }
  }
  
  //Set the movement of the paddle to stay
  stop() {
    this.isMovingLeft = false;
    this.isMovingRight = false;
  }

  //Render the paddle on the screan
  render() {
    push();
    const keys = Object.keys(paddleSkin);
    
    image(paddleSkin[keys[PADDLE_INDEX]], this.x, this.y);
    pop();
  }

  //Update the position of the paddle
  update() {
    if (this.isMovingRight) {
      this.move(20);
    } else if (this.isMovingLeft) {
      this.move(-20);
    }
  }
  
  //Grab the Power Up when they're falling
  catchPowerUp(power) {
    return power.pos.y > this.y && power.pos.x >= this.x && power.pos.x <= this.x + this.w;
  }
  
  //Move the paddle with some amount
  move(step) {
    this.x += step;
    this.x = constrain(this.x, 0, width - this.w);
  }
}
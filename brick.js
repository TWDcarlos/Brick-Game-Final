const colors = ['#6CD9CC', '#FB6578', '#FE5A8F', '#FC9574', '#2bc487', '#9A8DF2', '#6cf7e9', '#12d125', '#ec75ff', '#faff00'];

class Brick {
  constructor(x, y) {
    if(x && y ) {
      this.pos = createVector(x, y);
    }else {
      this.resetPosition();
    }
    this.r = random(20, 80);
    this.total = floor(random(5, 9));
    this.hit = false;
    this.cooldown = 5;
    this.chooseColor();
  }

  //Display the brick
  display() {
    push();
    noFill();
    strokeWeight(3);
    stroke(this.upColor);

    //If this brick was hit, it will shake
    if (this.hit) {
      this.shake(); 
      this.cooldown--;
    }
    translate(this.pos.x, this.pos.y);

    //Make the shape of the brick
    beginShape();
    for (let i = 0; i < this.total; i++) {
      const angle = map(i, 0, this.total, 0, TWO_PI);
      const r = this.r;
      const x = r * cos(angle);
      const y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();  
    //If the cooldown is igual 0 stop the shaking
    if (this.cooldown < 0) {
      this.hit = false;
    }
  }

  //Just shake the brick
  shake() {
    this.pos.x += random(-5, 5);
    this.pos.y += random(-5, 5);
  }

  //Choose a random color from the array colors
  chooseColor () {
    const temp_index = floor(random(colors.length));
    this.upColor = colors[temp_index];
  }

  //Make a new PVector position to the brick
  resetPosition() {
    this.pos = createVector(random(80, width - 80), random(100, height - 400));
  }
}
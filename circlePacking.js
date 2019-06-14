class CirclePacking {
  constructor(x, y, image) {
    this.pos = createVector(x, y);
    this.circles = [];
    this.spots = [];
    this.image = image;
    this.done = false;
    this.image.resize(300, 200);
    this.pickSpots();
  }

  pickSpots() {
    this.image.loadPixels();
    for (let x = 0; x < this.image.width; x+=4) {
      for (let y = 0; y < this.image.height; y+=4) {
        let index = x + y * this.image.width;
        let c = this.image.pixels[index*4];
        let b = brightness([c]);
        if (b > 1) {
          this.spots.push(createVector(x, y));
        }
      }
    }
    this.image.updatePixels();
  }
  
  reset() {
    this.done = false;
    this.circles = [];
  }

  newCircle() {
    let pos = random(this.spots);
    let x = pos.x;
    let y = pos.y;

    let valid = true;
    for (let c of this.circles) {
      let d = dist(c.x, c.y, x, y);
      if (d-2 < c.r) {
        valid = false;
        break;
      }
    }

    if (valid) { 
      return new Circle(x, y);
    } else {
      return null;
    }
  }

  drawIt() {
    push();
    for (let c of this.circles) {
      push();
      translate(this.pos.x, this.pos.y);
      //ellipse(c.x, c.y, 8, 8);
      c.display();
      c.grow();
      pop();
    }
    pop();
  }

  run() {
    if (!this.done) {
      let total = 10;
      let m = 0;
      let atemps = 0;

      while (m != total) {
        let newC = this.newCircle();
        if (newC != null) {
          this.circles.push(newC);
          m++;
        }
        atemps ++;
        if (atemps > 500) {
          this.done = true;
          break;
        }
      }


      for (let c of this.circles) {
        if (c.growing) {
          if (c.edges()) {
            c.growing = false;
          }
          for (let other of this.circles) {
            if (c != other) {
              let d = dist(c.x, c.y, other.x, other.y);
              if (d - 2 < c.r + other.r) {
                c.growing = false;
              }
            }
          }
        }
      }
    }
  }
}


class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 2;
    this.growing = true;
  }

  grow() {
    if (this.growing) {
      if(this.r > 10) {
        this.growing = false;
      }
      this.r += 0.5;
    }
  }

  edges() {
    return (this.x + this.r > width || this.x - this.r < 0 || this.y + this.r > height || this.y - this.r < 0);
  }

  display() {
    push();
    noFill();
    stroke(0);
    strokeWeight(2);
    ellipse(this.x, this.y, this.r*2, this.r*2);
    pop();
  }
}
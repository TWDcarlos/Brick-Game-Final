class chaosGame {
  constructor() {
    this.p1;
    this.p2;
    this.p3;
    this.x;
    this.y;
    this.c1;
    this.c2;
    this.c3;

    this.path = [];

    this.reset();
  }

  randomColor() {
    this.c1 = color(random(256),random(256),random(256));
    this.c2 = color(random(256),random(256),random(256));
    this.c3 = color(random(256),random(256),random(256));
  }

  run() {
    const r = floor(random(3));
    if(r == 0) {
      this.x = lerp(this.x, this.p1.x, 0.5);
      this.y = lerp(this.y, this.p1.y, 0.5);
    }else if(r == 1) {
      this.x = lerp(this.x, this.p2.x, 0.5);
      this.y = lerp(this.y, this.p2.y, 0.5);
    }else {
      this.x = lerp(this.x, this.p3.x, 0.5);
      this.y = lerp(this.y, this.p3.y, 0.5);
    }
    
    if(this.path.length > 0) {
      if(this.x == this.path[this.path.length - 1].x && this.y == this.path[this.path.length - 1].y) {
        console.log("Hello");
      }
    }

    if(frameCount % 700 == 0) {
      this.reset(); 
    }

    const b = {
      x: this.x,
      y: this.y,
      r: r
    }
    this.path.push(b);
    
    stroke(255);
    
    point(this.p1.x, this.p1.y);
    point(this.p2.x, this.p2.y);
    point(this.p3.x, this.p3.y);
  }

  render() {
    push();
    for(let p of this.path) {
      if(p.r == 0) stroke(this.c1);
      if(p.r == 1) stroke(this.c2);
      if(p.r == 2) stroke(this.c3);
      strokeWeight(2);
      point(p.x, p.y);
    }
    pop();
  }


  reset() {
    this.randomColor();

    this.p1 = createVector(random(width), random(height));
    this.p2 = createVector(random(width), random(height));
    this.p3 = createVector(random(width), random(height));
  
    this.x = random(width);
    this.y = random(height);

    this.path = [];
  }
}
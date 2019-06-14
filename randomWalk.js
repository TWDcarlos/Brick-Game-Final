class RandomWalk {
  constructor() {
    this.path1 = [];
    this.x1 = width/2 - 100;
    this.y1 = height/2;

    this.path2 = [];
    this.x2 = width/2 + 100;
    this.y2 = height/2;

    this.delta = 5;
    this.longWalk = 20;
  }

  renderAll() {
    noFill()
    stroke(255, 50);
    beginShape()
    for(let p of this.path2) {
      vertex(p.x, p.y);
    }
    endShape();

    beginShape()
    for(let p of this.path1) {
      vertex(p.x, p.y);
    }
    endShape();
  }

  addPoint() {
    const p1 = {
      x: this.x1,
      y: this.y1
    }

    const p2 = {
      x: this.x2,
      y: this.y2
    }

    this.path1.push(p1);
    this.path2.push(p2);
  }

  reset() {
    this.path1 = [];
    this.path2 = [];

    this.x1 = width/2 - 120;
    this.y1 = height/2;

    this.x2 = width/2 + 120;
    this.y2 = height/2;
  }

  walk() {
    if(random(1) < 0.3) {
      this.x1 += random(-this.longWalk, this.longWalk);
      this.y1 += random(-this.longWalk, this.longWalk);
    }else {
      this.x1 += random(-this.delta, this.delta);
      this.y1 += random(-this.delta, this.delta);
    }

    if(random(1) < 0.3) {
      this.x2 += random(-this.longWalk, this.longWalk);
      this.y2 += random(-this.longWalk, this.longWalk);
    }else {
      this.x2 += random(-this.delta, this.delta);
      this.y2 += random(-this.delta, this.delta);
    }

    this.addPoint();
  }

  run() {
    this.renderAll();
    this.walk();
  }
}
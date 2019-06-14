
//https://www.youtube.com/watch?v=KWoJgHFYWxY&t=218s
class Phyllotaxis {
  constructor() {
    this.n = 0;
    this.c = 7;
    this.deg = [137.3, 137.5, 137.6, 220.7, 183.3];
    this.index = 0;
    this.rot = 0;
  }

  next() {
    if(this.index < this.deg.length - 1) {
      this.index++;
    }else {
      this.index = 0;
    }
  }

  run(x, y, index) {
    push();
    translate(x, y);
    rotate(this.rot);
    noFill();
    stroke(255, 50);
    for (let i = 0; i < this.n; i++) {
      const a = i * this.deg[index];
      const r = this.c * sqrt(i);
      const x = r * cos(a);
      const y = r * sin(a);

      rect(x, y, 6, 6);
    }
    if(frameCount % 20 == 0) this.n ++;
    this.rot += 0.02;
    this.n = constrain(this.n, 0, 200);
    pop();
  }
}
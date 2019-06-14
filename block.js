class Block {
  constructor(lvl) {
    this.loc = createVector(random(100, width - 100), random(height/2 - 50, height/2));
    this.w = floor(random(30, 60));
    this.h = floor(random(8, 15));
    this.pLoc = this.loc.copy(); // Previous location
    this.hit = false;
    this.cooldown = 10;
    this.level(lvl);
  }
  
  show() {
    push();
    fill('#FAD2BB');
    stroke(140, 94, 34);
    rectMode(CORNER);
    if(this.hit) {
      this.shake();
      this.cooldown--;
    }else {
      this.loc = this.pLoc;
      this.pLoc = this.loc.copy();
      this.cooldown = 10;
    }
    strokeWeight(2);
    rect(this.loc.x, this.loc.y, this.w, this.h);
    //makes stripes
    for (let i = 0; i < this.w - this.h; i += this.h + 2) {
      line(this.loc.x + i, this.loc.y, this.loc.x + this.h + i, this.loc.y + this.h);
    }
    pop(); 
    if(this.cooldown < 0) {this.hit = false;}
  }

  shake () {
    this.loc.x += random(-5, 5);
    this.loc.y += random(-5, 5);
  }

  level(lvl) {
    this.w += lvl + floor(random(1, 5));
    this.h += lvl + floor(random(1, 3));
  }
}
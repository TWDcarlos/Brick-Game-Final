let overallFade = true;

class ParticleSystem {
  constructor() {
    this.particles = [];
    this.col = color(0);
  }
  
  randomTypeParticle(num, where) {
    const rand = floor(random(4));
    if(rand == 0) {
      this.addParticle(num, where);
    }else if(rand == 1) {
      this.addParticleSuperellipse(num, where);
    }else if(rand == 2) {
      this.addParticleRosePatterns(num * 2, where);
    }else if(rand == 3) {
      this.addParticleSupershape(num, where);
    }
  }
  
  addParticleShape (num, where) {
    const amnt = TWO_PI / num;
    for (let i = 0; i < TWO_PI; i+= amnt) {
      const force = p5.Vector.fromAngle(i);
      
      this.particleRandomly(where, force);
    }
  }

  //Coding Challenge #55: Mathematical Rose Patterns
  //https://www.youtube.com/watch?v=f5QBExMNB1I
  //Coding to translate this chalenge to the Game
  addParticleRosePatterns (num, where) {
    const amnt = TWO_PI / num;
    const k = 4;

    for (let i = 0; i < TWO_PI; i+= amnt) {
      const force = p5.Vector.fromAngle(i);
      let r = cos(i * k);
      r *= 2.5;
      force.mult(r);
      
      this.particleRandomly(where, force);
    }
  }

  particleRandomly(where, force) {
    if(ctParticles) {
      let index = floor(random(CT.length));

      this.particles.push(new ParticleImg(where.x, where.y, this.col, force, index));
    }else {

      const rand = floor(random(3));

      if (rand == 0) {
        this.particles.push(new Particle(where.x, where.y, this.col, force, overallFade));
      } else if (rand == 1) {
        this.particles.push(new ParticleLine(where.x, where.y, this.col, force, overallFade));
      } else {
        this.particles.push(new ParticleCircle(where.x, where.y, this.col, force, overallFade));
      }
    }
  }

  addLetterParticle(where, force, txt) {
    this.particles.push(new ParticleLetter(where.x, where.y, this.col, force, overallFade, txt));
  }

  //Coding Challenge #23: 2D Supershapes
  //https://www.youtube.com/watch?v=ksRoh-10lak
  //Coding to translate this chalenge to the Game
  addParticleSupershape (num, where) {
    const amnt = TWO_PI / num;
    const a = 1;
    const b = 1;
    const m = 5;
    const n1 = 0.14;
    const n2 = 1.7;
    const n3 = 1.7;

    for (let i = 0; i < TWO_PI; i+= amnt) {
      let force = p5.Vector.fromAngle(i);
      force.mult(this.supershape(i, a, b, m, n1, n2, n3));
      
      this.particleRandomly(where, force);
    }
  }

  sgn(val) {
    if (val > 0) {
      return 1;
    } else if (val < 0) {
      return -1;
    } else {
      return 0;
    }
  }

  supershape(theta, a, b, m, n1, n2, n3) {

    let part1 = (1 / a) * cos(theta * m / 4);
    part1 = abs(part1);
    part1 = pow(part1, n2);

    let part2 = (1 / b) * sin(theta * m / 4);
    part2 = abs(part2);
    part2 = pow(part2, n3);

    const part3 = pow(part1 + part2, 1 / n1);

    if (part3 == 0) {
      return 0;
    }

    return (1 / part3);
  }

  addVehicle(x, y) {
    this.particles.push(new Vehicle(x, y));
  }

  //Coding Challenge #19: Superellipse
  //https://www.youtube.com/watch?v=z86cx2A4_3E&
  //Coding to translate this chalenge to the Game
  addParticleSuperellipse (num, where) {
    const amnt = TWO_PI / num;
    const n = 0.5;
    const b = 1.5;
    const a = 1.5;

    for (let i = 0; i < TWO_PI; i+= amnt) {
      const na = 2 / n;
      const x = pow(abs(cos(i)), na) * a * this.sgn(cos(i));
      const y = pow(abs(sin(i)), na) * b * this.sgn(sin(i));

      const force = createVector(x, y);
      
      this.particleRandomly(where, force);
    }
  }

  //Coding Challenge #134.1: Heart Curve
  //https://www.youtube.com/watch?v=oUBAi9xQ2X4
  //Coding to translate this chalenge to the Game
  addParticleHeartCurve (num, where) {
    const amnt = TWO_PI / num;

    for (let i = 0; i < TWO_PI; i+= amnt) {
      const x = 16 * pow(sin(r), 3);
      const y = -1 * (13 * cos(r) - 5 * cos(2 * r) - 2 * cos(3 * r) - cos(4 * r));

      const force = createVector(x, y);

      this.particleRandomly(where, force);
    }
  }

  addParticle (num, where) {

    for (let i = 0; i < num; i++) {
      const force = createVector(random(-2, 2), random(-2, 2));

      this.particleRandomly(where, force);
    }
  }
  

  setColor (cor) {
    this.col = cor;
  }

  runVehicle() {
    for (let i = this.particles.length -1; i >= 0; i--) {
      this.particles[i].run();
    }
  }

  run () {
    for (let i = this.particles.length -1; i >= 0; i--) {
      this.particles[i].run();
      if (this.particles[i].isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }
}

// =========================== Other Class - Particle -  ===================
class Particle {
  constructor(x, y, col, vel, fade) {
    this.pos = createVector(x, y);
    this.col = col;
    this.vel = vel.copy();
    this.fade = fade;
    this.lifeSpan = 255;
    this.angle = 0;
    this.r = 10;
  }

  /*
  void useAcc() {
    this.acc = new PVector();
  }
  */

  applyForce (force) {
    this.acc.add(force);
  }

  run() {
    this.update();
    this.render();
  }

  update() {
    this.pos.add(this.vel);
    this.lifeSpan -= 5;
    this.angle += 0.1;
    this.r -= 0.1;
    if (this.acc!= null) {
      this.vel.add(this.acc);
      this.acc.mult(0);
    }
  }

  render() {
    push();
    noStroke();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    if (this.fade) {
      fill(red(this.col), green(this.col), blue(this.col), this.lifeSpan);
    } else {
      fill(this.col);
    }
    square(0, 0, this.r);
    pop();
  }

  isDead() {
    return this.lifeSpan <= 0;
  }
}

// =========================== Other Class - Particle Line -  ===================
class ParticleLine extends Particle {
  constructor(x, y, col, vel, fade) {
    super(x, y, col, vel, fade);
  }

  render() {
    push();
    noFill();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    if (this.fade) {
      stroke(red(this.col), green(this.col), blue(this.col), this.lifeSpan);
    } else {
      stroke(this.col);
    }
    line(-this.r, 0, this.r, 0);
    line(0, -this.r, 0, this.r);
    pop();
  }
}

// =========================== Other Class - Particle Img -  ===================
class ParticleImg extends Particle {
  constructor(x, y, col, vel, index) {
    super(x, y, col, vel, false);
    this.index = index;
    this.r = 15;
  }

  update() {
    this.pos.add(this.vel);
    this.angle += 0.1;
    this.r -= 0.3;
    if (this.acc!= null) {
      this.vel.add(this.acc);
      this.acc.mult(0);
    }
  }
  
  isDead() {
    return this.r <= 0;
  }

  render() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    image(CT[this.index], 0, 0, this.r, this.r);
    pop();
  }
}

// =========================== Other Class - Particle Circle -  ===================
class ParticleCircle extends Particle {
  constructor(x, y, col, vel, fade) {
    super(x, y, col, vel, fade);
  }

  render() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    rotate(this.angle);
    if (this.fade) {
      fill(red(this.col), green(this.col), blue(this.col), this.lifeSpan);
    } else {
      fill(this.col);
    }
    circle(0, 0, this.r * 0.5);
    pop();
  }
}

// =========================== Other Class - Particle Letters -  ===================
class ParticleLetter extends Particle {
  constructor(x, y, col, vel, fade, txt) {
    super(x, y, col, vel, fade);
    this.txt = txt;
  }

  render() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    //rotate(this.angle);
    if (this.fade) {
      fill(red(this.col), green(this.col), blue(this.col), this.lifeSpan);
    } else {
      fill(this.col);
    }
    text(this.txt, 0, 0);
    pop();
  }
}

// =========================== Other Class - Vehicle -  ===================
class Vehicle extends Particle {
  constructor(x, y) {
    super(random(width), random(height), random(colors), createVector(), true);
    this.target = createVector(x, y);
    this.acc = createVector();
  }

  render() {
    push();
    fill(this.col);
    stroke(0);
    strokeWeight(1);
    circle(this.pos.x, this.pos.y, 6);
    pop();
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }

  run() {
    this.behaviors();
    this.update();
    this.render();
  }

  behaviors() {
    const seek = this.arrive();
    const flee = this.flee();

    seek.mult(1);
    flee.mult(5);

    this.applyForce(seek);
    this.applyForce(flee);
  }

  arrive() {
    const desired = p5.Vector.sub(this.target, this.pos);
    const d = desired.mag();

    let speed = 10;

    if(d < 100) {
      speed = map(d, 0, 100, 0, 10);
    }
    
    desired.setMag(speed);

    const steer = p5.Vector.sub(desired, this.vel);
    steer.limit(1);

    return steer;
  }

  flee() {
    const desired = p5.Vector.sub(mousePos, this.pos);
    const d = desired.mag();

    if(d < 50) {
      let speed = 5;
      desired.setMag(speed);
      desired.mult(-1);

      const steer = p5.Vector.sub(desired, this.vel);
      steer.limit(1);
  
      return steer;
    }else {
      return createVector(0, 0);
    }
  }

}

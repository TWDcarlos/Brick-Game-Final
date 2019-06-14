class steeringBehavior {
  constructor(x, y) {
    this.font = font;
    this.particleSystem = new ParticleSystem();

    this.calcPoints(x, y)
  }

  calcPoints(x, y) {
    const pointsA = this.font.textToPoints("Brick", x - 130, y - 150, 80);
    const pointsB = this.font.textToPoints("Game", x - 70, y - 75, 80);

    const points = pointsA.concat(pointsB);

    for(let i = 0; i < points.length; i++) {
      this.particleSystem.addVehicle(points[i].x, points[i].y);
    }
  }

  reset() {
    for(let i = 0; i < this.particleSystem.particles.length; i++) {
      let p = p5.Vector.random2D();
      p.setMag(random(20, 50));
      this.particleSystem.particles[i].pos.add(p);
    }
  }

  run() {
    this.particleSystem.runVehicle();
  }
}
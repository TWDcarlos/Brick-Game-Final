class SuperShape {
  constructor() {
    this.shape = new Shape(100);
    this.shape2 = new Shape(50);
    this.shape3 = new Shape(50);
    this.shape4 = new Shape(50);
    this.shape5 = new Shape(50);
    this.n1off = 0;
    this.n2off = 0;
    this.n3off = 0;
    this.moff = 0;
    this.x = width/2;
    this.y = height/2;
  }

  runEach(shape, x, y) {
    shape.n1 = map(sin(this.n1off), -1, 1, 0.1, 1);
    shape.n3 = map(sin(this.n3off), -1, 1, 0.1, 2);
    shape.m = map(sin(this.moff), -1, 1, 10, 90);
    shape.n2 = map(sin(this.n2off), -1, 1, 0.3, 4);
    shape.draw(x, y);
  }

  run() {
    this.runEach(this.shape, this.x, this.y);
    this.runEach(this.shape2, this.x - 150, this.y - 150);
    this.runEach(this.shape3, this.x + 150, this.y - 150);
    this.runEach(this.shape4, this.x - 150, this.y + 150);
    this.runEach(this.shape5, this.x + 150, this.y + 150);
	
    this.n1off += 0.005;
    this.n2off += 0.002;
    this.n3off += 0.003;
    this.moff += 0.02;
  }
}

class Shape {
  constructor(rad) {
    this.n1 = 3;
    this.n2 = 0.3;
    this.n3 = 0.3;
    this.m = 10;
    this.a = 1;
    this.b = 1;
    this.radius = rad;
    this.total = 200;
    this.increment = TWO_PI / this.total;
  }
  
	
  supershape(theta) {
    var part1 = (1 / this.a) * cos(theta * this.m / 4);
    part1 = abs(part1);
    part1 = pow(part1, this.n2);

    var part2 = (1 / this.b) * sin(theta * this.m / 4);
    part2 = abs(part2);
    part2 = pow(part2, this.n3);

    var part3 = pow(part1 + part2, 1 / this.n1);

    if (part3 === 0) {
      return 0;
    }

    return (1 / part3);
	}
  
  draw(x, y) {
    push();
    translate(x, y);
    fill(200, 50);
    beginShape();
  	for (var angle = 0; angle < TWO_PI; angle += this.increment) {
      var r = this.supershape(angle);
      var x = this.radius * r * cos(angle);
      var y = this.radius * r * sin(angle);
      vertex(x, y);
    }
		endShape(CLOSE);
    pop();
  }
}
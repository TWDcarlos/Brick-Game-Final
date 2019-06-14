//Index of the array of images for the ball
let INDEX = 0;


class Ball {
  constructor() {
    this.pos = createVector(width/2, height/2);  //Position of the ball
    this.vel = createVector(6, 7);  //Velocity of the ball
    this.acc = createVector();  //Acceleration of the ball
    this.r = 20;  //Radius of the ball
    this.shadow = [];  //Store previous position to make a shadow
    this.time = 15;  //store the time the ball has x2 PowerUp
    this.col = color(25, 50, 200);
  }

  resetVel() {
    this.vel.normalize();
    let newVel = createVector(6, 7);
    
    if(this.vel.x < 0) {
      newVel.x *= -1;
    }
    if(this.vel.y < 0) {
      newVel.y *= -1;
    }
    this.vel = newVel;
  }

  render() {
    push();

    //Make a trail of the ball
    // for (let i = 0; i < this.shadow.length; i++) {
    //  noStroke();
    //  fill('#806FED');
    //  let temp_Shadow = this.shadow[i];
    //  ellipse(temp_Shadow.x, temp_Shadow.y, 25, 25);
    // }
    // pop();
    // push();
    // stroke(0);
    // strokeWeight(1);
    // fill('#9A8DF2');
    // ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    // ellipse(this.pos.x, this.pos.y, this.r / 2 * 3, this.r / 2 * 3);
    // ellipse(this.pos.x, this.pos.y, this.r, this.r);
    // ellipse(this.pos.x, this.pos.y, this.r / 2, this.r / 2);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    imageMode(CENTER);
    const keys = Object.keys(ballSkin);
    
    if(keys[INDEX] == "Default") {
      tint(this.col);
    }

    image(ballSkin[keys[INDEX]], 0,0, this.r*2, this.r*2);
    pop();
  }

  //Update the positon of the ball
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    this.shadow.push(this.pos.copy());

    //defines how many shadows will be displayed
    if (this.shadow.length > 3) {
      this.shadow.splice(0, 1);
    }
  }

  //Check if the ball hit the paddle
  meets (paddle) {
    if (this.pos.y < paddle.y &&
      this.pos.y > paddle.y - this.r &&
      this.pos.x > paddle.x - this.r &&
      this.pos.x < paddle.x + paddle.w + this.r) {
      this.pos.y -= this.r;
      playSound("wallHit");
      return true;
    } else {
      return false;
    }
  }

  //Apply behavior
  //Seek the brick and Repel the blocks
  //This is a power up
  behaviors(bricks, blocks) {
    let closest = Infinity;
    let closeIndex = Infinity;

    for (let i = 0; i < bricks.length; i++) {
      const d = p5.Vector.dist(this.pos, bricks[i].pos);
      if (d < closest) {
        closest = d;
        closeIndex = i;
      }
    }

    let seekForce = this.seek(bricks[closeIndex].pos);

    closest = Infinity;
    closeIndex = Infinity;

    if (blocks.length > 0) {
      for (let i = 0; i < blocks.length; i++) {
        const d = p5.Vector.dist(this.pos, blocks[i].loc);
        if (d < closest) {
          closest = d;
          closeIndex = i;
        }
      }

      let separateForce = this.seek(blocks[closeIndex].loc);
      separateForce.mult(-1.4);
      this.applyForce(separateForce);
    }

    seekForce.mult(2);
    this.applyForce(seekForce);
  }


  seek (target) {
    let desired = p5.Vector.sub(target, this.pos);

    desired.normalize();
    desired.mult(8);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(0.3);  

    return steer;
  }

  destroyBlock (block) {
    let closest = Infinity;
    let closeIndex = Infinity;

    for (let i = 0; i < block.length; i++) {
      let d = p5.Vector.dist(this.pos, block[i].loc);
      if (d < closest) {
        closest = d;
        closeIndex = i;
      }
    }

    let separateForce = this.seek(createVector(block[closeIndex].loc.x, block[closeIndex].loc.y));
    this.applyForce(separateForce);
  }

  applyForce (force) {
    this.acc.add(force);
  }

  checkEdges() {
    if (this.pos.x + this.r > width) {
      this.pos.x -= this.r;
      this.vel.x *= -1;
      playSound("wallHit");
    } else if ( this.pos.x - this.r < 0) {
      this.pos.x += this.r;
      this.vel.x *= -1;
      playSound("wallHit");
    }
    if (this.pos.y - this.r < 0) {
      this.pos.y += this.r;
      this.vel.y *= -1;
      playSound("wallHit");
    }
  }

  //Reset the position of the ball
  resetPos() {
    this.pos.x = width/2;
    this.pos.y = height/2;
  }


  //Check the player lose the game
  lose() {
    if (this.pos.y > height + 10) {
      this.resetPos();
      this.vel.x *= -1;
      this.shadow = [];
      return true;
    } else {
      return false;
    }
  }
 

  hitsBlock (block) {
    let testX = this.pos.x;
    let testY = this.pos.y;

    if (this.pos.x < block.loc.x)  testX = block.loc.x;
    else if (this.pos.x > block.loc.x + block.w) testX = block.loc.x + block.w;
    if (this.pos.y < block.loc.y) testY = block.loc.y;
    else if (this.pos.y > block.loc.y + block.h) testY = block.loc.y + block.h;

    let distX = this.pos.x - testX;
    let distY = this.pos.y - testY;
    let disttance = sqrt((distX*distX) + (distY*distY));

    if (disttance <= this.r) {
      if (distX > 0) {
        //Hit the Right of the block
        this.pos.x += this.r;
        this.vel.x *= -1;
      } else if(distX < 0) { 
        //Hit the Left of the block
        this.pos.x -= this.r;
        this.vel.x *= -1;
      } else if (distY > 0) {
        //Hit the Bottom of the block
        this.pos.y += this.r;
        this.vel.y *= -1;
      } else { 
        //Hit the Top of the block
        this.pos.y -= this.r;
        this.vel.y *= -1;
      }
      return true;
    } else {
      return false;
    }
  }

  //Check if the ball hit the Brick
  hits(brick) {
    const d = dist(this.pos.x, this.pos.y, brick.pos.x, brick.pos.y);
    if (d < brick.r + this.r) {
      this.col = random(colors);
      return true;
    } else {
      return false;
    }
  }
}
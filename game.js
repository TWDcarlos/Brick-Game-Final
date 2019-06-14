class Game {
  constructor() {
    this.paddle = new Paddle();
    this.ball   = new Ball();
    this.blocks = [];
    this.bricks = [];

    this.brickCount = 0;
    this.blockshit = 0;
    this.power = 0;
    this.life = 5;
    this.lvl = 1;

    this.particleS = new ParticleSystem();
    this.powerUps = new PowerUp();
    this.systemG = new TextSystem();
    this.scoreS = new ScoreSystem(width/2, 10);

    this.ballHit = false;

    //Reset the life to 5
    this.resetLife();

    //Spawn some bricks
    this.spawnBricks();
  }

  //if level is less than 10 and the player destroy all bricks increase the level
  changeLevel() {
    if (this.lvl <= 10) {
      if (this.bricks.length == 0) {
        //Add new block to the game
        this.blocks.push(new Block(this.lvl));

        this.lvl += 1;      //Increase the level

        this.systemG.addMsg("Level Up", createVector(width/2, height/2), 32);
        //Add 100 points of score as reward for change the level
        this.scoreS.addPoints(createVector(width/2, height/2), 100, false, this, this.systemG);

        this.spawnBricks(); //Add more bricks to the screen

        playSound("levelUp");
      }
    } else {
      //fix bug never end game

      //otherwise the player won the game
      this.systemG.winMsg();
    }
  }

  controlReleased() {
    if(!harderMode) {
      this.paddle.stop();
    }
  }

  controlKey (key) {
    if (key == 'a') {
      this.paddle.setSide("LEFT");
    }
    if (key == 'd') {
      this.paddle.setSide("RIGHT");
    }
  }

  resetLife() {
    this.brickCount = 0;
    this.blockshit = 0;
    this.power = 0;
    this.life = 5;
    this.lvl = 1;
    this.particleS.particles = [];
    this.scoreS.allScore = [];
    this.bricks = [];
    this.blocks = [];
    this.powerUps.allPower = [
      {
        howMuch: 0,
        active: false
      },
      {
        howMuch: 0,
        active: false
      },
      {
        howMuch: 0,
        active: false
      }
    ];
  }

  //If the game is pause we will use this to just draw the game.
  drawThings() {
    this.paddle.render();
    this.ball.render();

    this.bricks.forEach((brick) => brick.display());
    this.blocks.forEach((block) => block.show());

  }

  lose() {
    return this.ball.lose();
  }

  run() {
    this.particleS.run();
    this.powerUps.run(this.paddle, this.power, this.systemG);
    this.displayHowMuchPowerUp();
    this.powerUpBrickBreaker();
    this.powerUpBlockBreaker();
    this.powerUpScoreTimes2();
    this.visualPowerUp();

    this.paddle.update();
    this.paddle.render();

    this.ball.render();
    this.ball.update();

    this.checkBricks();
    this.changeLevel();

    this.checkBlocks();

    if (this.ball.meets(this.paddle)) {
      this.ball.vel.y *= -1;
      this.powerUps.hitPaddle = true;
      if (this.powerUps.isPowerUpActive) {
        playSound("usePowerUp");
      }
      this.powerUps.isPowerUpActive = false;
    }

    this.scoreS.update(this.lvl, this.life);
    this.ball.checkEdges();
    this.systemG.run();
  }

  //Make a visual animation to let the player known that they active a power up
  visualPowerUp() {
    if (this.powerUps.isPowerUpActive && activeEffects) {
      this.particleS.setColor('#9A8DF2');
      const temp1 = createVector(this.paddle.x, this.paddle.y);
      this.particleS.addParticle(2, temp1);
      const temp2 = createVector(this.paddle.x + this.paddle.w, this.paddle.y);
      this.particleS.addParticle(2, temp2);
    }
  }

  displayHowMuchPowerUp() {
    const howBrickBreaker = this.powerUps.getAmount(BrickBreaker);
    if (howBrickBreaker > 0) this.systemG.displayHowMuchPowerUp(this.paddle, howBrickBreaker, BrickBreaker, this.power);

    const howBlockBreaker = this.powerUps.getAmount(BlockBreaker);
    if (howBlockBreaker > 0) this.systemG.displayHowMuchPowerUp(this.paddle, howBlockBreaker, BlockBreaker, this.power);

    const howScoreTimes2 = this.powerUps.getAmount(ScoreTimes2);
    if (howScoreTimes2 > 0) this.systemG.displayHowMuchPowerUp(this.paddle, howScoreTimes2, ScoreTimes2, this.power);
  }

  //Active the power up Score Times 2
  powerUpScoreTimes2() {
    if (this.powerUps.isActive(ScoreTimes2) && this.powerUps.hitPaddle) {
      let tempColor = '#ffffff';

      if (this.ball.time < 6) {
        tempColor = '#e84833';
      }

      this.systemG.displayTimerScore2X(tempColor, this.ball.time, this.ball.pos);

      if (frameCount % 30 == 0) {
        this.ball.time--;
      }

      if (this.ball.time < 0) {
        this.ball.time = 15;
        this.powerUps.setPowerUp(ScoreTimes2, false);
      }
    }
  }

  //Active the power up Block Breaker
  powerUpBlockBreaker() {
    if (this.powerUps.isActive(BlockBreaker) && this.powerUps.hitPaddle) {
      if(activeEffects) this.particleS.addParticle(floor(random(2, 10)), this.ball.pos);
      this.ball.destroyBlock(this.blocks);
    }
  }

  //Active the power up Brick Breaker
  powerUpBrickBreaker() {
    if (this.powerUps.isActive(BrickBreaker) && this.powerUps.hitPaddle) {
      if(activeEffects) this.particleS.addParticle(floor(random(2, 10)), this.ball.pos);

      this.ball.behaviors(this.bricks, this.blocks);
    }
  }

  checkBlocks() {
    for (let i = this.blocks.length - 1; i >= 0; i--) {
      this.blocks[i].show(); 
      if (this.ball.hitsBlock(this.blocks[i])) {
        this.ball.resetVel();
        this.blocksHit++;
        playSound("block");
        
        if (this.powerUps.isActive(BlockBreaker)) {
          
          if (this.powerUps.hitPaddle) {
            this.powerUps.setPowerUp(BlockBreaker, false);
          }

          this.powerUps.hitPaddle = true;
          this.particleS.setColor('#FAD2BB');
          if(activeEffects) this.particleS.addParticle(floor(random(10, 20)), createVector(this.blocks[i].loc.x + this.blocks[i].w/2, this.blocks[i].loc.y + this.blocks[i].h/2));
          this.blocks.splice(i, 1);

        } else {
          this.blocks[i].hit = true;

          //Add -10 to the score
          if (!this.powerUps.isActive(ScoreTimes2)) {
            this.scoreS.addPoints(this.blocks[i].loc, -10, this.powerUps.isActive(ScoreTimes2), this, this.systemG);
          }
        }

        if (this.powerUps.isActive(BrickBreaker)) {
          if (this.powerUps.getAmount(BlockBreaker) > 0) {
            this.blocks.splice(i, 1);
            this.powerUps.takeOff(BlockBreaker);
            this.particleS.setColor('#FAD2BB');
            if(activeEffects) this.particleS.addParticle(floor(random(10, 20)), createVector(this.blocks[i].loc.x + this.blocks[i].w/2, this.blocks[i].loc.y + this.blocks[i].h/2));
          }
        }
      }
    }
  }

  checkBricks() {
    for (let i = this.bricks.length - 1; i >= 0; i--) {
      this.bricks[i].display(); //Display the brick

      if (this.ball.hits(this.bricks[i])) { //check if ball hits a brick
        this.ballHit = true;
        if (this.powerUps.isActive(BrickBreaker)) { //check if have some powerUp active
          this.ball.resetVel();
          if (this.powerUps.hitPaddle) {
            this.powerUps.setPowerUp(BrickBreaker, false);
          }
        }
        this.ball.vel.y *= -1;
        this.particleS.setColor(this.bricks[i].upColor);

        if (this.bricks[i].r >= 40) {
          this.bricks[i].r = this.bricks[i].r / 2; 
          this.bricks[i].hit = true;
          if(activeEffects) this.particleS.randomTypeParticle(floor(random(10, 30)), this.bricks[i].pos);
          this.bricks[i].chooseColor(); //change the color of brick

          //Add 15 points to the score
          this.scoreS.addPoints(this.bricks[i].pos, 15, this.powerUps.isActive(ScoreTimes2), this, this.systemG);
        } else {

          //Add 20 points to the score
          this.scoreS.addPoints(this.bricks[i].pos, 20, this.powerUps.isActive(ScoreTimes2), this, this.systemG);

          this.brickCount++;
          if (this.brickCount % 5 == 0) { //if the play destroy multiples of 5 a new powerUp can be generate
            const posBrick = this.bricks[i].pos.copy();
            this.powerUps.generateRandomPowerUp(posBrick.x, posBrick.y, this.blocks.length);
          }

          if(activeEffects) this.particleS.addParticle(floor(random(10, 30)), this.bricks[i].pos);
          
          this.bricks.splice(i, 1); //if the brick is too small remove it.
        }    
        playSound("brick");
      }
    }
  }

  changePowerUp(key) {
    if (key == 's' && this.powerUps.hasPowerUp()) {
      this.power++;
      if (this.power > 2) this.power = 0;
      for (let i = 0; i < this.powerUps.allPower.length; i++) {
        if (this.powerUps.getAmount(this.power) > 0) {
          break;
        } else {
          this.power++; 
          if (this.power > 2) this.power = 0;
        }
      }
    }
  }

  usePowerUp(key) {
    //Then check if that power up is greater then 0 and if theres no other power up active at the same time
    if ((key == 'w') && (this.powerUps.getAmount(this.power) > 0) && !this.powerUps.checkIsThere()) {

      if (!(this.power == BlockBreaker && this.blocks.length <= 0)) {
        //Active the power up
        this.powerUps.setPowerUp(this.power, true);

        this.powerUps.hitPaddle = false;

        playSound("usePowerUp");

        //Let the system known that one power up is been activated
        this.powerUps.isPowerUpActive = true;

        //decreases the amount of power up the player has
        this.powerUps.takeOff(this.power);

        //if the amount of this power up equals 0, it changes from power up automatic to another
        if (this.powerUps.getAmount(this.power) <= 0) {
          this.power++;
          if (this.power > 2) this.power = 0;
          for (let i = 0; i < this.powerUps.allPower.length; i++) {
            if (this.powerUps.getAmount(this.power) > 0) {
              break;
            } else {
              this.power++; 
              if (this.power > 2) this.power = 0;
            }
          }
        }
      }
    }
  }

  //Add some bricks to the screen base on the level
  spawnBricks() {
    let space = 40;
    for (let i = 0; i < 9 + this.lvl; i++) {
      let ready = false;
      let pos;

      while(ready == false) {
        pos = createVector(random(20, width - 20), random(50, height - 300));
        if(this.bricks.length == 0) {
          ready = true;
        }else {
          let tempReady = false;
          for(let i = 0; i < this.bricks.length; i++) {
            let d = p5.Vector.dist(this.bricks[i].pos, pos);
            if(d > space) {
              tempReady = true;
            }
          }

          if(tempReady) ready = true;
        }
      }
      this.bricks.push(new Brick(pos.x, pos.y));
    }
  }
}

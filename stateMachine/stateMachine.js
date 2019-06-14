//States
const START = 0;
const RUNNING = 1;
const PAUSE = 2;
const COUNTDOWN= 3;
const CONFIG = 4;
const CHANGEBALL = 5;
const ABOUT = 6;
const OTHER = 7;
const OPTIONS = 8;
const CHANGEPADDLE = 9;


class StateMachine {
  constructor(logo) {
    this.currentState = START;
    this.fistLoad = true;
    this.circleP = false;
    this.game = new Game();
    this.time = 3;
    this.mouseSound = true;
    this.cp = new CirclePacking(width/2 - 150, height/2 - 235, logo);
    this.particle = new ParticleSystem();
    this.steerB = new steeringBehavior(width/2, height/2);
    this.randomWalk = new RandomWalk();
    this.pLvl = this.game.lvl;
    this.chaoesGame = new chaosGame();
    this.superShape = new SuperShape();
    this.bricks = [];
    this.phyllotaxis = new Phyllotaxis();

    this.startState = new startState(this);
    this.aboutState = new aboutState(this);
    this.configState = new configState(this);
    this.changeball = new changeBallState(this);
    this.optionsState = new optionsState(this);
    this.countDown = new countDownState(this);
    this.pauseState = new pauseState(this);
    this.runningState = new runningState(this);
    this.changePaddle = new changePaddleState(this);

    this.randomBricks();
  }
  
  runMachine() {
    
    //Draw some bricks to the screen
    //this.drawBricks();

    //this.runRandomWalk();

    //this.chaoesGame.run();
    //this.chaoesGame.render();

    this.runBricks();

    this.runPhyllotaxis();
	
    //this.runFireworks();

    //If current state is About execute this function
    if(this.getState(ABOUT)) this.aboutState.run();

    //If current state is Config execute this function
    if(this.getState(CONFIG)) this.configState.run();

    //If current state is Start execute this function
    if(this.getState(START)) this.startState.run();

    if(this.getState(CHANGEBALL)) this.changeball.run();

    if(this.getState(OPTIONS)) this.optionsState.run();

    //If current state is CountDown execute this function
    if(this.getState(COUNTDOWN)) this.countDown.run();

    if(this.getState(PAUSE)) this.pauseState.run();

    if(this.getState(RUNNING)) this.runningState.run();

    if(this.getState(CHANGEPADDLE)) this.changePaddle.run();

    //Animated title
    this.titleAni();

    
  }

  //================ Util Functions =========================

  getState(state) {
    return this.currentState == state;
  }

  passGameKeyReleased() {
    this.game.controlReleased();
  }

  passGameKeyPressed(key) {
    if (key == ' ') {
      if (this.getState(RUNNING)) {
        this.currentState = PAUSE;
      }else if (this.getState(PAUSE)) {
        this.currentState = RUNNING;
      }
    } else {
      this.game.controlKey(key);
      this.game.usePowerUp(key);
      this.game.changePowerUp(key);
    }
  }

  runCirclePacking() {
    if ((!this.getState(RUNNING) && !this.getState(COUNTDOWN) && !this.getState(PAUSE))) {
      this.cp.run();
      this.cp.drawIt();
    }
  }

  titleAni() {
    if(this.circleP) {
      this.runCirclePacking();
    }else {
      this.runSteerBe();
    }
  }

  changeAni() {
    if(random(1) < 0.2) {
      this.circleP = false;
    }else {
      this.circleP = true;
    }
  }

  resetAnim() {
    if(this.circleP) {
      this.cp.reset();
    }else {
      this.steerB.reset();
    }
  }

  runSteerBe() {
    if ((!this.getState(RUNNING) && !this.getState(COUNTDOWN) && !this.getState(PAUSE))) {
      this.steerB.run();
    }
  }

  randomBricks() {
    this.bricks = [];
    let rand = floor(random(15, 50));
    for(let i = 0; i < rand; i++) {
      let x, y;
      if(random(1) < 0.5) {
        x = random(200);
      }else {
        x = random(400, width);
      }
      x = random(width);
      y = random(height);

      this.bricks.push(new Brick(x, y));
    }
  }


  runBricks() {
    if ((!this.getState(RUNNING) && !this.getState(COUNTDOWN) && !this.getState(PAUSE))) {
      for(let brick of this.bricks) {
        brick.display();
      }
    }
  }

  runPhyllotaxis() {
    if(this.getState(RUNNING) && backgroundAnimations) {
      const x = width * 0.5;
      const y = height * 0.5;

      this.phyllotaxis.run(x, y, 0);
      this.phyllotaxis.run(x - 200, y - 200, 1);
      this.phyllotaxis.run(x + 200, y - 200, 2);
      this.phyllotaxis.run(x - 200, y + 200, 3);
      this.phyllotaxis.run(x + 200, y + 200, 4);
    }
  }

  runRandomWalk(ignore) {
    if ((!this.getState(RUNNING) && !this.getState(COUNTDOWN) && !this.getState(PAUSE)) || ignore) {
      this.randomWalk.path = [];
    } else {
      this.randomWalk.run();
    }

    if(this.pLvl != this.game.lvl) {
      this.randomWalk.reset();
      this.pLvl = this.game.lvl;
    }
  }

}
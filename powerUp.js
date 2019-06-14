//All power ups
const BrickBreaker = 0;
const BlockBreaker = 1;
const ScoreTimes2  = 2;

class PowerUp {
  constructor() {
    this.hitPaddle = true;
    this.isPowerUpActive = false;
    this.powers = [];

    this.allPower = [
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

  generateRandomPowerUp (x, y, howManyBlocks) {
    const rand = floor(random(7 + howManyBlocks));
    
    //40% for BrickBreaker
    //30% for ScoreTimes2
    //30% for BlockBreaker
    if (rand >= 0 && rand < 4) {
      this.addPowerUp(x, y, BrickBreaker);
    } else if (rand >= 4 && rand < 7) {
      this.addPowerUp(x, y, ScoreTimes2);
    } else {
      this.addPowerUp(x, y, BlockBreaker);
    }
  }

  convertPowerUpName(val) {
    if (val == BrickBreaker) {
      return "BrickBreaker";
    } else if (val == BlockBreaker) {
      return "BlockBreaker";
    } else if (val == ScoreTimes2) {
      return "ScoreTimes2";
    }
    return;
  }

  run (paddle, power, ts) {
    for (let i = this.powers.length - 1; i >= 0; i--) {

      this.powers[i].update();   // Update the position of the power up
      this.powers[i].display();  // Render the power up

      //Check to see if the player pick up the powerUp
      if (paddle.catchPowerUp(this.powers[i])) {
        //find out what kind of power up the player got

        this.allPower[this.powers[i].which].howMuch ++;
        
        playSound("pickUpPowerUp");

        //Take an integer and transform into the name of the powerUp
        const powerUpName = this.convertPowerUpName(this.powers[i].which);
        
        ts.addMsg("+1 " + powerUpName, createVector(paddle.x + paddle.w/2, paddle.y - paddle.h/2), 16);
        
        //If it is not null add one more to howMuchPowerUp

        //then remove the power up
        this.powers.splice(i, 1);

        //Check if the power up is off the screen and remove it
      } else if (this.powers[i].offScreen()) {
        this.powers.splice(i, 1);
      }
    }
  }

  hasPowerUp() {
    const keys = Object.keys(this.allPower);

    for(let i = 0; i < keys.length; i++) {
      if(this.allPower[keys[i]].howMuch > 0) {
        return true;
      }
    }

    return false;
  }

  getAmount(power) {
    return this.allPower[power].howMuch;
  }

  isActive(power) {
    return this.allPower[power].active;
  }

  setPowerUp(which, bol) {
    this.allPower[which].active = bol;
  }

  reset () {
    const keys = Object.keys(this.allPower);

    for(let i = 0; i < keys.length; i++) {
      this.allPower[keys[i]].howMuch = 0;
      this.allPower[keys[i]].active = false;
    }

    this.hitPaddle = true;
    this.powers = [];
  }

  addPowerUp (x, y, whichOne) {
    this.powers.push(new Power(x, y, whichOne));
  }

  checkIsThere() {
    const keys = Object.keys(this.allPower);

    for(let i = 0; i < keys.length; i++) {
      if(this.allPower[keys[i]].active) {
        return true;
      }
    }

    return false;
  }

  takeOff (which) {
    this.allPower[which].howMuch--;
  }
}

class Power {
  constructor(x, y, which) {
    this.pos = createVector(x, y);
    this.which = which;
  }

  update() {
    this.pos.y += 5;
  }

  display() {
    if (this.which == BrickBreaker) {
      drawPu.target(this.pos.x, this.pos.y, 150, 1);
    } else if (this.which == BlockBreaker) {
      drawPu.hammer(this.pos.x, this.pos.y, 150, 1);
    } else if (this.which == ScoreTimes2) {
      drawPu.scoreTimes2(this.pos.x, this.pos.y, 150, 1);
    }
  }

  offScreen() {
    return this.pos.y > height;
  }
}

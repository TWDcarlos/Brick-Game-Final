class TextSystem {
  constructor() {
    //All strings
    this.loseGame    = "You Lose"; //Message of player win
    this.winGame     = "You Won"; //Message of player lose
    this.la          = "Left Arrow:";
    this.ra          = "Right Arrow:";
    this.ua          = "Up Arrow:";
    this.da          = "Down Arrow:";
    this.ml          = "Move Left";
    this.mr          = "Move Right";
    this.cpu         = "Change PowerUp";
    this.apu         = "Active PowerUp";
    this.goal        = "Objective:";
    this.goalDesc1   = "Destroy all bricks by deflecting";
    this.goalDesc2   = "the ball with the paddle";
    this.howStart    = "-- Space Bar to start --";
    this.howReset    = "Space Bar to restart the game.";
    this.howContinue = "Space Bar to continue the game.";
    //End all strings

    this.messages = [];


  }

  displayTimerScore2X(col, time, pos) {
    push();
    fill(col);
    strokeWeight(3);
    textSize(20);
    text(time, pos.x + 20, pos.y + 20);
    pop();
  }

  addMsg(msg, pos, size) {
    this.messages.push(new Msg(msg, pos, size));
  }

  run() {
    for (let i = this.messages.length - 1; i >= 0; i--) {
      this.messages[i].render();
      if (this.messages[i].update()) {
        this.messages.splice(i, 1);
      }
    }
  }

  displayHowMuchPowerUp (paddle, howMuch, which, power) {
    push();
    textSize(15);
    fill('#D02BED');

    if (which == 0) {
      drawPu.target(paddle.x + paddle.w - 10, paddle.y - 10, power == BrickBreaker ? 10 : 150, 0.5);
      text(howMuch, paddle.x + paddle.w, paddle.y - 7);
    } else if (which == 1) {
      drawPu.hammer(paddle.x + paddle.w - 40, paddle.y - 10, power == BlockBreaker ? 10 : 150, 0.5);
      text(howMuch, paddle.x + paddle.w - 30, paddle.y - 7);
    } else if (which == 2) {
      drawPu.scoreTimes2(paddle.x + paddle.w - 70, paddle.y - 10, power == ScoreTimes2 ? 10 : 150, 0.5);
      text(howMuch, paddle.x + paddle.w - 60, paddle.y - 7);
    }
    pop();
  }


  //Display Win message and how to start again
  winMsg() {
    //noLoop();
    push();
    stroke(0);
    strokeWeight(5);
    fill(240);
    rect(0, height/2 - 70, width, 130);
    textAlign(CENTER);
    fill('#BE33D6');
    textSize(60);
    text(this.winGame, width/2, height/2);
    textSize(20);
    fill('#53145E');
    text(this.howReset, width/2, height/2 + 30);
    pop();
  }

  loseMsg () {
    //noLoop();
    push();
    stroke(0);
    strokeWeight(5);
    fill(240);
    rect(0, height/2 - 70, width, 130);
    textAlign(CENTER);
    fill('#BE33D6');
    textSize(60);
    text(this.loseGame, width/2, height/2);
    textSize(20);
    fill('#E866FF');
    text(this.howContinue, width/2, height/2 + 30);
    pop();
  }
}


class Msg {
  constructor(msg, pos, size) {
    this.message = msg;
    this.pos = pos.copy();
    this.size = size;
    this.time = 30.
    this.col = '#FF00FF';
  }

  update() {
    if (this.time > 0) {
      this.pos.y -= 1;
      this.time--;
    } else {
      return true;
    }
    return false;
  }

  render() {
    push();
    fill(this.col);
    textSize(this.size);
    text(this.message, this.pos.x, this.pos.y);
    pop();
  }
}
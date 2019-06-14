class ScoreSystem {
  constructor(x, y) {
    this.allScore = [];
    this.scorePos = createVector(x, y);
    this.comboPos = createVector(x, y + 100);
    this.score = 0;
    this.lifeGain = 0;

    //Combo
    this.comboTime = 3;
    this.comboStack = 0;

    //To animate the score
    this.time = 10;
    this.fontSize = 17;
    this.animate = false;
  }

  addPoints(pos, amnt, scoreTimes2, gm, systemG) {
    if (amnt > 0) {
      this.comboTime = 3;
      if (scoreTimes2) amnt *= 2;
    } else {
      if (scoreTimes2) amnt = 0;
      this.comboTime = 0;
    }

    let newLife = floor(this.score/1000);
    if (newLife > this.lifeGain) {
      gm.life ++;
      this.lifeGain++;
      systemG.addMsg("+1 Life", createVector(width/2, height/2), 32);
    }

    this.allScore.push(new Score(pos, amnt));
    this.comboStack++;
  }

  displayScore(level, life) {
    push();
    textSize(this.fontSize);
    fill('#D02BED');
    textAlign(CENTER, CENTER);
    text("Score: " + this.score, this.scorePos.x, this.scorePos.y);

    textSize(15);
    fill('#ffffff');
    text("Level: " + level, this.scorePos.x - 100, this.scorePos.y);
    text("Life : " + life, this.scorePos.x + 100, this.scorePos.y);
    pop();
  }

  animateScore() {
    if (this.animate && this.time > 0) {
      this.time--;
      this.fontSize = map(this.time, 10, 0, 17, 30);
      if (this.time == 0) this.animate = false;
    } else {
      this.time = 10; 
      this.fontSize  = 17;
    }
  }

  update(level, life) {
    this.displayScore(level, life);
    this.animateScore();

    for (let i = this.allScore.length - 1; i >= 0; i--) {

      //Using the variable z of the PVector to lerp
      this.allScore[i].update(this.scorePos);

      //Resize the text acording where it is on the screen
      textSize(this.allScore[i].closer());

      //Check if the was positive if was increase the score otherwise decrease

      this.allScore[i].render();
      this.allScore[i].increaseLerp(0.03);

      if (this.allScore[i].doneIt(this.scorePos.y)) {
        this.score += this.allScore[i].amount;
        this.animate = true;
        this.allScore.splice(i, 1);
      }
    }
  }
}



class Score {
  constructor(pos, amnt) {
    this.positive = false;
    this.amount = amnt;
    this.toCombo = false;
    this.done = false;
    this.pos = pos.copy();
    this.anotherPos = pos.copy();
    this.anotherPos.y -= 50;

    if (this.amount > 0) {
      this.positive = true; 
      this.toCombo  = true;
    }
  }

  update(whereIsTheScore) {
    if (this.done) {
      this.pos.x = lerp(this.pos.x, whereIsTheScore.x, this.pos.z);
      this.pos.y = lerp(this.pos.y, whereIsTheScore.y, this.pos.z);
    } else {
      this.pos.x = lerp(this.pos.x, this.anotherPos.x, this.pos.z);
      this.pos.y = lerp(this.pos.y, this.anotherPos.y, this.pos.z);
    }
  }

  closer() {
    return map(this.pos.y, 0, 200, 10, 40);
  }

  render() {
    //if positive fill green otherwise fill red
    if (this.positive) {
      fill('#289CA8');
    } else {
      fill('#DE3333');
    }

    text(this.amount, this.pos.x, this.pos.y);
  }

  doneIt(y) {
    return this.pos.y <= y+5;
  }

  increaseLerp(amnt) {
    if (this.pos.z <= 1) {
      this.pos.z += amnt;
    } else {
      this.pos.z = 0;
      this.done = true;
    }
  }
}
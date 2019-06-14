class startState {
  constructor(stateMachine) {
    this.particle = new ParticleSystem();
    this.stateMachine = stateMachine;
  }

  run() {
    elt.drawRect(width/2, height/2, 300, 450);

    let b1, b2, b3, b4;

    b1 = elt.isMouseOver(width/2, height/2, 200, 40);
    b2 = elt.isMouseOver(width/2, height/2 + 50, 200, 40);
    b3 = elt.isMouseOver(width/2, height/2 + 100, 200, 40);
    b4 = elt.isMouseOver(width/2, height/2 + 150, 200, 40);

    elt.drawButton(width/2, height/2, "Start Game", b1, 200, 40);
    elt.drawButton(width/2, height/2 + 50, "Challenge Mode", b2, 200, 40);
    elt.drawButton(width/2, height/2 + 100, "Change", b3, 200, 40);
    elt.drawButton(width/2, height/2 + 150, "About", b4, 200, 40);

    if(b1) this.renderHowToPlay(0);

    if(b2) {
      this.renderHowToPlay(50);
      this.infoChallengeMode();
    }

    if(b3) this.infoChange();

    if(b4) this.infoAbout();


    if (mouseIsPressed) {
      if (b1) {
        playSound("levelUp");
        this.stateMachine.currentState = COUNTDOWN;
        this.stateMachine.bricks = [];

      } else if (b2) {
        playSound("levelUp");
        //Challenge mode enable
        harderMode = true;
        this.stateMachine.game.life = 3;
        this.stateMachine.currentState = COUNTDOWN;
        this.stateMachine.bricks = [];
      } else if (b3) {
        playSound("levelUp");
        this.stateMachine.currentState = CONFIG;

        this.stateMachine.randomBricks();
        this.stateMachine.changeAni();
        this.stateMachine.resetAnim();
      } else if (b4) {
        playSound("levelUp");
        this.stateMachine.currentState = ABOUT;

        this.stateMachine.randomBricks();
        this.stateMachine.changeAni();
        this.stateMachine.resetAnim();
      }
    }

    const buttons = [b1, b2, b3, b4];
    soundSelect(buttons);

    push();
    textSize(13);
    textAlign(CENTER, CENTER);
    fill(0);
    this.particle.setColor(color(200, 20, 20));
    if(frameCount % 20 == 0) this.particle.addLetterParticle(createVector(width/2 - 50, height/2 + 210), createVector(random(-0.5, 0.5), -1), "s2");
    if(frameCount % 20 == 0) this.particle.addLetterParticle(createVector(width/2 + 50, height/2 + 210), createVector(random(-0.5, 0.5), -1), "s2");

    text("s2 -Yinning Shi- s2", width/2, height/2 + 210);

    const ys = elt.isMouseOver(width/2, height/2 + 210, 100, 20);
    if(ys) {
      elt.drawRect(width/2, height/2 + 240, 100, 30);
      push();
      textAlign(CENTER, CENTER);
      text("1023.io", width/2, height/2 + 240);

      pop();
    }

    this.particle.run();
    pop();
  }

  renderHowToPlay(y) {
    const pos = elt.drawFlotingBox(width/2, height/2 + y, 200, 110, false);

    push();
    textAlign(CENTER, CENTER);
    textSize(15);
    noStroke();
    fill(0);
    text("D - Move Right", pos.x, pos.y - 20);
    text("A - Move Left",pos.x, pos.y);
    text("S - Change Power Up", pos.x, pos.y + 20);
    text("W - Use Power Up", pos.x, pos.y + 40);
    text("SPACE - Pause the Game", pos.x, pos.y + 60);
    pop();
  }

  infoChallengeMode() {
    const pos = elt.drawFlotingBox(width/2, height/2 + 50, 200, 100, true);

    push();
    textAlign(CENTER, CENTER);
    textSize(18);
    noStroke();
    fill(0);
    text("The Paddle will never", pos.x, pos.y);
    text("stop moving and ",pos.x, pos.y + 20);
    text("Harder to get lifes", pos.x, pos.y + 40);
    pop();
  }

  infoChange() {
    const pos = elt.drawFlotingBox(width/2, height/2 + 100, 200, 100, false);

    push();
    textAlign(CENTER, CENTER);
    textSize(18);
    noStroke();
    fill(0);
    text("-- Options --", pos.x, pos.y - 10);

    textSize(15);
    text("Change the Ball", pos.x, pos.y + 10);
    text("Change the Paddle", pos.x, pos.y + 30);
    text("Changes", pos.x, pos.y + 50);
    pop();
  }

  infoAbout() {
    const pos = elt.drawFlotingBox(width/2, height/2 + 150, 200, 50, true);

    push();
    textAlign(CENTER, CENTER);
    textSize(18);
    noStroke();
    fill(0);
    text("-- Thank You --", pos.x, pos.y + 25);
    pop();
  }
}
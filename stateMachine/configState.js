class configState {
  constructor(stateMachine) {
    this.stateMachine = stateMachine;
  }

  run() {
    elt.drawRect(width/2, height/2, 300, 450);

    let b1, b2, b3, b4;
    b1 = elt.isMouseOver(width/2, height/2, 200, 40);
    b2 = elt.isMouseOver(width/2, height/2 + 50, 200, 40);
    b3 = elt.isMouseOver(width/2, height/2 + 100, 200, 40);
    b4 = elt.isMouseOver(width/2, height/2 + 180, 200, 50);

    let buttons = [b1, b2, b3, b4];
    soundSelect(buttons);

    elt.drawButton(width/2, height/2, "Change Ball", b1, 200, 40);
    elt.drawButton(width/2, height/2 + 50, "Change Paddle", b2, 200, 40);
    elt.drawButton(width/2, height/2 + 100, "Options", b3, 200, 40);
    elt.drawButton(width/2, height/2 + 180, "Return", b4, 200, 50);

    if(b3) this.infoOptions();

    if (mouseIsPressed) {
      if (b1) {
        playSound("levelUp");
        this.stateMachine.currentState = CHANGEBALL;
        
        this.stateMachine.randomBricks();
        this.stateMachine.changeAni();
        this.stateMachine.resetAnim();
      } else if (b2) {
        playSound("levelUp");
        this.stateMachine.currentState = CHANGEPADDLE;
        
        this.stateMachine.randomBricks();
        this.stateMachine.changeAni();
        this.stateMachine.resetAnim();
      } else if(b3) {
        playSound("levelUp");
        this.stateMachine.currentState = OPTIONS;

        this.stateMachine.randomBricks();
        this.stateMachine.changeAni();
        this.stateMachine.resetAnim();
      } else if(b4) {
        playSound("levelUp");
        this.stateMachine.currentState = START;

        this.stateMachine.randomBricks();
        this.stateMachine.changeAni();
        this.stateMachine.resetAnim();
      }
    }
  }


  infoOptions() {
    const pos = elt.drawFlotingBox(width/2, height/2 + 100, 200, 50, true);

    push();
    textAlign(CENTER, CENTER);
    textSize(18);
    noStroke();
    fill(0);
    text("More Options ?", pos.x, pos.y + 25);
    pop();
  }


}
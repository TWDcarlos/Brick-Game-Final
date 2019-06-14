class aboutState {
  constructor(stateMachine) {
    this.stateMachine = stateMachine;
  }

  run() {
    elt.drawRect(width/2, height/2, 300, 450);
    push();
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(16);
    text("I expanded the game of", width/2, height/2 - 25);
    textSize(18);
    text("Yininng Shi", width/2, height/2);
    textSize(16);
    text("to demonstrate my love for", width/2, height/2 + 25);
    textSize(18);
    text("Dan Shiffman", width/2, height/2 + 50);
    textSize(16);
    text(" and to practice all the ", width/2, height/2 + 75);
    text("good stuff that he taught", width/2, height/2 + 100);
    text("s2                     s2", width/2, height/2 + 125);

    let b1;
    b1 = elt.isMouseOver(width/2, height/2 + 180, 200, 50);

    let buttons = [b1];
    soundSelect(buttons);
    elt.drawButton(width/2, height/2 + 180, "Return", b1, 200, 50);

    if (mouseIsPressed) {
      if (b1) {
        this.stateMachine.currentState = START;
        this.stateMachine.randomBricks();
        this.stateMachine.changeAni();
        this.stateMachine.resetAnim();
      }
    }

    pop();
  }
}
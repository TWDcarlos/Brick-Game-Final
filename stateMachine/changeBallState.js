class changeBallState {
  constructor(stateMachine) {
    this.stateMachine = stateMachine;
  }

  run() {
    elt.drawRect(width/2, height/2, 300, 450);

    const keys = Object.keys(ballSkin);

    push();
    imageMode(CENTER);
    elt.drawRect(width/2, height/2, 100, 70);
    image(ballSkin[keys[INDEX]], width/2, height/2);

    textAlign(CENTER, CENTER);
    textSize(25);
    elt.drawRect(width/2, height/2 + 55, 200, 40);
    text(keys[INDEX], width/2, height/2 + 55);

    let b1, b2, save;
    b1 = elt.isMouseOver(width/2 + 50, height/2 + 120, 60, 50);
    b2 = elt.isMouseOver(width/2 - 50, height/2 + 120, 60, 50);
    save = elt.isMouseOver(width/2, height/2 + 180, 200, 50);

    elt.drawButton(width/2 + 50, height/2 + 120, ">>>", b1, 60, 50);
    elt.drawButton(width/2 - 50, height/2 + 120, "<<<", b2, 60, 50);
    elt.drawButton(width/2, height/2 + 180, "Save", save, 200, 50);

    const buttons = [b1, b2, save];
    soundSelect(buttons);

    if (mouseIsPressed) {
      if (b1) {
        playSound("levelUp");
        INDEX++;
      } else if (b2) {
        playSound("levelUp");
        INDEX--;
      } else if (save) {
        playSound("levelUp");
        this.stateMachine.currentState = CONFIG;
        this.stateMachine.randomBricks();
        this.stateMachine.changeAni();
        this.stateMachine.resetAnim();
      }
      if (INDEX >= keys.length) {
        INDEX = 0;
      } else if (INDEX < 0) {
        INDEX = keys.length - 1;
      }
    }

    pop();
  }
}
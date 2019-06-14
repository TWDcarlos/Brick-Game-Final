class pauseState {
  constructor(stateMachine) {
    this.stateMachine = stateMachine;
  }

  run() {
    this.stateMachine.game.drawThings();

    push();
    textSize(64);
    fill('#FF00FF');
    textAlign(CENTER, CENTER)
    text("Pause", width/2, height/2);
    pop();
    
  }
}
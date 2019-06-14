class runningState {
  constructor(stateMachine) {
    this.stateMachine = stateMachine;
  }

  run() {
    this.stateMachine.game.run();

    if (this.stateMachine.game.ballHit) {
      this.stateMachine.phyllotaxis.n = 0;
      this.stateMachine.game.ballHit = false;
    }

    if (this.stateMachine.game.lose()) {

      playSound("lostLife");
      this.stateMachine.currentState = COUNTDOWN;
      if (this.stateMachine.game.life > 0) {
        this.stateMachine.game.life --;
      } else {
        this.stateMachine.game.resetLife();
        this.stateMachine.currentState = START;
      }
    }

    if(this.stateMachine.game.lvl > 10) {
      this.stateMachine.game.resetLife();
      this.stateMachine.currentState = START;
    }
  }
}
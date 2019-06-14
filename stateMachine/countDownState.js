class countDownState {
  constructor(stateMachine) {
    this.stateMachine = stateMachine;
    this.time = 3;
    this.countingDown = true;
  }

  run() {
    this.stateMachine.game.drawThings();

    this.countDown();
    
    push();
    textSize(150);
    textAlign(CENTER, CENTER);
    fill(255, 0, 150);
    stroke(0);
    text(this.time, width/2, height/2);
    pop();

    //Update and Render the paddle
    this.stateMachine.game.paddle.update();
    this.stateMachine.game.paddle.render();

    if(this.time == 0) {
      this.time = 3;
      this.stateMachine.currentState = RUNNING;
      this.countingDown = true;
    }
  }

  countDown() {
    if(this.countingDown) {
      this.countingDown = false;
      const index = this.time + "";
      playSound(index);
      setTimeout(() => {
        this.time--;
        if(this.time != 0) {
          this.countingDown = true;
        }
      }, 1000);
    }
  }

}
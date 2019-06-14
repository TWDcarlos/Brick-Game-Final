class optionsState {
  constructor(stateMachine) {
    this.stateMachine = stateMachine;
  }

  run() {
    elt.drawRect(width/2, height/2, 300, 450);

    let b1, b2, b3, b4, b5;

    b1 = elt.isMouseOver(width/2, height/2 - 20, 200, 40);
    b2 = elt.isMouseOver(width/2, height/2 + 20, 200, 40);
    b3 = elt.isMouseOver(width/2, height/2 + 60, 200, 40);
    b4 = elt.isMouseOver(width/2, height/2 + 100, 200, 40);
    b5 = elt.isMouseOver(width/2, height/2 + 180, 200, 50);

    elt.drawCheckButton(width/2, height/2 - 20, "Active Particles", activeEffects, b1, 200, 40);
    elt.drawCheckButton(width/2, height/2 + 20, "CT Particles", ctParticles, b2, 200, 40);
    elt.drawCheckButton(width/2, height/2 + 60, "Music", onMusic, b3, 200, 40);
    elt.drawCheckButton(width/2, height/2 + 100, "Background Ani", backgroundAnimations, b4, 200, 40);
    elt.drawButton(width/2, height/2 + 180, "Save", b5, 200, 50)
    
    if(b1) this.infoParticles();
    if(b2) this.infoCTParticles();
    if(b3) this.infoMusic();
    if(b4) this.infoBackgroundAni();

    if (mouseIsPressed) {
      if(b1) {
        activeEffects = !activeEffects;
        playSound("levelUp");
      } else if(b2) {
        playSound("levelUp");
        ctParticles = !ctParticles;
      } else if(b3) {
        onMusic = !onMusic;
        playSound("levelUp");
      } else if(b4) {
        backgroundAnimations = !backgroundAnimations;
        playSound("levelUp");
      } else if(b5) {
        playSound("levelUp");
        this.stateMachine.currentState = CONFIG;

        this.stateMachine.randomBricks();
        this.stateMachine.changeAni();
        this.stateMachine.resetAnim();
      }
    }
  }

  infoParticles() {
    const pos = elt.drawFlotingBox(width/2, height/2 - 20, 200, 100, false);

    push();
    textAlign(CENTER, CENTER);
    textSize(18);
    noStroke();
    fill(0);
    text("-- Particles --", pos.x, pos.y - 10);

    textSize(15);
    text("Turn on or", pos.x, pos.y + 10);
    text("Turn off the", pos.x, pos.y + 30);
    text("Particles Effects", pos.x, pos.y + 50);
    pop();
  }

  infoCTParticles() {
    const pos = elt.drawFlotingBox(width/2, height/2 + 20, 200, 100, true);

    push();
    textAlign(CENTER, CENTER);
    textSize(18);
    noStroke();
    fill(0);
    text("-- CT Particles --", pos.x, pos.y - 10);

    textSize(15);
    text("Active the", pos.x, pos.y + 10);
    text("Coding Train", pos.x, pos.y + 30);
    text("Particles Effects", pos.x, pos.y + 50);
    pop();
  }

  infoMusic() {
    const pos = elt.drawFlotingBox(width/2, height/2 + 60, 200, 100, false);

    push();
    textAlign(CENTER, CENTER);
    textSize(18);
    noStroke();
    fill(0);
    text("-- Music --", pos.x, pos.y - 10);

    textSize(15);
    text("Turn on or", pos.x, pos.y + 10);
    text("Turn off the", pos.x, pos.y + 30);
    text("Music", pos.x, pos.y + 50);
    pop();
  }

  infoBackgroundAni() {
    const pos = elt.drawFlotingBox(width/2, height/2 + 100, 200, 100, true);

    push();
    textAlign(CENTER, CENTER);
    textSize(18);
    noStroke();
    fill(0);
    text("-- Animations --", pos.x, pos.y - 10);

    textSize(15);
    text("Turn on or", pos.x, pos.y + 10);
    text("Turn off the", pos.x, pos.y + 30);
    text("Background Animations", pos.x, pos.y + 50);
    pop();
  }

}
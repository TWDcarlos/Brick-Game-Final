let stateMachine;
let logo;
let allSongs = {};
let ballSkin = {};
let paddleSkin = {};
let CT = [];

let font;

let elt, drawPu;

let mousePos;

let activeEffects = true;
let harderMode = false;
let ctParticles = false;
let onMusic = true;
let backgroundAnimations = false;

function preload() {
  logo = loadImage("graphics/logo.png");
  
  //Made by Shiffman:   https://www.youtube.com/user/shiffman
  allSongs["3"] = loadSound("sound/03 - Shiffman.wav");
  allSongs["2"] = loadSound("sound/02 - Shiffman.wav");
  allSongs["1"] = loadSound("sound/01 - Shiffman.wav");

  //Made by Jovica:     https://freesound.org/people/Jovica/
  //Pack used:          https://freesound.org/people/Jovica/packs/137/
  allSongs["brick"] = loadSound("sound/jovica__stab-011-mastered-16-bit.wav");
  allSongs["block"] = loadSound("sound/jovica__stab-002-mastered-16-bit.wav");

  //Made by rhodesmas:      https://freesound.org/people/rhodesmas/
  //Music used:             https://freesound.org/people/rhodesmas/sounds/320654/
  allSongs["levelUp"] = loadSound("sound/rhodesmas__level-up-02.wav");

  allSongs["lostLife"] = loadSound("sound/lostLife.wav");
  allSongs["pickUpPowerUp"] = loadSound("sound/pickUpPowerUp.wav");
  allSongs["usePowerUp"] = loadSound("sound/usedPowerUp.wav");
  allSongs["wallHit"] = loadSound("sound/wallHit.wav");
  allSongs["select"] = loadSound("sound/selectSound.wav");
  allSongs["destroyBrick"] = loadSound("sound/destroyBrick.wav");

  ballSkin["Default"] = loadImage("graphics/default.png");
  ballSkin["Processing Logo"] = loadImage("graphics/processingLogo.png");
  ballSkin["P5 Logo"] = loadImage("graphics/p5Logo.png");
  ballSkin["Yinning Shi"] = loadImage("graphics/yinningLogo.png");
  ballSkin["Dan Shiffman"] = loadImage("graphics/shiffman.png");

  paddleSkin["Default"] = loadImage("graphics/paddle2.png");
  paddleSkin["Coding Train"] = loadImage("graphics/paddle3.png");

  CT.push(loadImage("graphics/dot.png"));
  CT.push(loadImage("graphics/aaaaa.png"));
  CT.push(loadImage("graphics/bracket.png"));
  CT.push(loadImage("graphics/dotV.png"));
  CT.push(loadImage("graphics/equal.png"));
  CT.push(loadImage("graphics/quad.png"));
  CT.push(loadImage("graphics/star.png"));
  CT.push(loadImage("graphics/triangle.png"));
  CT.push(loadImage("graphics/zero.png"));

  font = loadFont("Lato-Black.ttf");
}

function setup() {
  createCanvas(800, 600);

  drawPu = new drawPowerUp();
  elt = new domElt();
  stateMachine = new StateMachine(logo);
}


function draw() {
  background(20);
  mousePos = createVector(mouseX, mouseY);

  stateMachine.runMachine();

}


function keyPressed() {
  stateMachine.passGameKeyPressed(key);
}

function keyReleased() {
  stateMachine.passGameKeyReleased();
}

function playSound(index) {
  if(onMusic) {
    allSongs[index].play();
  }
}

function soundSelect(bools) {
  let sum = 0;
  for (let i = 0; i < bools.length; i++) {
    if (bools[i]) {
      if (this.mouseSound) {
        playSound("select");
      }

      this.mouseSound = false;
    } else {
      sum++;
    }
  }
  if (sum == bools.length) {
    this.mouseSound = true;
  }
}
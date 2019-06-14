class domElt {
  constructor() {
  }

  drawButton(x, y, txt, hover, w, h) {
    push();
    rectMode(CENTER);
    noFill();
    if (hover) {
      stroke(0);
      fill(0);
      w += 10;
      h += 5;
      textSize(25);
    } else {
      stroke(150);
      fill(150);
      textSize(20);
    }
    textAlign(CENTER, CENTER);
    text(txt, x + 5, y);
    noFill();
    rect(x, y, w, h);
    pop();
  }

  drawCheckButton(x, y, txt, check, hover, w, h) {
    push();
    rectMode(CENTER);
    noFill();
    const insideRect = x - w*0.35;
    rect(insideRect, y, 40, 35);

    if (hover) {
      stroke(0);
      fill(0);
      w += 10;
      h += 5;
      textSize(25);
    } else {
      stroke(150);
      fill(150);
      textSize(20);
    }

    if (check) {
      fill(0, 150, 0);
      rect(insideRect, y, 20, 20);
    }

    textAlign(CORNER, CENTER);
    textSize(20);
    text(txt, insideRect + 25, y);
    noFill();
    rect(x, y, w, h);
    pop();
  }

  isMouseOver(x, y, w, h) {
    if (mouseX > x - w/2 && mouseX < x + w/2) {
      if (mouseY > y - h/2 && mouseY < y + h/2) {
        return true;
      }
    }
    return false;
  }

  drawFlotingBox(x, y, w, h , turn) {
    push();
    fill(250)
    strokeWeight(5);
    stroke(0);

    let pos;
    if(turn) {
      x -= 110;
      rect(x - (20 + w), y - h*0.5, w, h, 10);
      line(x, y, x - 20, y+20);
      line(x, y, x - 20, y-20);

      pos = createVector(x - 120, y - 20);
    }else {
      x += 110;
      rect(x + 20, y - h*0.5, w, h, 10);
      line(x, y, x + 20, y+20);
      line(x, y, x + 20, y-20);
    
      pos = createVector(x + 120, y - 20);
    }
    pop();
    return pos;
  }

  drawRect(x, y, wid, hei) {
    push();
    stroke(0);
    strokeWeight(5);
    textAlign(CENTER, CENTER);
    fill(250);
    rectMode(CENTER);
    rect(x, y, wid, hei);
    line(width/2 - 150, height/2 - 50, width/2 + 150, height/2 - 50);

    textLeading(26);
    pop();
  }
}
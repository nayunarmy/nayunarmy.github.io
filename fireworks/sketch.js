// fireworks demo
// navya sauhta
// 18 november 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Fireworks OOP


class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.size = 5;
    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.opasity = 255;
  }

  display() {
    noStroke();
    fill(this.r, this.g, this.b, this.opasity);
    circle(this.x, this.y, this.size, this.opasity);
  }

  update() {
    //move
    this.x += this.dx;
    this.y += this.dy;

    //fade away over time
    this.opasity--;
  }

  isDead(){
    return this.opacity <=0;
  }
}

let theFireworks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  for (let firework of theFireworks) {
    if (firework.isDead()){
      //remove it
      let index = theFireworks.indexOf(firework);
      theFireworks.splice(index, 1);
    }
    else{
      firework.update();
      firework.display();
    }
  }
}

function mousePressed() {
  for (let i = 0; i < 250; i++) {
    let someParticle = new Particle(mouseX, mouseY);
    theFireworks.push(someParticle);
  }
}
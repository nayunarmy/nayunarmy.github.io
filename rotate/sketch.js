// Translate and rotate
// Navya sauhta
// 17 oct 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  background(220);

  push();//save the transmission matrix
  translate(200,200);
  rotate(mouseX);
  fill("red");
  square(0, 0, 100);
  pop();//reset to the push version


  fill("green");
  noStroke();
  rect(width/2, height - 100, width * 2, 400);
}

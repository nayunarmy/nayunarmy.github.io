// generative art demo
// Navya Sauhta
// Oct 4 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

function setup(){
  createCanvas(windowWidth, windowHeight);

}

function draw(){
  background(220);
  rerusiveCircle(width/2, height/2, mouseX);

}

function rerusiveCircle(x, y, radius){
  circle(x, y, radius*2);

  if (radius > 0){
    rerusiveCircle(x - radius/2, y, radius/2);
    rerusiveCircle(x + radius/2, y, radius/2);
  }
}
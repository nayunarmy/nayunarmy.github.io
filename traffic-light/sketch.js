
// Traffic Light Starter Code
// Your Name Here
// The Date Here

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

let isGreen = true;
let waitTime = 2000;
let lastTimeSwitched = 0;


function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  drawOutlineOfLights();
    if (millis() > lastSwitchedTime + waitTime ){
  }

}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //lights
  fill(255);
  fill(255, 0, 0)
  ellipse(width/2, height/2 - 65, 50, 50); //top
  fill(255,255,0)
  ellipse(width/2, height/2, 50, 50); //middle
  fill(50,205,50)
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}

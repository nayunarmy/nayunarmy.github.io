// Sounds Effects demo
// Navya Sauhta
// 16 Oct 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let bgMusicLoop;
let clickSound;


function preload(){
  bgMusicLoop = loadSound("bgMusic.mp3");
  cliskSound = loadSound("potpickup.ogg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bgMusicLoop.amp(0.3);
  clickSound.amp(0.3);
}

function draw() {
  background(220);
}


function keyPressed(){
  if(!bgMusicLoop.isplaying()){
    bgMusicLoop.loop();
  }
}

function mousePresses(){
  clickSound.play();
}
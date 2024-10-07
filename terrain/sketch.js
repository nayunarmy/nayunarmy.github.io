// Generating terrain demo
// navya Sauhta
// 10-7-2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let terrain =[];
const NUMBER_OF_RECS = 600;

function setup() {
  createCanvas(windowWidth, windowHeight);
  let howWide = width/NUMBER_OF_RECS;
  generateTerrain(howWide);
}

function draw() {
  background(220);

  for (let someRect of terrain){
    rect(someRect.x, someRect.y, someRect.w, someRect.h);
  }

}

function generateTerrain(theWidth){
  let time = 0;
  let deltaTime = 0.001;
  for (let x = 0; x < width; x +=theWidth){
    let theHeight = noise(time) * height;
    let someRect = SpawnRectangle(x, theHeight, theWidth);
    terrain.push(someRect);
    time += deltaTime;
}
}
  

function SpawnRectangle(leftSide, rectHeight, rectWidth){
  let theRect = {
    x: leftSide,
    y: height - rectHeight,
    w: rectWidth, 
    h: rectHeight,
  };
  return theRect;
}

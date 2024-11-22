// collide 2d
// navya Sauhta
// 22 Nov 2024
//


let hit = false;
const poly = []; // stores the vertices for our polygon.

function setup() {
  createCanvas(500, 500);
  collideDebug(true); // enable debug mode

  // Set x,y positions as vecs:
  poly[0] = createVector(123, 231);
  poly[1] = createVector(10, 111);
  poly[2] = createVector(20, 23);
  poly[3] = createVector(390, 33);
}

function draw() {
  background(255);

  // Draw the polygon by iterating over the 4 created vectors{x, y} stored in poly[]:
  beginShape();
  for (const { x, y } of poly)  {
    vertex(x, y);
  }
  endShape(CLOSE);

  circle(mouseX, mouseY, 45);

  hit = collideCirclePoly(mouseX, mouseY, 45, poly);


  

  stroke(hit ? color('red') : 0);
  print('colliding?', hit);
}

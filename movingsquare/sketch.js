// square moving around screen
// sept 19, 2024


x = 0;
y = 0;
speed = 2;
size = 50;

function setup() {
  createCanvas(400, 400);
}

function mouseWheel(event) {
  if (event.delta > 0) {
    size += 4;
  } else {
    size -= 4;
  }
}

function draw() {
  background(220);
  fill(0);
  
  if (x < width-size && y === 0){
    x+= speed;
  }
  
  if (x === width-size && y < height - size) {
    y += speed;
  }
  
  if (x > 0 && y === height - size) {
    x -= speed;
  }
  
  if (x === 0 && y > 0) {
    y -= speed;
  }
  
  square(x, y, size);
}

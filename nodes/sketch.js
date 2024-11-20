// nodes oop demo
// Navya Sauhta
// 20 Nov 2024
//

let points =[];

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnPoint(width/1, height/2);
}

function draw() {
  background(135,206,250);
  //move and draw lines
  for (let point of points){
    point.update(points);
    //draw circles afer 
  }
  for(let point of points){
    point.display();
  }
}

function mousePressed(){
  spawnPoint(mouseX, mouseY);
}

function spawnPoint(x, y){
  let somePoint = new MovingPoint(x, y);
  points.push(somePoint);
}


class MovingPoint{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.radius = 15;
    this.color = color(random(0), random(0),random(255));
    this.xTime = random(1000);
    this.yTime = random(1000);
    this.deltaTime = 0.01;
    this.reach = 150;
    this.MIN_RADIUS = 5;
    this.MAX_RADIUS = 50;
  }

  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius * 2);
  }

  update(thePoints){
    this.move();
    this.wrapAroundScreen();
    this.connectTo(thePoints);
    this.adjustSizeWithMouse();
  }

  adjustSizeWithMouse(){
    let mouseDistance = dist(this.x, this.y, mouseX,mouseY);
    if(mouseDistance < this.reach){
      let thesize = map( mouseDistance, 0, this.reach, this.MAX_RADIUS, this.MIN_RADIUS);
      this.radius = thesize;
    }
    else{
      this.radius = this.MIN_RADIUS;
    }
  }

  move(){
    //pick random
    let dx = noise(this.xTime);
    let dy = noise(this.yTime);

    //scale
    this.dx = map(dx, 0, 1, -this.speed, this.speed);
    this.dy = map(dy, 0, 1, -this.speed, this.speed);

    //move point
    this.x += this.dx;
    this.y += this.dy;
    //impliment
    this.xTime += this.deltaTime;
    this.yTime += this.deltaTime;
  }

  wrapAroundScreen(){
    //tellipost accross screen if you fall off
    if (this.x < 0){
      this.x += width;
    }
    if(this.x > width){
      this.x -= width;
    }
    if(this.y < 0){
      this.y += height;
    }
    if (this.y > height){
      this.y -= height;
    }
  }

  connectTo(pointsArray){
    for(let otherPoint of pointsArray){
      //avoid drawing line to self
      if(this !== otherPoint){
        let pointDistance = dist(this.x, this.y, otherPoint.x, otherPoint.y);
        if(pointDistance < this.reach){
          stroke(this.color);
          line(this.x, this.y, otherPoint.x, otherPoint.y);
        }
      }
    }
  }
}
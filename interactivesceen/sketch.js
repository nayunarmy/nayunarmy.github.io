// Bubble Clicker
// Navya Sauhta
// 17sep, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let circleX;
let circleY;
let circleXVelocity;
let circleYVelocity;
let circleRadius;
let circleMaxRadius;
let circleColor;
let score = 0;
let highScore;
let circleSpeed = 2;
let shrinkSpeed = 0.1;
// let backgroundImg;

// function preload(){ 
//   backgroundImg = loadImage('background.png')
// }

function setup() {
  createCanvas(550, 550);
  colorMode(HSB);
  noStroke();
  ellipseMode(RADIUS);
  textSize(36);
 }

function draw() {
  background(0);
  // image(backgroundImg, 0, 0, width, height);
//CIRCLE SHRINKING STUFF


  // Check if it's time to create a new circle
  // if (millis() - lastCircleTime > circleInterval) {
  //   resetCircle(); // Reset the circle to a new position and color
  //   lastCircleTime = millis(); // Update the last circle time
  // }
// CIRCLE SHRINKING STUFF

    // If the circle had not shrunk completely
  if (circleRadius > 0) {
    // Draw the circle
    fill(circleColor);
    circle(circleX, circleY, circleRadius);
    // Shrink it
    circleRadius -= shrinkSpeed;
    
//CIRCLE MOVING
    circleX += circleXVelocity;
    circleY += circleYVelocity;

// BOUNCE LOGIC
    // Check if the circle hits the left or right edge
    if (circleX - circleRadius <= 0 || circleX + circleRadius >= width) {
      circleXVelocity *= -1;  // Reverse horizontal direction
    }

    // Check if the circle hits the top or bottom edge
    if (circleY - circleRadius <= 0 || circleY + circleRadius >= height) {
      circleYVelocity *= -1;  // Reverse vertical direction
    }
// SHOW THE SCORE
    textAlign(RIGHT, TOP);
    fill(220);
    text(score, width - 20, 20);
    describeElement('Score', `Text with current score: ${score}`);
  } else {
    // Otherwise show the start/end screen
    endGame();
  }
}

function startGame() {
  // Reset the score to 0
  score = 0;

  //set the direction to be random 
  if (random() > 0.5) circleXVelocity *= -6;  
  if (random() > 0.5) circleYVelocity *= -6;
  // Start circle point
  circleMaxRadius = min(height / 6, width / 6);
  resetCircle();
}

function endGame() {
  // Pause the sketch
  noLoop();

  textAlign(CENTER, CENTER);

  fill(225);

  let startText = `Bubble pop
  Pop the bubble before it goes too far awy
  Score: ${score}
  Click to play`;
  text(startText, 0, 0, width, height);
  describeElement('Start text', `Text reading, "${startText}"`);
}

function resetCircle() {
  // Start with the circle's radius at its maximum value
  circleRadius = circleMaxRadius;
  circleX = width / 2;
  circleY = height / 1.7 + 70;
  circleXVelocity = random([-1, 1]) * circleSpeed;
  circleYVelocity = random([-1, 1]) * circleSpeed;

  circleColor = color(random(240, 360), random(40, 80), random(50, 90));
}

function mousePressed() {
  if (isLooping() === true) {
    // Check how far the mouse is from the circle
    let distanceToCircle = dist(mouseX, mouseY, circleX, circleY);

    // If the mouse is closer to the circle's center than the circle's radius,
    // that means the player clicked on it
    if (distanceToCircle < circleRadius) {
      // Decrease the maximum radius, but don't go below 15
      circleMaxRadius = max(circleMaxRadius - 1, 15);
      resetCircle();

      score += 1;
    }
  } else {
    startGame();
    loop();
  }
}
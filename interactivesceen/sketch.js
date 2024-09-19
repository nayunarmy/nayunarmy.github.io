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
let circleMaximumRadius;
let circleColor;
let score = 0;
let highScore;
let backgroundImg;

function preload(){ 
  backgroundImg = loadImage('background.png')
}

function setup() {
  createCanvas(550, 400);
  colorMode(HSB);
  noStroke();
  ellipseMode(RADIUS);
  textSize(36);
}

function draw() {
  // background(200);
  image(backgroundImg, 0, 0, width, height);
//CIRCLE SHRINKING STUFF
    // If the circle had not shrunk completely
  if (circleRadius > 0) {
    // Draw the circle
    fill(circleColor);
    circle(circleX, circleY, circleRadius);
    describeElement('Circle', 'Randomly colored shrinking circle')
    // Shrink it
    circleRadius -= 0.1;
    
//CIRCLE MOVING
    circleX += circleXVelocity;
    circleY += circleYVelocity;

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
  circleXVelocity = 0.5;  
  circleYVelocity = 0.5; 

  //set the direction to be random 
  if (random() > 0.5) circleXVelocity *= -2;  
  if (random() > 0.5) circleYVelocity *= -3;
  // Start circle point
  circleMaximumRadius = min(height / 6, width / 6);
  resetCircle();
}

function endGame() {
  // Pause the sketch
  noLoop();

  textAlign(CENTER, CENTER);
  fill(250);
  let startText = `Bubble pop
  Pop the bubble before it goes too far awy
  Score: ${score}
  Click to play`;
  text(startText, 0, 0, width, height);
  describeElement('Start text', `Text reading, "${startText}"`);
}

function resetCircle() {
  // Start with the circle's radius at its maximum value
  circleRadius = circleMaximumRadius;
  circleX = width / 2;
  circleY = height / 1.7 + 70;
    circleXVelocity = random([-1, 1]) * 0.5; // Randomly choose between -0.5 and 0.5
  circleYVelocity = random([-1, 1]) * 0.5; // Randomly choose between -0.5 and 0.5
  circleColor = color(random(240, 360), random(40, 80), random(50, 90));
}

function mousePressed() {
  // If the game is unpaused
  if (isLooping() === true) {
    // Check how far the mouse is from the circle
    let distanceToCircle = dist(mouseX, mouseY, circleX, circleY);

    // If the mouse is closer to the circle's center than the circle's radius,
    // that means the player clicked on it
    if (distanceToCircle < circleRadius) {
      // Decrease the maximum radius, but don't go below 15
      circleMaximumRadius = max(circleMaximumRadius - 1, 15);
      resetCircle();

      // Give the player a point
      score += 1;
    }
    // If the game is paused
  } else {
    // Start and unpause it
    startGame();
    loop();
  }
}
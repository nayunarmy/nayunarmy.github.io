// Wordle Game 
//Navya Sauhta
//28 Oct 2024
//
//extra;


//GLOBAL VARIABLES
let boardSize = 400;
let cellSize = boardSize / 5; 
let listPage = 'start';
let startButton, optionButton1, optionButton2, inputField;
let targetWord = ""; 
let guesses = []; 
let maxAttempts = 6; 
let currentAttempt = 0; 
let genzWordList = [];
let genaWordList = [];
let currentGuess = ""; 
let openPageImage;

function preload(){
  //word lists
  genzWordList = loadStrings("genZ");
  genaWordList = loadStrings("genA");

  //background list
  openPageImage = loadImage("openPage1.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

 //BUTTONS
  startButton = createButton('Start');
  startButton.class('startButton');
  startButton.mouseClicked(optionPage);

  optionButton1 = createButton('Gen Z Slang');
  optionButton1.position(width / 2 - 50, height / 2 + 50);
  optionButton1.mouseClicked(() => startGame("GenZ"));

  optionButton2 = createButton('Gen A Slang');
  optionButton2.position(width / 2 - 50, height / 2 + 100);
  optionButton2.mouseClicked(() => startGame("GenA"));
}

function draw() {
  background(220);
  displayPage();
}

function displayPage() {
  if (listPage === 'start') {
    background(255);
    let imgAspect = openPageImage.width / openPageImage.height;
    let canvasAspect = width / height;

    let imgWidth, imgHeight;

    if (canvasAspect > imgAspect) {
      // Canvas is wider than image
      imgHeight = height;
      imgWidth = imgHeight * imgAspect;
    } else {
      // Canvas is taller than image
      imgWidth = width;
      imgHeight = imgWidth / imgAspect;
    }

    // Center the image on the canvas
    image(openPageImage, (width - imgWidth) / 2, (height - imgHeight) / 2, imgWidth, imgHeight);
    showStartPage();
    showStartPage();
  } 
  else if (listPage === 'optionPage') {
    showOptionPage();
  } 
  else if (listPage === 'game') {
    drawGrid();
  }
  else if (listPage === 'win'){
    showEndMessage("You Win!");
  }
  else if (listPage === 'lose'){
    showEndMessage( " Tou Lose! The word was:" + targetWord)
    
  }
}

function showEndMessage(message){
  textSize(50);
  fill(0);
  textAlign(CENTER, CENTER);
  text(message, width / 2, height / 2);
  textSize(20);
  text("Press SPACE to restart", width / 2, height / 2 + 50);
}

function showStartPage() {
  
  startButton.show();
  optionButton1.hide();
  optionButton2.hide();
}

function showOptionPage() {
  textSize(50);
  textAlign(CENTER, CENTER);
  text('Choose your option', width / 2, height / 2 - 100);

  startButton.hide();
  optionButton1.show();
  optionButton2.show();
}

function optionPage() {
  listPage = 'optionPage';
}

function startGame(category) {
  listPage = 'game';
  guesses = []; // Reset guesses
  currentAttempt = 0;

  // Assign target word based on chosen category
  if (category === "GenZ"){
    targetWord = random(genzWordList).toUpperCase();
  }
  else if (category === "GenA"){
    targetWord = random(genaWordList).toUpperCase();
  }

  console.log("Target word is:", targetWord); // Add this line
  // targetWord = category === "GenZ" ? "YEETS": "COOLY"; // Example words
  

  optionButton1.hide();
  optionButton2.hide();
}

function keyPressed() {
  if ((listPage === 'win' || listPage === 'lose') && key === ' '){
    resetGame();
  }
  else if  (listPage === 'game') {
      // Only process input if in game mode
    if (keyCode >= 65 && keyCode <= 90 && currentGuess.length < targetWord.length) {
      // Append the key to the current guess if it's a letter
      currentGuess += key.toUpperCase();
    } 
    else if (keyCode === BACKSPACE && currentGuess.length > 0) {
      // Remove the last letter on Backspace
      currentGuess = currentGuess.slice(0, -1);
    } 
    else if (keyCode === ENTER && currentGuess.length === targetWord.length) {
      // Handle guess submission on Enter key
      handleGuess();
    }
  }
}
function handleGuess() {
  // Ensure guess is processed only if it's the right length
  if (currentGuess.length === targetWord.length) {
    guesses.push(checkGuess(currentGuess, targetWord));
    currentAttempt++;
    currentGuess = ""; // Reset current guess for next attempt

    if (guesses[currentAttempt - 1].every(cell => cell.color === 'green')) {
      listPage = 'win';
    } else if (currentAttempt === maxAttempts) {
      listPage = 'lose';
    }
  }
}

function checkGuess(guess, target) {
  let result = [];
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === target[i]) {
      result.push({letter: guess[i], color: 'green'});
    } 
    else if (target.includes(guess[i])) {
      result.push({letter: guess[i], color: 'yellow'});
    } 
    else {
      result.push({letter: guess[i], color: 'gray'});
    }
  }
  return result;
}

function resetGame() {
  guesses = [];
  currentAttempt = 0;
  listPage = 'optionPage';
}

function drawGrid() {
  textSize(32);
  textAlign(CENTER, CENTER);
  for (let i = 0; i < maxAttempts; i++) {
    for (let j = 0; j < targetWord.length; j++) {
      let x = width / 1.85 - boardSize / 1.5 + j * cellSize;
      let y = height / 2 - boardSize / 1.5 + i * cellSize;
      
      // Determine color based on guess
      if (i < guesses.length && guesses[i][j]) {
        fill(guesses[i][j].color); // Fill with the color based on result
      } else {
        fill(255); // Default color for empty cells
      }
      
      // Draw the cell with the appropriate color
      rect(x, y, cellSize, cellSize);
      
      // Draw the letter in the cell if it exists
      if (i < guesses.length && guesses[i][j]) {
        fill(0); // Set text color to black for visibility
        text(guesses[i][j].letter, x + cellSize / 2, y + cellSize / 2);
      } else if (i === currentAttempt && j < currentGuess.length) {
        fill(0); // Set text color to black for the current guess
        text(currentGuess[j], x + cellSize / 2, y + cellSize / 2);
      }
    }
  }
}



// Wordle Game with Grid Layout

let boardSize = 400;
let cellSize = boardSize / 5; // 5 columns for a 5-letter word
let listPage = 'start';
let startButton, optionButton1, optionButton2, inputField;
let targetWord = ""; // Target word for the game
let guesses = []; // Array to store guesses
let maxAttempts = 6; // Maximum number of attempts
let currentAttempt = 0; // Track the current attempt

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Initialize buttons
  startButton = createButton('Start');
  startButton.position(width / 2 - 50, height / 2);
  startButton.mouseClicked(optionPage);

  optionButton1 = createButton('Gen Z Slang');
  optionButton1.position(width / 2 - 50, height / 2 + 50);
  optionButton1.mouseClicked(() => startGame("GenZ"));

  optionButton2 = createButton('Gen A Slang');
  optionButton2.position(width / 2 - 50, height / 2 + 100);
  optionButton2.mouseClicked(() => startGame("GenA"));

  // Input for guesses
  inputField = createInput();
  inputField.position(width / 2 - 50, height - 100);
  inputField.size(100);
  inputField.hide();
  inputField.changed(handleGuess);
}

function draw() {
  background(220);
  displayPage();
}

function displayPage() {
  if (listPage === 'start') {
    showStartPage();
  } 
  else if (listPage === 'optionPage') {
    showOptionPage();
    
  } 
  else if (listPage === 'game') {
    drawGrid();
    inputField.show();
  }
}

function showStartPage() {
  textSize(50);
  textAlign(CENTER, CENTER);
  text('Welcome to Wordle', width / 2, height / 2 - 50);

  startButton.show();
  optionButton1.hide();
  optionButton2.hide();
  inputField.hide();
}

function showOptionPage() {
  textSize(50);
  textAlign(CENTER, CENTER);
  text('Choose your option', width / 2, height / 2 - 100);

  startButton.hide();
  optionButton1.show();
  optionButton2.show();
  inputField.hide();
}

function optionPage() {
  listPage = 'optionPage';
}

function startGame(category) {
  listPage = 'game';
  guesses = []; // Reset guesses
  currentAttempt = 0;

  // Assign target word based on chosen category
  targetWord = category === "GenZ" ? "YEETS" : "COOLY"; // Example words
  
  inputField.value("");
  inputField.show();
}

function handleGuess() {
  let guess = inputField.value().toUpperCase();
  
  // Only proceed if guess is the correct length
  if (guess.length === targetWord.length && currentAttempt < maxAttempts) {
    guesses.push(checkGuess(guess, targetWord));
    currentAttempt++;
    inputField.value(""); // Clear input

    // Check for win condition
    if (guess === targetWord) {
      alert("You win!");
      resetGame();
    } else if (currentAttempt === maxAttempts) {
      alert("Game over! The word was: " + targetWord);
      resetGame();
    }
  }
}

function checkGuess(guess, target) {
  let result = [];
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === target[i]) {
      result.push({letter: guess[i], color: 'green'});
    } else if (target.includes(guess[i])) {
      result.push({letter: guess[i], color: 'yellow'});
    } else {
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
      let x = width / 2 - boardSize / 2 + j * cellSize;
      let y = height / 2 - boardSize / 2 + i * cellSize;
      
      // Draw cells based on guess results
      if (i < guesses.length) {
        fill(guesses[i][j].color);
        rect(x, y, cellSize, cellSize);
        fill(0);
        text(guesses[i][j].letter, x + cellSize / 2, y + cellSize / 2);
      } else {
        fill(255);
        rect(x, y, cellSize, cellSize);
      }
    }
  }
}

// Wordle Game with Grid Layout

let boardSize = 400;
let cellSize = boardSize / 5; // 5 columns for a 5-letter word
let listPage = 'start';
let startButton, optionButton1, optionButton2, inputField;
let targetWord = ""; // Target word for the game
let guesses = []; // Array to store guesses
let maxAttempts = 6; // Maximum number of attempts
let currentAttempt = 0; // Track the current attempt
let genzWordList = [];
let genaWordList = [];
let currentGuess = ""; 

function preload(){
  genzWordList = loadStrings("genZ");
  genaWordList = loadStrings("genA");
}

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
  if (category === "GenZ"){
    targetWord = random(genzWordList).toUpperCase();
  }
  else if (category === "GenA"){
    targetWord = random(genaWordList).toUpperCase();
  }

  console.log("Target word is:", targetWord); // Add this line
  // targetWord = category === "GenZ" ? "YEETS": "COOLY"; // Example words
  
  inputField.value("");
  inputField.show();
  optionButton1.hide();
  optionButton2.hide();
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
    } 
    else if (currentAttempt === maxAttempts) {
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
      
      fill(255);
      rect(x, y, cellSize, cellSize);
      
      if (i < guesses.length && guesses[i][j]) {
        fill(guesses[i][j].color);
        text(guesses[i][j].letter, x + cellSize / 2, y + cellSize / 2);
      } 
      else if (i === currentAttempt && j < currentGuess.length) {
        fill(0);
        text(currentGuess[j], x + cellSize / 2, y + cellSize / 2);
      }
    }
  }
}

function keyPressed() {
  if (listPage === 'game') {
    // Only process input if in game mode
    if (key >= 'A' && key <= 'Z' && currentGuess.length < targetWord.length) {
      // Append the key to the current guess if it's a letter
      currentGuess += key.toUpperCase();
    } else if (keyCode === BACKSPACE && currentGuess.length > 0) {
      // Remove the last letter on Backspace
      currentGuess = currentGuess.slice(0, -1);
    } else if (keyCode === ENTER && currentGuess.length === targetWord.length) {
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
      alert("You win!");
      resetGame();
    } else if (currentAttempt === maxAttempts) {
      alert("Game over! The word was: " + targetWord);
      resetGame();
    }
  }
}
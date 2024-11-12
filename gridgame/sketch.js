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
let normalWordList = [];
let currentGuess = ""; 
let openPageImage;
let fonts;

function preload(){
  //word lists
  genzWordList = loadStrings("genZ");
  genaWordList = loadStrings("genA");
  normalWordList = loadStrings("normal");

  //background list
  openPageImage = loadImage("plainWordleBackground.jpg");

  //font
  fonts = loadFont('PinkChicken-Regular.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // scaleImageToCanvas();


  //BUTTONS
  startButton = createButton('Start');
  startButton.class('startButton');
  startButton.mouseClicked(optionPage);
  startButton.position(width / 2 - 90, height / 2 + 100);

  optionButton1 = createButton('Gen Z Slang');
  optionButton1.class('optionButton1');
  optionButton1.mouseClicked(() => startGame("GenZ"));
  optionButton1.position(width / 2 - 140, height / 2 + 40);

  optionButton2 = createButton('Gen A Slang');
  optionButton2.class('optionButton2');
  optionButton2.position(width / 2 - 140, height / 2 + 170);
  optionButton2.mouseClicked(() => startGame("GenA"));

  optionButton3 = createButton('normal');
  optionButton3.class('optionButton3');
  optionButton3.position(width / 2 -140, height / 2 + 100);
  optionButton3.mouseClicked(() => startGame("normal"));
}

function draw() {
  background(255);
  displayPage();
}

function displayPage() {
  if (listPage === 'start') {
    background(255);

    // scaleImageToCanvas();
    image(openPageImage, 0, 0, openPageImage.width, openPageImage.height);

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
    showEndMessage( " Tou Lose! The word was:" + targetWord);
    
  }
}

// function scaleImageToCanvas() {
//   // Calculate aspect ratio for scaling
//   let imgAspect = openPageImage.width / openPageImage.height;
//   let canvasAspect = width / height;

//   let imgWidth, imgHeight;

//   if (canvasAspect > imgAspect) {
//     // Canvas is wider than the image, scale by height
//     imgHeight = height;
//     imgWidth = imgHeight * imgAspect;
//   } else {
//     // Canvas is taller than the image, scale by width
//     imgWidth = width;
//     imgHeight = imgWidth / imgAspect;
//   }

//   // Center the image on the canvas
// }


function showStartPage() {
  
  startButton.show();
  optionButton1.hide();
  optionButton2.hide();
  optionButton3.hide();
}

function showOptionPage() {
  textSize(70);
  textAlign(CENTER, CENTER);
  textFont(fonts);
  fill(0);
  text('C H O O S E    Y O U R   O P T I O N', width / 2, height / 2 - 100);
  
  startButton.hide();
  optionButton1.show();
  optionButton2.show();
  optionButton3.show();
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
  else if (category ==="normal"){
    targetWord = random(normalWordList).toUpperCase();
  }
  
  console.log("Target word is:", targetWord); // Add this line
  // targetWord = category === "GenZ" ? "YEETS": "COOLY"; // Example words
  
  
  optionButton1.hide();
  optionButton2.hide();
  optionButton3.hide();
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
    } 
    else if (currentAttempt === maxAttempts) {
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

function drawGrid() {
  let padding = 10;
  textSize(32);
  textAlign(CENTER, CENTER);
  for (let i = 0; i < maxAttempts; i++) {
    for (let j = 0; j < targetWord.length; j++) {
      let x = width / 1.85 - boardSize / 1.5 + j * (cellSize + padding);
      let y = height / 2 - boardSize / 1.5 + i * (cellSize + padding);
      
      // Determine color based on guess
      if (i < guesses.length && guesses[i][j]) {
        fill(guesses[i][j].color); // Fill with the color based on result
      }
      else {
        fill(255); // Default color for empty cells
      }
      
      // Draw the cell with the appropriate color
      rect(x, y, cellSize, cellSize);
      
      // Draw the letter in the cell if it exists
      if (i < guesses.length && guesses[i][j]) {
        fill(0); // Set text color to black for visibility
        text(guesses[i][j].letter, x + cellSize / 2, y + cellSize / 2);
      } 
      else if (i === currentAttempt && j < currentGuess.length) {
        fill(0); // Set text color to black for the current guess
        text(currentGuess[j], x + cellSize / 2, y + cellSize / 2);
      }
    }
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
function resetGame() {
  guesses = [];
  currentAttempt = 0;
  listPage = 'optionPage';
}
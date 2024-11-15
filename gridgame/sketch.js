// Wordle Game 
//Navya Sauhta
//28 Oct 2024
//
//extra : integrated the code with style css


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

  //background 
  openPageImage = loadImage("plainWordleBackground.jpg");

  //font
  fonts = loadFont('PinkChicken-Regular.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //BUTTONS
  startButton = createButton('Start');
  startButton.class('startButton');
  startButton.mouseClicked(optionPage);
  startButton.position(width / 2 - 150, height / 2 - 50);

  optionButton1 = createButton('Gen Z Slang');
  optionButton1.class('optionButton1');
  optionButton1.mouseClicked(() => startGame("GenZ"));
  optionButton1.position(width / 2 - 140, height / 2 + 40);

  optionButton2 = createButton('Gen A Slang');
  optionButton2.class('optionButton2');
  optionButton2.position(width / 2 - 140, height / 2 + 170);
  optionButton2.mouseClicked(() => startGame("GenA"));

  optionButton3 = createButton('Normal');
  optionButton3.class('optionButton3');
  optionButton3.position(width / 2 -140, height / 2 + 105);
  optionButton3.mouseClicked(() => startGame("normal"));
}

function draw() {
  background(255);
  displayPage();
}

function displayPage() {
  if (listPage === 'start') {
    background(255);
    scaleImageToCanvas(openPageImage);
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
    showEndMessage( " You Lose! The word was : " + targetWord);
    
  }
}

function scaleImageToCanvas(img) {
  let imgAspect = img.width / img.height;
  let canvasAspect = width / height;

  let imgWidth, imgHeight;

  if (canvasAspect > imgAspect) {
    imgHeight = height;
    imgWidth = imgHeight * imgAspect;
  }
  else {
    imgWidth = width;
    imgHeight = imgWidth / imgAspect;
  }

  let offsetX = (width - imgWidth) / 2;
  let offsetY = (height - imgHeight) / 2;

  image(img, offsetX, offsetY, imgWidth, imgHeight);
}

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
  
  // Assign targetword 
  if (category === "GenZ"){
    targetWord = random(genzWordList).toUpperCase();
  }
  else if (category === "GenA"){
    targetWord = random(genaWordList).toUpperCase();
  }
  else if (category ==="normal"){
    targetWord = random(normalWordList).toUpperCase();
  }
  
  console.log("Target word is:", targetWord);
  // targetWord = category === "GenZ" ? "YEETS": "COOLY"; 
  
  
  optionButton1.hide();
  optionButton2.hide();
  optionButton3.hide();
}

function keyPressed() {
  if ((listPage === 'win' || listPage === 'lose') && key === ' '){
    resetGame();
  }
  else if  (listPage === 'game') {
    // only process if in game mode
    if (keyCode >= 65 && keyCode <= 90 && currentGuess.length < targetWord.length) {
      // add the letter
      currentGuess += key.toUpperCase();
    } 
    else if (keyCode === BACKSPACE && currentGuess.length > 0) {
      // remove the last letter on Backspace
      currentGuess = currentGuess.slice(0, -1);
    } 
    else if (keyCode === ENTER && currentGuess.length === targetWord.length) {
      // handle guess on Enter key
      handleGuess();
    }
  }
}

function handleGuess() {
  // right length guesser
  if (currentGuess.length === targetWord.length) {
    guesses.push(checkGuess(currentGuess, targetWord));
    currentAttempt++;
    currentGuess = ""; // reset guess
    
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
      result.push({letter: guess[i], color: 'green'});//right letter, right place
    } 
    else if (target.includes(guess[i])) {
      result.push({letter: guess[i], color: 'yellow'});//right letter
    } 
    else {
      result.push({letter: guess[i], color: 'gray'});//nothing right
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
      
      // assign color 
      if (i < guesses.length && guesses[i][j]) {
        fill(guesses[i][j].color); 
      }
      else {
        fill(255); // default color 
      }
      
      rect(x, y, cellSize, cellSize);
      
      // draw the letter 
      if (i < guesses.length && guesses[i][j]) {
        fill(0); // set text color to black 
        text(guesses[i][j].letter, x + cellSize / 2, y + cellSize / 2);
      } 
      else if (i === currentAttempt && j < currentGuess.length) {
        fill(0); // set text color to black for the  guess
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
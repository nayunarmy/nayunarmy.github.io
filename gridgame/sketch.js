// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let boardSize = 400;
let cellSize = boardSize / 7;
let listPage = 'start';
let startButton;

function setup() {
  createCanvas(windowWidth, windowHeight);

  //making buttons
  startButton = createButton('start');
  startButton.position(width / 2 - 50, height / 2);
  startButton.mouseClicked(optionPage);

  optionButton1 = createButton('gen-z slang');
  optionButton1.position(width / 2 - 50, height / 2);
  optionButton1.mousePressed(genzWordle);

  optionButton2 = createButton('gen-a slang');
  optionButton2.position(width / 2 - 50, height / 1.8 );
  optionButton2.mousePressed(genaWordle);
}

function draw() {
  background(220);
  whichPage();
}

function whichPage(){
  if (listPage === 'start'){
    //opening page
    textSize(70);
    fill(60);
    textAlign(CENTER, CENTER);
    text('Welcome to wordle ', width / 2, height / 2 - 50);
    optionButton1.hide();
    optionButton2.hide();
    startButton.show();
  }
  else if ( listPage === 'genzWorld'){
    genzWordle();
    optionButton1.hide();
    optionButton2.hide();
    startButton.hide();
  }
  else if ( listPage === 'genaWordle'){
    genaWordle();
    optionButton1.hide();
    optionButton2.hide();
    startButton.hide();
  }
  else if ( listPage === 'optionPage'){
    optionPage();
    optionButton1.show();
    optionButton2.show();
    startButton.hide();
  }
}

function optionPage(){
  listPage = 'optionPage';
  //opening page
  textSize(50);
  fill(0);
  textAlign(CENTER, CENTER);
  text('Choose your option', width / 2, height / 2 - 50);

}

function genaWordle(){
  listPage = 'genaWordle';
  fill(255);
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 7; j++) {
      rect(i * cellSize, j * cellSize, cellSize, cellSize);
    }
  }
}

function genzWordle(){
  listPage = 'genzWorld';
  fill(255);
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 7; j++) {
      rect(i * cellSize, j * cellSize, cellSize, cellSize);
    }
  }

}




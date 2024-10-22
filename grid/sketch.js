// grid demo
// navya sauhta
// oct 22, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//if hardcoading a grid use this
// let grid = [[1, 0, 1, 0],
//             [0, 0, 1, 1],
//             [1, 1, 1, 0],
//             [0, 1, 1, 0]]; 
let grid ;
const GRID_SIZE = 100;
let cellSize;

function setup() {
  if (windowWidth < windowHeight){
    createCanvas(windowWidth, windowWidth);
  }
  else{
    createCanvas(windowHeight, windowHeight);
  }
  cellSize =height/GRID_SIZE;
  grid = generateRandpmGrid(GRID_SIZE,GRID_SIZE);
}

function draw() {
  background(220);
  displayGrid();
}
function keyPressed(){
  if ( key === "r"){
    grid = generateRandpmGrid(GRID_SIZE,GRID_SIZE);
  }
  if (key === "e"){
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
}

function generateEmptyGrid(cols, rows){
  let newGrid = [];
  for ( let y = 0; y < rows; y++){
    newGrid.push([]);
    for(let x = 0; x < cols; x++){
      newGrid[y].push(0);
    }
  }
  return newGrid;
}

function generateRandpmGrid(cols, rows){
  let newGrid = [];
  for ( let y = 0; y < rows; y++){
    newGrid.push([]);
    for(let x = 0; x < cols; x++){
      if (random(100) < 50){
        newGrid[y].push(1);
      }
      else{
        newGrid[y].push(0);
      }
    }
  }
  return newGrid;
}

function displayGrid(){
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++){
      if(grid[y][x] === 1){
        fill("purple");
      }
      else if (grid[y][x]=== 0){
        fill("white");
      }
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

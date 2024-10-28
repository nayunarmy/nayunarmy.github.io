// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const CELL_SIZE = 25;
let grid;
let rows;
let cols;


function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = Math.floor(width / CELL_SIZE);
  rows = Math.floor(height / CELL_SIZE);
  grid = generaterandomgrid(cols, rows);
}

function generaterandomgrid(cols, rows){
  let newgrid = [];
  for ( let y = 0; y < rows; y++){
    newgrid.push([]);
    for ( let x = 0; x < cols; x++){
      //toss 1 or 0 randomly
      if( random(100) < 50){
        newgrid[y].push(0);
      }
      else{
        newgrid[y].push(1);      
      }
    }
  }
  return newgrid;
}


function draw() {
  background(220);
  displayGrid();
}

function displayGrid(){
  for( let y = 0; y < rows; y++){
    for ( let x = 0; x < cols; x++){
      if(grid[y][x] === 1){
        fill("black");      
      }
      else{
        grid[y][x] ==== 0 
      }

    }
  }
}

// simple shopping list
// Navya Sauhta
// 21 oct 2024
//
// Extra for Experts:
// - use of buttons function in p5js



function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Create input fields for item name, quantity, and price
  inputName = createInput();
  inputName.position(20, 40);
  inputName.attribute('placeholder', 'Item Name');
  
  inputQuantity = createInput();
  inputQuantity.position(150, 40);
  inputQuantity.attribute('placeholder', 'Quantity');
  
  inputPrice = createInput();
  inputPrice.position(280, 40);
  inputPrice.attribute('placeholder', 'Price');
  

}

function draw() {
  background(220);
  displayShoppingList();
}

// Function to display the shopping list
function displayShoppingList() {
  textSize(16);
  fill(0);
  text("Shopping List:", 20, 100);
}



  

  
  

  



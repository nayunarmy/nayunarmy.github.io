// simple shopping list
// Navya Sauhta
// 21 oct 2024
//
// Extra for Experts:
// - use of buttons function in p5js

let shoppingList = [];
let inputName, inputQuantity, inputPrice, addButton;

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


  // creating an add mouseButton
  addButton = createButton('Add Item');
  addButton.position(420, 40);
  addButton.mousePressed(chukLastItem);



}

function draw() {
  background(220);
  displayShoppingList();
}

function chukLastItem(){
  let name = inputName.value();
  let quantity = inputQuantity.value();
  let price = inputPrice.value();

  if (name && quantity && price){
    let item = {
      name: name,
      guantity: quantity,
      price: price,
    };
    shoppingList.push(item);
    console.log('${name} added to the list.');
    inputName.value('');
    inputName.value('');
    inputName.value('');
  }
  else{
    console.log("Please fill out all the feilds!");
  }
}

// Function to display the shopping list
function displayShoppingList() {
  textSize(16);
  fill(0);
  text("Shopping List:", 20, 100);
}



  

  
  

  



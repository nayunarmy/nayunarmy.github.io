// simple shopping list
// Navya Sauhta
// 21 oct 2024
//
// Extra for Experts:
// - use of buttons function in p5js

let shoppingList = [];
let inputName, inputQuantity, inputPrice, addButton;
let listPage = 'start';

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // input fields 
  inputName = createInput();
  inputName.position(20, 40);
  inputName.attribute('placeholder', 'Item Name');
  
  inputQuantity = createInput();
  inputQuantity.position(150, 40);
  inputQuantity.attribute('placeholder', 'Quantity');
  
  inputPrice = createInput();
  inputPrice.position(280, 40);
  inputPrice.attribute('placeholder', 'Price');


  // add button
  addButton = createButton('Add Item');
  addButton.position(420, 40);
  addButton.mousePressed(addItem);

  // remove button
  removeButton = createButton('remove last item');
  removeButton.position(500, 40);
  removeButton.mousePressed(chuckLastItem);

  // start button
  startButton = createButton('Start Shopping list');
  startButton.position(width / 2 - 80, height / 2);
  startButton.mousePressed(startShoppinglist)

}

function draw() {
  background(220);
  displayShoppingList();
}


function startShoppingList(){
  listPage = 'shoppingList';


  //hiding the other button
  startButton.hide();
}

function chuckLastItem(){
  if (shoppingList.length > 0){
    let removeItem = shoppingList.pop();
    console.log(`${removeItem.name} removed from the list`);
  }
  else{
    console.log("The shopping list is empty.");
  }
}

function addItem(){
  let name = inputName.value();
  let quantity = inputQuantity.value();
  let price = inputPrice.value();

  if (name && quantity && price){
    let item = {
      name: name,
      quantity: quantity,
      price: price,
    };
    shoppingList.push(item);
    console.log(`${name} added to the list.`);
    inputName.value('');
    inputQuantity.value('');
    inputPrice.value('');
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

  //loop for adding it on the display list
  for(let i = 0; i < shoppingList.length; i++){
    let item = shoppingList[i];
    text(`${i + 1}. ${item.name} - Quantity: ${item.quantity}, Price: $${item.price}` , 20, 130 + i * 30);
  }
}



  

  
  

  



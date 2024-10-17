// simple shopping list
// Navya Sauhta
// 21 oct 2024
//
// Extra for Experts:
// - use of buttons function in p5js

let shoppingList = [];
let inputName, inputQuantity, inputPrice, addButton;
let listPage = 'start';
let startButton;

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



  // start button
  startButton = createButton('Start Shopping list');
  startButton.position(width / 2 - 80, height / 2);
  startButton.mousePressed(startShoppingList);

  // add button
  addButton = createButton('Add Item');
  addButton.position(420, 40);
  addButton.mousePressed(addItem);

  // remove button
  removeButton = createButton('remove last item');
  removeButton.position(500, 40);
  removeButton.mousePressed(chuckLastItem);
}

function draw() {
  background(220);
  whichPage();
}


function whichPage(){
  if (listPage === 'start'){
    // opening page
    textSize(32);
    fill(0);
    textAlign(CENTER, CENTER);
    text('Welcome to the shopping list', width / 2, height / 2 - 50);

    //hiding other buttons
    startButton.show();
    inputName.hide();
    inputQuantity.hide();
    inputPrice.hide();
    addButton.hide();
    removeButton.hide();
  }

  else if (listPage === 'shoppingList'){
    //the actual list page
    displayShoppingList();
  }
}

function startShoppingList(){
  listPage = 'shoppingList';


  //hiding the start button
  startButton.hide();
  inputName.show();
  inputQuantity.show();
  inputPrice.show();
  addButton.show();
  removeButton.show();
}

function addItem(){
  //name change
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
    console.log(`${name} added to the list.`);  //coder's message
    inputName.value('');
    inputQuantity.value('');
    inputPrice.value('');
  }
  else{
    console.log("Please fill out all the feilds!");  //coder's message
  }
}

function chuckLastItem(){
  if (shoppingList.length > 0){
    let removeItem = shoppingList.pop();
    console.log(`${removeItem.name} removed from the list`);  //coder's message
  }
  else{
    console.log("The shopping list is empty.");  //coder's message
  }
}

function displayShoppingList() {
  textSize(20);
  fill(0);
  text("Shopping List:", 85, 100);

  //loop for adding stuff to the list
  for(let i = 0; i < shoppingList.length; i++){
    let item = shoppingList[i];
    text(`${i + 1}. ${item.name} - Quantity: ${item.quantity}, Price: $${item.price}` , 20, 130 + i * 30);
  }
}



  

  
  

  



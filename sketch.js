var happyDogImage, dogImage, database, foodS, dog
var fedTime,lastFed
var feed,addFood
var milk
function preload(){
	happyDogImage = loadImage("happydog.png");
  dogImage = loadImage("Dog.png");
}

function setup() {
	createCanvas(1000, 400);
 
  dog = createSprite(700,200,50,50)
  dog.addImage(dogImage)
  dog.scale=0.2;

  milk = new Food();

  feed=createButton("Feed");
  feed.position(750,100);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,100);
  addFood.mousePressed(addMilk);

  database = firebase.database();
  foodStock = database.ref('food')
  foodStock.on("value",readStock)
  
}


function draw() {  
  background(45,205,200)
  
  milk.display();
  
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  fill(255,255,254);
  textSize(25);
  if(lastFed>=12){
    stroke(0)
    strokeWeight(4)
    fill(100,200,30);
    text("Last Feed : "+ lastFed%12 + " PM", 400,30);
   }else if(lastFed==0){
    stroke(0)
    strokeWeight(4)
    fill(100,200,30)
    text("Last Feed : 12 AM",400,30);
   }else{
    stroke(0)
    strokeWeight(4)
    fill(100,200,30);
    text("Last Feed : "+ lastFed + " AM", 350,30);
   }
   drawSprites();
}

function readStock(data){
  foodS=data.val();
  milk.updateFoodStock(foodS);
}

function feedDog(){
  
  dog.addImage(happyDogImage);
  foodS--
  database.ref('/').update({
    food:foodS,
    FeedTime:hour()
    
  })
}

function addMilk(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}

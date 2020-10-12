var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,background;

function preload(){
  
  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
  backgroundImage=loadImage("jungle.jpg")
 
}



function setup() {
createCanvas(400, 400);
  
  background1=createSprite(0,0,400,400)
  
background1.addImage("jungle",backgroundImage) 
  
  
  
  var survivalTime=0;
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
   monkey.addImage(bananaImage)
   monkey.scale=0.1
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)
  ground.visible=false

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  
 
  
}


function draw() {
  background("lightblue");
  
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
     if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
  if(FoodGroup.isTouching(monkey)){
  survivalTime=survivalTime+2;
    FoodGroup.destroyEach();
  }
  
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
 
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 400,50);        
  

 if(obstaclesGroup.isTouching(monkey)){
   monkey.scale=0.2
   ground.velocityX = 0;
  monkey.velocityY = 0;
     obstaclesGroup.setVelocityXEach(0);
       FoodGroup.setVelocityXEach(0);
      obstaclesGroup.setLifetimeEach(-1);
FoodGroup.setLifetimeEach(-1);

    }
  
  switch(score){
    case 10:monkey.scale=0.12;
      break;
       case 20:monkey.scale=0.14;
      break;
       case 30:monkey.scale=0.16;
      break;
   case 40:monkey.scale=0.18;
    default: break;
  }
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);
}



function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
     banana.addImage(bananaImage);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
      banana.scale=0.05;
  
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
 
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}

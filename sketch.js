
var monkey , monkey_running,ground;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(600,400);
  
  monkey = createSprite(100,300,40,60);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.15;
  
  ground = createSprite(300,350,1300,10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;

  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  survivalTime = 0;
  score = 0;
}


function draw() {
  background(255);
  
  textSize(12);
  fill("blue");
  text("Score: "+score,500,80);
  
  score = score + Math.round(getFrameRate()/60);
  
  textSize(20);
  fill("blue");
  text("Survival Time: "+survivalTime,200,80);
  
  survivalTime = Math.round(frameCount/getFrameRate());
  
   if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  if(keyDown("space") && monkey.y > 298){
    
   monkey.velocityY = -13; 
  }
  
  monkey.velocityY = monkey.velocityY + 0.5;
  
  monkey.collide(ground);
  
  food();
  
  obstacles();
  
   if(obstacleGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
    
    
    }
  
  drawSprites();
}

function food(){
  
 if(frameCount % 60 === 0){
   
   banana = createSprite(600,100,60,20);
   banana.y = Math.round(random(100,180));
   banana.addImage(bananaImage);
   banana.velocityX = -4;
   banana.lifeTime = 125;
   banana.scale = 0.1;
   FoodGroup.add(banana);
 }
  
}

function obstacles(){
  
 if(frameCount % 120 === 0){
   
   console.log("inside obstacle if")
   obstacle = createSprite(600,310,60,20);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -4;
   obstacle.lifeTime = 125;
   obstacle.scale = 0.2;
   obstacleGroup.add(obstacle);
 }
  
}







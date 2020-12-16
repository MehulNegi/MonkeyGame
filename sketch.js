var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var survivalTime;

function preload(){
   
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(500,400);
  monkey = createSprite(100,300,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.09;
  
  ground = createSprite(100,335,500,10);
  ground.x = ground.width /2;
  
  score = 0;
  survivalTime = 0;
  
  obstaclesGroup = new Group();
  bananaGroup = new Group();
}

function draw() {
  background("white");  
  
  stroke("Black");
  textSize(20);
  fill("Black");
  text("Score: "+ score,60,380);
  
  stroke("Black");
  textSize(20);
  fill("black");
  survivalTime= Math.round(frameCount/60);
  text("Survival Time: "+survivalTime,180,50);

  //jump when the space key is pressed
  if(keyDown("space") && monkey.y >=100) {
     monkey.velocityY = -12;
    }
  
  //creating infinite ground
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  //add gravity
  monkey.velocityY = monkey.velocityY+0.8;
  
  //stop monkey from falling down  
  monkey.collide(ground);
  
  if (monkey.isTouching(obstaclesGroup)){
     //giving ground velocity 
     ground.velocityX = 0;
     
     //giving monkey velocity
     monkey.velocityY = 0;
     
     //giving lifetime
     obstaclesGroup.setLifetimeEach(-1);
     bananaGroup.setLifetimeEach(-1);
     
     //giving obstacle and clouds velocity
     obstaclesGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
  }
  
  Banana();
  Obstacle();
  
  console.log(frameCount);
  
drawSprites();
}

function Banana(){
  if (frameCount % 80 === 0) {
    banana = createSprite(480,30,10,10);
    banana.scale = 0.07;
    banana.addImage(bananaImage);
    banana.velocityX = -6;
    banana.y = Math.round(random(100,250));
    banana.setLifetime = 5;
    
    //add each obstacle to the group
    bananaGroup.add(banana);    
  }
}

function Obstacle(){
 if (frameCount % 300 === 0){
   obstacle = createSprite(480,300,10,40);
   obstacle.scale = 0.19;
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -6;            
   obstacle.lifetime = 85;
   
   //add each obstacle to the group
   obstaclesGroup.add(obstacle);
 }
}
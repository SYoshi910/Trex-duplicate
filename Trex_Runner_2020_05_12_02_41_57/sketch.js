var trex, trex_collided, trexImg;
var groundImg, ground, invisibleGround;
var cloud, cloudImg;
var obstacle, obstacle1, obstacle2, obstacle3, obstacle4, obstalce5, obstacle6;
var score;
var PLAY, END;
var gameOver, restart, gameOverImg, restartImg;
function preload(){
  trexImg = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  groundImg = loadImage("ground2.png");
  cloudImg = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}  
function setup() {
  createCanvas(1160, 400);
  trex = createSprite(100,375,10,10);
  trex.addAnimation("trex", trexImg);
  trex.addAnimation("Trex", trex_collided);
  trex.scale = 0.5;
  ground = createSprite(200,390,400,10);
  ground.addImage("ground", groundImg);
  ground.velocityX = -3;
  invisibleGround = createSprite(200,398,400,10);
  invisibleGround.visible = false;
  gameOver = createSprite(580,170,10,10);
  gameOver.addImage("gameOver", gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  restart = createSprite(580,200,200,200);
  restart.addImage("restart", restartImg);
  restart.scale = 0.5;
  restart.visible = false;
  score = 0;
  END = 0
  PLAY = 1
  gameState = PLAY;
  clouds = new Group();
  obstacles = new Group();
}

function draw() {
  background(255);
  if(gameState == PLAY){
    if(ground.x < 0){
      ground.x = ground.width/2;
    }  
    if(keyDown("space") && trex.isTouching(ground)){
       trex.velocityY = -9.5;
    }
    if(obstacles.isTouching(trex)){
      gameState = END;
    }
    trex.velocityY += 0.36;
    score += Math.round(getFrameRate()/60);
    console.log(score);
    spawnClouds();
    spawnObstacles();
    
  }
  else if(gameState == END){
    gameOver.visible = true;
    restart.visible = true;
    trex.changeAnimation("Trex",trex_collided);
    trex.velocityY = 0;
    obstacles.setVelocityEach(0,0);
    clouds.setVelocityEach(0,0);
    ground.velocityX = 0;
    clouds.setLifetimeEach(-1);
    obstacles.setLifetimeEach(-1);
    if(mousePressedOver(restart)){
      score = 0;
      ground.velocityX = -3;
      trex.changeAnimation("trex",trexImg);
      obstacles.destroyEach();
      clouds.destroyEach();
      restart.visible = false;
      gameOver.visible = false;
      gameState = true;
    }
  }
  trex.collide(invisibleGround);
  text("Score: " + score, 1090,20);
  drawSprites();
  trex.debug = true;
}
function spawnClouds() {
  if(frameCount % 60 == 0){
    cloud = createSprite(1180,100,10,10);
    clouds.add(cloud);
    cloud.addImage(cloudImg);
    cloud.y = Math.round(random(10,150));
    cloud.velocityX = Math.round(random(-1,-3));
    cloud.scale = random(0.4,1);
    cloud.lifetime = 1200;
  }
}
function spawnObstacles(){
  if(frameCount%100 == 0){
    obstacle = createSprite(1180,377,10,10);
    obstacles.add(obstacle);
    obstacle.velocityX = -3;
    obstacle.lifetime = 450;
    obstacle.scale = 0.5;
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(obstacle1);
        break;
      case 2: obstacle.addImage(obstacle2);
        break
      case 3: obstacle.addImage(obstacle3);
        break;
      case 4: obstacle.addImage(obstacle4);
        break;
      case 5: obstacle.addImage(obstacle5);
        break;
      case 6: obstacle.addImage(obstacle6);
        break;
      default: break;
    }
  }
}
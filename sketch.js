var tower, towerImage;
var ghost, ghostImage;
var gameState="play";
var door,doorImage,doorGroup;
var climber, climberImage, climberGroup;
var invisibleBlock,invisibleGroup;


function preload (){
  towerImage=loadImage("tower.png")
  ghostImage=loadImage("ghost-standing.png")
   doorImage=loadImage("door.png")
   climberImage=loadImage("climber.png")
}

function setup(){
  createCanvas(600,600);
  
  tower=createSprite(300,300)
  tower.addImage(towerImage)
  tower.velocityY=1;
  
  ghost=createSprite(200,200,50,50)
  ghost.addImage(ghostImage)
  ghost.scale=0.3
  
  doorGroup=new Group();
    climberGroup=new Group();
    invisibleGroup=new Group();
  
}

function draw(){
  background("pink")
  
  if(gameState==="play"){
     
    if(keyDown("LEFT_ARROW")){
      ghost.x=ghost.x-3;
    }
    
    if(keyDown("RIGHT_ARROW")){
      ghost.x=ghost.x+3;
    }
    
    if(keyDown("space")){
      ghost.velocityY=-4;
      }
    
    ghost.velocityY=ghost.velocityY+0.3;
    
    if(tower.y>400){
      tower.y=300
    }
 
    spawndoor();
    if (climberGroup.isTouching(ghost)){
      ghost.velocityY=0;
      
    }
    
    if(invisibleGroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy();
      gameState="end";
    }
    
     drawSprites();
  }
 
  if (gameState==="end"){
    textSize(30);
    fill("red")
    text("GAMEOVER",230,250);
    
  }
 
}

function spawndoor(){
  if (frameCount%100===0){
    door=createSprite(200,-50)
    door.velocityY=1;
    door.addImage(doorImage);
    door.x=Math.round(random(100,450))
    door.lifetime=800;
    doorGroup.add(door);
    
    
    climber=createSprite(210,10)
   climber.velocityY=1;
    climber.x=door.x;
    climber.addImage(climberImage);
    climber.lifetime=800;
    climberGroup.add(climber)
    
    invisibleBlock=createSprite(250,15)
   invisibleBlock.velocityY=1;
     invisibleBlock.x=door.x;
     invisibleBlock.lifetime=800;
    invisibleGroup.add(invisibleBlock)
    
    invisibleBlock.visible=true;
    
    invisibleBlock.width=climber.width
    invisibleBlock.height=2;
    
    ghost.depth=door.depth;
    ghost.depth+=1;
    
    
    
  }
}


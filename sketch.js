const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var database ,position ;
var balloon ,balloonimg ,balloonimg1;

function preload(){
gamingbg = loadImage("backgroundBg.png");
balloonimg = loadImage("Hot-Air-Ballon-Image1.png");
balloonimg1 = loadImage("Hot-Air-Ballon-Image2.png");
}

function setup(){
    createCanvas(1530,720);
    engine = Engine.create();
    world = engine.world;
    ground = new Ground(650,727,1300,20)
    database = firebase.database();
    balloon = createSprite(300,450,90,900);
    balloon.addAnimation("Hot-Air-Ballon-Image1.png",balloonimg);
    var Balloonheight = database.ref('balloon/height');
    Balloonheight.on("value",readHeight,showError);
}

function draw(){
    background(gamingbg)
    Engine.update(engine);
 
    textSize(30);
    fill("white");
    stroke("black");
    strokeWeight(3)
    text("*** use the arrow keys to move the balloon",50,50)
   
    ground.display();
   
    if(keyDown(RIGHT_ARROW)){
        balloon.x = balloon.x+10
    }else if(keyDown(LEFT_ARROW)){
        balloon.x = balloon.x-10
    }else if(keyDown(UP_ARROW)){
        updateHeight(0,-10);
        balloon.addAnimation("Hot-Air-Ballon-Image2.png",balloonimg1);
        balloon.y = balloon.y-10
    }else if(keyDown(DOWN_ARROW)){
        balloon.y = balloon.y+10
    }
    drawSprites();
}

function updateHeight(x,y){
    database.ref('ballon/height').set({
        'x' : height.x + x ,
        'y' : height.y + y
    })
}

function readHeight(data){
    height = data.val();
    balloon.x = height.x;
    balloon.y = height.y;
    }

    function showError(){
        consolo.log("Error in writing to the database");
    }

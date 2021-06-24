var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var obstacle;
var obs;
var passedFinish; passedFinish=false;
var finishedPlayers;

var form, player, game;

var cars, car1, car2, car3, car4;
function preload(){
  c1=loadImage("images/car1.png");
  c2=loadImage("images/car2.png");
  c3=loadImage("images/car3.png");
  c4=loadImage("images/car4.png");
  ground=loadImage("images/ground.png");
  track=loadImage("images/track.jpg");
  f1=loadImage("images/f1.png");
  sound=loadSound("sound/sliding.mp3")
  gold=loadImage("images/gold.png");
  silver=loadImage("images/silver.png");
  bronze=loadImage("images/bronze.png");

}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
 if(finishedPlayers===4){
   game.update(2);
 }
 if(gameState===2&&finishedPlayers===4){
   game.displayRanks();
 }
}

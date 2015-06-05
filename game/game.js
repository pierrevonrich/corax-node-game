$(document).ready(function() {
 console.log("ready!");
 initGame();
});

function testCanvas(){
 console.log("testing canvas");
 var canvas = $("#playarea")[0];
 if (canvas.getContext){
  var ctx=canvas.getContext("2d");
  ctx.fillStyle="rgb(200,0,0)";
  ctx.fillRect(10,10,55,50);
  ctx.fillStyle="rgba(0,0,200,0.5)";
  ctx.fillRect(30,30,55,50);
  console.log("done something to canvas");
 }
}

//Initiate game objects
function Game() {

}
Game.Board = function(width,height){
 this width = width;
 this height = height;
}
Board.Cell = function(locX,locY){
 this locX = locX;
 this locY = locY;
}

Game.Clans = function(name,colour){
 this name = name;
 this colour = colour;
}
Game.Organism = function(name,Clans,hp,str,mov,age){
 this name = name;
 this Clans = Clans;
 this hp = hp;
 this str = str;
 this mov = mov;
 this age = age;
}
Game.Item = function(type,reward,block){
 this type = type;
 this reward = reward;
 this block = block
}



GameOrganism.move = function(){
 //Where am I
 if ()
 
}
GameOrganism.die = function(){
	

}
GameOrganism.eat = function(targetFood){
	

}
GameOrganism.split = function(){
	

}
function colisioncheck(Board,Organism) {


}

function fight(Organism1,Organism2) {


}

function myturn(Organism) {
 console.log("my turn " + Organism.Name);
 //Movement
 console.log("movement");
 Organism.move();

 //Collision


 //Fight Flight or Feed


 //Did I win?


 //Split


 //Age


}


function initGame() {
 console.log("initGame");
 var numClans = 2;
 var myGameBoard = GameBoard(50,50)
 
}
$(document).ready(function() {
 console.log("ready!");
 testCanvas();
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
function game(gridX,gridY,players){
 this gridX = gridX;
 this gridY = gridY;
 this players = players;
}


var game = new Object();
var gameGrid = new Object();
var gameOrganism = new Object();



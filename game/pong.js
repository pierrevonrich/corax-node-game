var animate =  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60) };



var canvas = document.createElement('canvas');
var width = 600;
var height = 400;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');
context.font = "28px Courier";
context.fillStyle = "#FFFFFF";

var player1;
var player2;
var ball;
var game;
var keysDown = {};

game = new Game();


window.onload = function() {
  document.body.appendChild(canvas);
  game.instructions();
  animate(game.step)
};

window.addEventListener("keydown", function(event) {
  keysDown[event.keyCode] = true;
});
window.addEventListener("keyup", function(event) {
  game.menu();
  delete keysDown[event.keyCode];
});



function Game(state){
  this.state = state;
  this.ai1 = false;
  this.ai2 = false;
  this.bounces = 0;
  this.wait = 0;



};

Game.prototype.reset = function() {
  delete ball;
  delete player1;
  delete player2;
  this.bounces = 0;
  this.state = false;
}
Game.prototype.start = function() {
  if (this.ai1==true){
    player1 = new Player('left','ai',0);
    player1.paddle.y_speed=3;
  } else {
    player1 = new Player('left','human',0);
  }
  if (this.ai2==true) {
    player2 = new Player('right','ai',0);
    player2.paddle.y_speed=-3;
  } else {
    player2 = new Player('right','human',0);
  }
  ball = new Ball(canvas.width/2, canvas.height/2);

  this.state = true;  
}
Game.prototype.demo = function() {
  this.reset();
  this.ai1=true;
  this.ai2=true;
  this.start();
}

Game.prototype.stop = function() {
  this.state = false;
}


Game.prototype.step = function() {
  game.wait+=1;
  if(game.state==true){
    update();
    render();
    game.score();
    game.wait=0;
  } else {
    if (game.wait>600){game.demo();}

  }

  animate(game.step);
};

Game.prototype.menu = function() {
  for(var key in keysDown) {
    switch(Number(key)) {
      case(49):
        if(this.ai1==true) {this.ai1=false} else {this.ai1=true};
        console.log('ai1:'+this.ai1);
        break;
      case(50):
        if(this.ai2==true) {this.ai2=false} else {this.ai2=true};
        console.log('ai2:'+this.ai2);
        break;
      case(73):
        this.reset();
        this.instructions();
        console.log('print instructions');
        break;
      case(32):
        if(this.state==true) {this.state=false} else {this.state=true};
        console.log('pause:'+this.state);
        break;
      case(82):
        console.log('reset');
        this.reset();
        this.start();  
        break;
    }
  }

}

Game.prototype.score = function() {
  if (player1.score>9){
    this.gameover('Player 1')
  }

  if (player2.score>9){
  	this.gameover('Player 2')
  }
}
Game.prototype.gameover = function(winner) {
  	console.log('Winner ' + winner);
    this.stop();
    context.fillStyle = "#000000";
    context.fillRect(0, 0, width, height);
    context.fillStyle = "#FFFFFF";
    context.fillText('Winner ' + winner, 80 , canvas.height/2); 

}
Game.prototype.instructions = function() {

    context.fillStyle = "#783080";
    context.fillRect(0, 0, width, height);
    context.fillStyle = "#FFFFFF"; 
    context.fillText('OpenPong', 20 , 30); 
    context.fillText('Space = Pause', 20 , 60); 
    context.fillText('R = Reset', 20 , 90); 
    context.fillText('W + S = Player 1', 20 , 120); 
    context.fillText('Up + Down = Player 2', 20 , 150); 
    context.fillText('1 = Toggle human AI player 1', 20 , 180); 
    context.fillText('2 = Toggle human AI player 2', 20 , 210); 

}


var update = function() {
};

var render = function() {
  context.fillStyle = "#783080";
  context.fillRect(0, 0, width, height);
};


function Paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.x_speed = 0;
  this.y_speed = 0;
  this.x_acl = 0;
  this.y_acl = 0;
}

Paddle.prototype.render = function() {
  context.fillStyle = "#F9FAE6";
  context.fillRect(this.x, this.y, this.width, this.height);
};

function Player(side,opptype,score) {
  if (side == 'left'){
    this.paddle = new Paddle(10, canvas.height/2 - 25, 10, 50);
  } else {if (side == 'right'){
    this.paddle = new Paddle(canvas.width-20, canvas.height/2 - 25, 10, 50);
  }}
  this.score = score;
  this.side = side;
  this.opptype = opptype;
}

Player.prototype.render = function() {
  this.paddle.render();
};


function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.x_speed = 3;
  this.y_speed = 0;
  this.radius = 5;
}

Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fillStyle = "#FFFFFF";
  context.fill();
};
Ball.prototype.reset = function(direction) {
  this.x = canvas.width / 2;
  this.y = canvas.height / 2;
  this.x_speed = direction;
  this.y_speed = 0;

}

var render = function() {
  context.fillStyle = "#493C78";
  context.fillRect(0, 0, width, height);
  player1.render();
  player2.render();
  ball.render();
  printscore();
};

 function printscore(){
  context.fillStyle = "#FFFFFF";
  var p1txt = player1.opptype + ' ' + player1.score;
  var p2txt = player2.opptype + ' ' + player2.score;
  var p2int = context.measureText(p2txt).width + 10;
  context.fillText(p1txt, 10, 30); 
  context.fillText(p2txt, canvas.width-p2int, 30); 
}

Ball.prototype.update = function() {
  this.x += this.x_speed;
  this.y += this.y_speed;
};

var update = function() {
  ball.update(player1.paddle, player2.paddle);
};

Ball.prototype.update = function(paddle1, paddle2) {
  this.x += this.x_speed;
  this.y += this.y_speed;
  var top_x = this.x - 5;
  var top_y = this.y - 5;
  var bottom_x = this.x + 5;
  var bottom_y = this.y + 5;

  if(this.y - 5 < 0) { // hitting the top wall
    this.y = 5;
    this.y_speed = -this.y_speed;
    game.bounces += 1;
  } else if(this.y + 5 > canvas.height) { // hitting the bottom wall
    this.y = canvas.height-5;
    this.y_speed = -this.y_speed;
    game.bounces += 1;
  }


  if(this.x > canvas.width) { // player 1 scored
    this.reset(-3);
    player1.score +=1
    console.log ('score:' + player1.score + ' ' + player2.score);
    console.log ('bounces:'+ game.bounces);
    game.bounces = 0;
  }
  if(this.x < 0 ) { // player 2 scored
    this.reset(3);
    player2.score += 1
    console.log ('score:' + player1.score + ' ' + player2.score);
    console.log ('bounces:'+ game.bounces);
    game.bounces = 0;
  }

  if (top_x < canvas.width/2) {
    if(top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x && 
       top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y) {
        // hit the player 1 paddle
        this.x_speed = 3;
        this.y_speed += (paddle1.y_speed / 2);
        this.x += this.x_speed;
        game.bounces += 1;
    }
  } else {  
    if(top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x && 
       top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y) {
       // hit the player 2 paddle
       this.x_speed = -3;
       this.y_speed += (paddle2.y_speed / 2);
       this.x += this.x_speed;
       game.bounces += 1;
    }
  }
};


var update = function() {
  player.update(ball);
  ball.update(player1.paddle, player2.paddle);
};


Paddle.prototype.move = function(x, y) {
  this.x += x + this.x_acl;
  this.y += y + this.y_acl;
  this.x_speed = x + this.x_acl;
  this.y_speed = y + this.y_acl;

  if(this.y < 0) { // all the way to the top
    this.y = 0;
    this.y_speed = 0;
    this.y_acl = 0;
  } else if (this.y + this.height > canvas.height) { // all the way to the bottom
    this.y = canvas.height - this.height;
    this.y_speed = 0;
    this.y_acl = 0;
  }
}

var update = function() {
  player1.update(ball);
  player2.update(ball);
  ball.update(player1.paddle, player2.paddle);
};


Player.prototype.update = function(ball) {
  if (this.opptype == 'ai') {
    this.updateai(ball);
  } else {
    if (this.side=='right') {
      for(var key in keysDown) {
        switch(Number(key)) {
          case(38):this.paddle.move(0, -4);break;
          case(40):this.paddle.move(0, 4);break;
          default:this.paddle.move(0, 0);break;
        }
      }
    } else {
      for(var key in keysDown) {
        switch(Number(key)) {
          case(87):this.paddle.move(0, -4);break;
          case(83):this.paddle.move(0, 4);break;
          default:this.paddle.move(0, 0);break;
        }
      }
    }
  }

}

Player.prototype.updateai = function(ball) {
  var i1 = getRandomInt(0,10+Math.floor(game.bounces/4))
  var i2 = getRandomInt(0+Math.floor(game.bounces/12),2+Math.floor(game.bounces/4))
  //console.log ('random:'+i1+' '+i2)
  //track ball position
  var y_pos = ball.y;
  //Track centre of canvas if ball moving away
  if ((this.side=='right' && ball.x_speed<0)||(this.side=='left' && ball.x_speed >0)){
    y_pos = canvas.height/2;
  }
  var diff = -((this.paddle.y + (this.paddle.height / 2)) - y_pos);
  if(diff < 0 && diff < -4) { // max speed down
    diff = -4 - i2;
  } else if(diff > 0 && diff > 4) { // max speed up
    diff = 4 + i2;
  }
 
  if ((this.paddle.y > y_pos - (this.paddle.height/2)) || ((this.paddle.y + this.paddle.height ) < y_pos + (this.paddle.height/2))){
    //if ((this.side=='right' && ball.x_speed>0) || (this.side=='left' && ball.x_speed <0)) {
      this.paddle.move(0, diff);
   // }
  }  
}



function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


let group = [];
let bugSprite;
let deadBugs = 0;
let timer = 30; 
let speed = 2; 
let spawned = false;
let gameStart = false; 
let gameOver = false;
let openingSong = false;
let gameOversong = 0;
let mel = ["C3","E3","D3","F3","E3","G3"];


function setup() {
  createCanvas(1000, 600);
  Tone.Transport.start();
  Tone.Transport.bpm.value = 100;
}

function spawnBug(){
  for (let i = 0; i < 30; i++) {
    let bugSprite = new CharObj();
    group.push(bugSprite);
  }
  seq1.start();
}

let square = new Tone.Synth({
  oscillator: {
    type: "square"
  }
}).toDestination();

let seq1 = new Tone.Sequence (function (time, note){
  square.triggerAttackRelease(note, 0.5);
  square.volume.value = -5;
}, mel, '4n');

let sfx = new Tone.Players({
  1 : "assets/515618__mrickey13__splatsquish-1.wav", //hit
  2 : "assets/9509__petenice__whoosh.wav", //miss
  3 : "assets/397353__plasterbrain__tada-fanfare-g.flac", //finish
  4 : "assets/513456__pomeroyjoshua__anu-crash-03.wav" //begin

}).toDestination();

function draw() {

Tone.start();
background(220);



if(!gameStart){
  titleScreen();

}

else if(gameOver){
  gameEnd();
}

else{
  playing();

  if(!spawned){
    spawnBug();
    spawned = true;
   }

  for(i = 0; i < group.length; i++){
    if(!group[i].dead){
      if (group[i].direction==="right" && group[i].dead == false){group[i].walkRight();}
      else if (group[i].direction==="left" && group[i].dead == false){group[i].walkLeft();}
      else if (group[i].direction==="up" && group[i].dead == false){group[i].walkUp();}
      else if (group[i].direction==="down" && group[i].dead == false){group[i].walkDown();}
      else {group[i].stopped();}

      group[i].updatePos();
    }
  }
}

}

function mousePressed(){
  for(i = 0; i < group.length; i++){
    if(group[i].contains(mouseX,mouseY) && group[i].dead == false){
      deadBugs++;
      speed = speed + 0.5;
      Tone.Transport.bpm.value += 5;
      group[i].dead = true; 
      group[i].stopped();
      sfx.player('1').start();
      
    }
    if(!group[i].contains(mouseX,mouseY) && !group[i].dead == false && !gameOver){
      sfx.player('2').start();
    }
  }

  if (!gameStart) {
    sfx.player('4').start();
    gameStart = true;
   
  }
}


function playing(){
 
  textSize(16);
  textAlign(CENTER);
  text("Kills: " + deadBugs, 35, 20)
  text("Time: " + ceil(timer), width-35, 20);
  timer -= deltaTime /1000;

  if (timer < 0){
    seq1.stop();
    gameOver = true;
  }
}

function gameEnd(){
  console.log("Game ended");
  textSize(25);
  textAlign(CENTER);
  fill('red');
  text("Game over, man, game over!", width/2, height/2);
  text("Bugs exterminated: " + deadBugs, width/2, height/2+50);

  for (let i = 0; i < group.length; i++) {
    group[i].dead = true;
    group[i].sprite.remove();
  }

  if (gameOversong == 0){
    setTimeout(() => {
      sfx.player('3').start();
      }, 250); 
    gameOversong++;
  }
}

function titleScreen() {
  textSize(32);
  textAlign(CENTER);
  fill(0);
  text("Bug Squish", width/2, height/2);
  textSize(24);
  text("Click to start!", width/2, height/2 + 60);

}


class CharObj{
  constructor(){
  this.dead = false;
  this.x = random(80,920);
  this.y = random(80,520);
  this.s = 80;
  this.direction = random(["up", "down", "left", "right"]);

  this.sprite = new Sprite(this.x,this.y,this.s,this.s);
  this.sprite.spriteSheet = 'assets/bug.png';
  this.sprite.collider = 'none';
  

  let animations =
  {
    dead: {row : 2, frames: 1},
    walkRight: {row: 1, frames: 3},
    walkUp: {row: 0, frames: 3}
  };

  this.sprite.anis.frameDelay = 7;
  this.sprite.addAnis(animations);
  this.sprite.changeAni('dead');
  }

  walkRight(){
    this.sprite.changeAni('walkRight');
    this.sprite.vel.x = 1;
    this.sprite.vel.y = 0;
    this.sprite.scale.x = -1;
  }
  
  walkLeft(){
    this.sprite.changeAni('walkRight');
    this.sprite.vel.x = -1;
    this.sprite.vel.y = 0;
    this.sprite.scale.x = 1;
  }

  walkUp(){
    this.sprite.changeAni('walkUp');
    this.sprite.vel.y = -1;
    this.sprite.vel.x = 0; 
    this.sprite.scale.y = 1;
  }
  
  walkDown(){
    this.sprite.changeAni('walkUp');
    this.sprite.vel.y = 1;
    this.sprite.vel.x = 0;
    this.sprite.scale.y = -1;   
  }

  stopped(){
    this.sprite.vel.x = 0;
    this.sprite.vel.y = 0;
    this.sprite.scale.x = 1;
    this.sprite.scale.y = 1; 
    this.sprite.changeAni('dead');
  }

  updatePos(){
    this.x += this.sprite.vel.x * speed;
    this.y += this.sprite.vel.y * speed;

    this.sprite.x = this.x;
    this.sprite.y = this.y;
    
    if(this.x <= 10 || this.x >= width-10){
      this.sprite.vel.x *= -1;
      if(this.direction === "right"){
        this.direction = "left";
      }
      else if(this.direction === "left"){
        this.direction = "right";
      }
    }
      

    if(this.y <= 10 || this.y >= height-10){
       this.sprite.vel.y *= -1;

      if(this.direction ==="up"){
        this.direction = "down";
      }
      else if(this.direction === "down"){
        this.direction = "up";
      }
    }

    this.sprite.x = this.x;
    this.sprite.y = this.y;
}

  contains(x,y){
    let insideX = x >= this.x-40 && x <= this.x +40;
    let insideY = y >= this.y-40 && y <= this.y +40;
   
  
    return insideX && insideY;
}

}
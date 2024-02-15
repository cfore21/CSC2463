let group = [];
let EskSprite;
let RoboSprite;
let VHSprite;
let ifOverlap = true;

function preload(){
  
  EskSprite = new CharObj('assets/eskimo.png');
  RoboSprite = new CharObj('assets/robot.png');
  VHSprite = new CharObj('assets/vanhelsing.png');
  
  group = [EskSprite, RoboSprite, VHSprite];

}

function setup() {
  createCanvas(1000, 600);
}

function draw() {
  background(220);

for(i = 0; i < group.length; i++){
  if (kb.pressing('ArrowRight')){group[i].walkRight();}
  else if (kb.pressing('ArrowLeft')){group[i].walkLeft();}
  else {group[i].stopped();}

 }
}


class CharObj{
  constructor(sheet){
  this.x = random(80,920);
  this.y = random(80,520);
  this.s = 80;

  this.sprite = new Sprite(this.x,this.y,this.s,this.s);
  this.sprite.spriteSheet = sheet;
  this.sprite.collider = 'none';

  let animations =
  {
    stand: {row : 0, frames: 1},
    walkRight: {row: 0, col: 1, frames: 8}
  };

  this.sprite.anis.frameDelay = 7;
  this.sprite.addAnis(animations);
  this.sprite.changeAni('stand');
  }

  walkRight(){
    this.sprite.changeAni('walkRight');
    this.sprite.vel.x = 1;
    this.sprite.scale.x = 1;
  }
  
  walkLeft(){
    this.sprite.changeAni('walkRight');
    this.sprite.vel.x = -1;
    this.sprite.scale.x = -1;
  }

  stopped(){
    this.sprite.vel.x = 0;
    this.sprite.vel.y = 0;
    this.sprite.changeAni('stand');
  }


}

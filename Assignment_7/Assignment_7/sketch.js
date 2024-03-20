 
let filter = new Tone.Filter(1, "highpass");
let vibrato = new Tone.Vibrato(7,0.5);


let syn = new Tone.Synth({
  volume: 50,
  oscillator:{
    type: "sawtooth"
  },

  envelope:{
    attack: 1,
    decay: 1,
    sustain: 1,
    release: 0.5,

  }

}).connect(vibrato);

vibrato.connect(filter);
filter.toDestination();

function preload(){
  img = loadImage ("assets/bounce.jpeg");
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
if(mouseIsPressed){
  background(img);
}

else if(mouseIsPressed === false){
    background(240);
    text ('long click to jump', width/2-50, height/2);
  }

}

function mousePressed(){
    syn.triggerAttackRelease("C5", "16n");
    filter.frequency.rampTo(7000, 0.1);

}

function mouseReleased(){
    filter.frequency.value = 1;
}

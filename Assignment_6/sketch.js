let notes;
const synth = new Tone.PolySynth(Tone.Synth);
const bend = new Tone.PitchShift();
const delay = new Tone.FeedbackDelay("8n", 0.5);


bend.pitch = 0;
synth.connect(bend);
bend.connect(delay);
delay.toDestination();

notes = {
'a' : 'C3',
's' : 'D3',
'd' : 'E3',
'f' : 'F3',
'g' : 'G3',
'h' : 'A3',
'j' : 'B3',
'k' : 'C4'
}

function setup() {
  createCanvas(400, 400);

  pitchSlider = createSlider(-8, 8, 0, 0.1);
  pitchSlider.position (100,150);
  pitchSlider.mouseMoved(() => bend.pitch = pitchSlider.value());

  delaySlider = createSlider(0, 1., 0.5, 0.05);
  delaySlider.position(100,200);
  delaySlider.mouseMoved(() => delay.delayTime.value = delaySlider.value());

}



function keyPressed(){
  let playNotes = notes[key];
  synth.triggerAttack(playNotes);
  console.log("key hit");
}

function keyReleased(){
  let playNotes = notes[key];
  synth.triggerRelease(playNotes, '+0.03');
}

function draw() {
  background(220);
  text('Press keys A-K on your keyboard to play', 100, 100);
  text('Slide to control pitch', 100, 150);
  text('Slide to control delay', 100, 200);
  
  
}

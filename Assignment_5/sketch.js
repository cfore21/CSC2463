
let b1;
let b2;
let sfx;
let delay;
let delaySlider;

sfx = new Tone.Players ({
  1 : "assets/bbc_communicat_07042079.mp3", //Computer noises
  2 : "assets/bbc_electronic_07043292.mp3", //Scifi gun
  3 : "assets/bbc_comedy--sp_07042157.mp3", //Metallic twang
  4 : "assets/bbc_cars--wols_07004267.mp3", //Old car door close
})

delay = new Tone.FeedbackDelay("8n", 0.5);
sfx.connect(delay); 
delay.toDestination();

function setup() {
  createCanvas(500, 500);

  b1 = createButton('Beeping');
  b1.position(50, 125);
  b1.mousePressed(() => sfx.player('1').start());

  b2 = createButton('Future Gun');
  b2.position(140, 125);
  b2.mousePressed(() => sfx.player('2').start());

  b3 = createButton('Twang');
  b3.position(260, 125);
  b3.mousePressed(() => sfx.player('3').start());

  b4 = createButton('Car Door Close');
  b4.position(350, 125);
  b4.mousePressed(() => sfx.player('4').start());

  delaySlider = createSlider(0, 1., 0.5, 0.05);
  delaySlider.position(175,180);
  delaySlider.mouseMoved(() => delay.delayTime.value = delaySlider.value());

}

function draw() {
  background(220);
  textAlign(CENTER);
  text("Hit buttons below to play sounds", 250, 100 );
  text("Use slider to change delay speed", 250, 250 );
  text("or remove it completely by sliding all the way down", 250, 275)
}

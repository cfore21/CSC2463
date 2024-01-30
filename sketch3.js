function setup() {
    createCanvas(400, 400);
}
  
function draw() {
    noStroke();
    background(0);
    //pacman
    fill(255,255,0);
    arc(50,70,80,80,PI+PI/4,PI/2+PI/4);
    //ghost top
    fill(255,0,0);
    arc(150,70,80,80,PI,2*PI);
    //ghost bottom
    rect(110,70,80,40);
    //ghost eyes
    fill(255,255,255);
    ellipse(130,70,25);
    ellipse(170,70,25);
    fill(0,0,255);
    ellipse(130,70,15);
    ellipse(170,70,15);
  
}
function setup() {
    createCanvas(400, 400);
}

function draw() {
    noStroke()
    background(255)
    //red circle
    fill(255,0,0,85);
    ellipse(105,75,100);
    //green circle
    fill(0,255,0,85);
    ellipse(140,130,100);
    //blue circle
    fill(0,0,255,85);
    ellipse(70,130,100);
}
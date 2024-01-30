function setup() {
    createCanvas(200, 200);
}

function draw(){
    background("navy");
    stroke(255);
    strokeWeight(3);
    fill("green");
    ellipse(width/2,height/2,100); 
    fill("red");
    beginShape();
        vertex(100, 50); 
        vertex(115, 85); 
        vertex(150, 85); 
        vertex(120, 105); 
        vertex(130, 140); 
        vertex(100, 120);
        vertex(70, 140); 
        vertex(80, 105);
        vertex(50,85); 
        vertex(85,85); 
    endShape(CLOSE);

}
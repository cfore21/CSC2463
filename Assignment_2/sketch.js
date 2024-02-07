let selectedColor;
let palette;


function setup() {
    createCanvas(1000, 1000);
    selectedColor = color("black");

     palette = [
         new Box(0,0, "red"),
         new Box(0,20, "orange"),
         new Box(0,40, "yellow"),
         new Box(0,60, "green"),
         new Box(0,80, "cyan"),
         new Box(0,100, "blue"),
         new Box(0,120, "magenta"),
         new Box(0,140, "brown"),
         new Box(0,160, "white"),
         new Box(0,180, "black"),

     ];
}

function draw() {
    for(let i=0; i<palette.length;i++){
        palette[i].draw();
    }

    if(mouseIsPressed){
        strokeWeight(5);
        stroke(selectedColor);
        line(mouseX,mouseY,pmouseX,pmouseY);
    }
}

function mousePressed(){
    for(let i=0; i<palette.length;i++){
        if(palette[i].contains(mouseX,mouseY)){
            selectedColor = palette[i].fill;
        }
        console.log(selectedColor);
    }
}

class Box {
    constructor(x,y,fill){
        this.x = x;
        this.y = y;
        this.fill = fill;    
    }

    draw(){
        fill(this.fill);
        stroke(255);
        strokeWeight(1);
        square(this.x,this.y,20);

    }

    contains(x,y){
        let insideX = x >= this.x && x <= this.x+20;
        let insideY = y >= this.y && y <= this.y+20;
        return insideX && insideY;
    }

}

class Food{
    static count = 0;
    constructor(_x,_y,_r,canvas){
        this.location = new createVector(_x,_y);
        this.r = _r;
        this.color = color(random(100,255),random(100,255),random(100,255));
        this.canvas = canvas;
        this.id = ++Food.count;
    }

    display(){
        this.canvas.push();

        this.canvas.fill(this.color);
        this.canvas.strokeWeight(2);
        this.canvas.stroke(255,255,0,100);
        this.canvas.circle(this.location.x,this.location.y,this.r);

        this.canvas.pop();
    }

    changeColor(c){
        this.color = c;
    }

}
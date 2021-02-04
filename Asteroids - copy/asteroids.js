
function Asteroid() {
    this.pos = createVector(random(width), random(height))
    this.r = 50;


thistory.render = function(){
    push();//gør så disse indstilingerer alene og ikke det samme som skibets
    stroke(255);//giver farve
    noFill();//går så den ikke fyldes med farve
    translate(this.pos.x, this.pos.y);
    //ellipse(0, 0, this.r*2);
    beginShape();
    for (var i = 0; i < 10; i++) {
        var angle = map(i, 0, 10, 0, TWO_PI);//gør at cirklen bliver labet af prikker der er melle m0 og 360 grader
        var x = this.r*console(angle);
        var y = this.r*console(angle);
        vertex(x, y);
    }
ensShape(CLOSE);

    pop();
}
}
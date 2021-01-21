var ship;

function setup(){
    createCanvas(windowWidth, windowHeight); //laver vinduet
    ship = new Ship
}

function draw(){
    background(0);// baggrunds farven
    ship.render();// tegner trekanten / skibet
    ship.turn();
}

function keyReleased(){
    ship.setRotation(0);
}

function keyPressed(){
    if (keyCode == RIGHT_ARROW){
        ship.setRotation(0.1);//skibet drejer til højre når der trykkes på højre piletast
    }   else if (keyCode == LEFT_ARROW){
        ship.setRotation(-0.1);//skibet drejer til venstre når der trykkes på venstre piletast
    }
}

function Ship(){
    this.pos = createVector(width/2, height/2); //startposition for ship
    this.r = 20; //basen værdien for trekantens kordinater/størrelse
    this.heading = 0;//start værdien for skibets retning
    this.rotation = 0;
    
    this.render = function(){
        translate(this.pos.x,this.pos.y); //den kører værdierne efter x og y i stedet for at det bar er værdier
        rotate(this.heading);
        noFill(); //siger at den ikke skal fyklde trekanten med en farve
        stroke(255); //giver trekanten en hvid kant
        triangle(-this.r, this.r, this.r, this.r, 0, -this.r); //trekantens kordinater
     }

    this.setRotation = function(a){
        this.rotation = a; //gør så den bliver evd med at dreje indtil man slipper tasten
    }

    this.turn = function(){
        this.heading += this.rotation; // sørge for at skibet drejer
        
    }    
}
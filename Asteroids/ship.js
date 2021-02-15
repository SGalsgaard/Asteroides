function keyReleased(){
    ship.setRotation(0);
    ship.boosting(false);//når man slipper tasten stopper skibet med at booste
}

function mousePressed() {
    lasers.push(new Laser(ship.pos, ship.heading));// gør at man kan bruge musenb til at skyde
}

function keyPressed(){
    if (keyCode == RIGHT_ARROW || keyCode == 68){
        ship.setRotation(0.1);//skibet drejer til højre når der trykkes på højre piletast
    }   else if (keyCode == LEFT_ARROW || keyCode == 65){
        ship.setRotation(-0.1);//skibet drejer til venstre når der trykkes på venstre piletast
    }   else if (keyCode == UP_ARROW || keyCode == 87){
        ship.boosting(true);//skibet flyver frem ad når man trykker på pil op
    }   else if (keyCode == 32){
        ship.superboost(true);
    }
}

function Ship(){
    this.pos = createVector(width/2, height/2); //startposition for ship
    this.r = 20;//basen værdien for trekantens kordinater/størrelse
    this.heading = 0;//start værdien for skibets retning
    this.rotation = 0;
    this.vel = createVector(0,0);//afgøre farten når der ikke bliver trykket på pil op
    this.isBoosting = false;

    this.isSuperBoosting = false;

    this.superboosting = function(b){
        this.isSuperBoosting = b;
    }

    this.boosting = function(b){
        this.isBoosting = b;
    }
        
    

    this.update = function(){ //gør sådan at man kan holde pil op inde
        if (this.isBoosting){
            this.boost();
        }
        this.pos.add(this.vel);//giver skibet bevægelse
        this.vel.mult(0.99)//gør så skibet taber fart når man stopper
    }

    this.boost = function(){
        var force = p5.Vector.fromAngle(this.heading);//laver en vector hvor farten kan kobles på
        force.mult(0.1);//sænker skibets fart med 90%
        this.vel.add(force);//tilføjer velocity til skibet
    }
    
    this.superboost = function(){
        var force = p5.Vector.fromAngle(this.heading);
        force.mult(10);
        this.vel.add(force);
    }

    this.hits = function(asteroids) {
        var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        if (d < this.r + asteroid.r) {
            return true;
        } else {
            return false;
        }
    }

    this.render = function(){
        push();
        translate(this.pos.x,this.pos.y); //den kører værdierne efter x og y i stedet for at det bar er værdier
        rotate(this.heading + PI / 2);
        fill(0); //fylder trekanten med sort farve, så man ikke kan se skudenen der bliver skudt fra centrum
        stroke(255); //giver trekanten en hvid kant
        triangle(-this.r, this.r, this.r, this.r, 0, -this.r); //trekantens kordinater
        pop();
    }

    this.edges = function(){
        if (this.pos.x > width + this.r){ // sørger for at skibet kommer frem på venstre side, hvis man køre ud over højre side
            this.pos.x = -this.r;
        }else if (this.pos.x < -this.r){ // sørger for at skibet kommer frem på højre side, hvis man køre ud over venstre side
            this.pos.x = width + this.r;
        }

        if (this.pos.y > height + this.r){ // sørger for at skibet kommer frem i toppen, hvis man køre ud i bunden
            this.pos.y = -this.r;
        }else if (this.pos.y < -this.r){ // sørger for at skibe kommer frem i bunden, hvis man køre ud i toppen
            this.pos.y = height + this.r;
        }

    }

    this.setRotation = function(a){
        this.rotation = a; //gør så den bliver evd med at dreje indtil man slipper tasten
    }

    this.turn = function(){
        this.heading += this.rotation; // sørge for at skibet drejer
        
    }    
}
var ship;
var asteroids = [];
var lasers = [];

function setup() {
    createCanvas(windowWidth, windowHeight); //laver vinduet
    ship = new Ship();

    for (var i = 0; i < 5; i++) {
        asteroids.push(new Asteroid());
    }
}

function draw() {
    background(255);//baggrunds farven


    for (var i = 0; i < asteroids.length; i++) {
        // if (ship.hits(asteroids[i])) {
        //     console.log('ooops!');
        // }
        asteroids[i].render();
        asteroids[i].update();
        asteroids[i].edges();
    }

    // for (var i = lasers.length-1; i >=0; i--){
    //     lasers[i].render();
    //     lasers[i].update();
    //     if (lasers[i].offscreen()){
    //         lasers.splice(i, 1);
    //     } else {


    //     for (var j = asteroids.length-1; j >= 0 < asteroids.length; j--)
    //         if (lasers[i].hits(asteroids[j])){
    //             if (asteroids[j].r > 10){
    //             var newAsteroids = asteroids[j].breakup();
    //             console.log(newAsteroids);
    //             asteroids = asteroids.concat(newAsteroids);
    //             console.log(asteroids);
    //             } 
    //             asteroids.splice(j, 1);
    //             lasers.splice(i, 1);
    //             break;

    //     }
    // }

    // }

    ship.render();//tegner trekanten / skibet
    ship.turn();// får skibet til at dreje i programmet
    ship.update();// får skibet til at køre fremad
    ship.edges();// får skibet til at komme frem på den ene side hvis man køre ud over den anden side
}

function keyReleased() {
    ship.setRotation(0);
    ship.boosting(false);//når man slipper tasten stopper skibet med at booste
}

function keyPressed() {
    if (key == '32') {
        lasers.push(new Laser(ship.pos, ship.heading));
    } else if (keyCode == RIGHT_ARROW) {
        ship.setRotation(0.1);//skibet drejer til højre når der trykkes på højre piletast
    } else if (keyCode == LEFT_ARROW) {
        ship.setRotation(-0.1);//skibet drejer til venstre når der trykkes på venstre piletast
    } else if (keyCode == UP_ARROW) {
        ship.boosting(true);//skibet flyver frem ad når man trykker på pil op
    }
}

function Ship() {
    this.pos = createVector(width / 2, height / 2); //startposition for ship
    this.r = 20;//basen værdien for trekantens kordinater/størrelse
    this.heading = 0;//start værdien for skibets retning
    this.rotation = 0;
    this.vel = createVector(0, 0);//afgøre farten når der ikke bliver trykket på pil op
    this.isBoosting = false;

    this.boosting = function (b) {
        this.isBoosting = b;
    }



    this.update = function () { //gør sådan at man kan holde pil op inde
        if (this.isBoosting) {
            this.boost();
        }
        this.pos.add(this.vel);//giver skibet bevægelse
        this.vel.mult(0.99)//gør så skibet taber fart når man stopper
    }

    this.boost = function () {
        var force = p5.Vector.fromAngle(this.heading);//laver en vector hvor farten kan kobles på
        force.mult(0.1);//sænker skibets fart med 90%
        this.vel.add(force);//tilføjer velocity til skibet
    }

    this.render = function () {
        push(); // sørger for at asteroiderne ikke bevæger sig sammen med skibet
        translate(this.pos.x, this.pos.y); //den kører værdierne efter x og y i stedet for at det bar er værdier
        rotate(this.heading + PI / 2);
        noFill(); //siger at den ikke skal fyklde trekanten med en farve
        stroke(255); //giver trekanten en hvid kant
        triangle(-this.r, this.r, this.r, this.r, 0, -this.r); //trekantens kordinater
        pop();// sørger for at asteroiderne ikke bevæger sig sammen med skibet
    }

    this.edges = function () {
        if (this.pos.x > width + this.r) { // sørger for at skibet kommer frem på venstre side, hvis man køre ud over højre side
            this.pos.x = -this.r;
        } else if (this.pos.x < -this.r) { // sørger for at skibet kommer frem på højre side, hvis man køre ud over venstre side
            this.pos.x = width + this.r;
        }

        if (this.pos.y > height + this.r) { // sørger for at skibet kommer frem i toppen, hvis man køre ud i bunden
            this.pos.y = -this.r;
        } else if (this.pos.y < -this.r) { // sørger for at skibe kommer frem i bunden, hvis man køre ud i toppen
            this.pos.y = height + this.r;
        }

    }

    this.setRotation = function (a) {
        this.rotation = a; //gør så den bliver evd med at dreje indtil man slipper tasten
    }

    this.turn = function () {
        this.heading += this.rotation; // sørge for at skibet drejer

    }
}
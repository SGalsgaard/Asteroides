var ship;
var asteroids = [];
var lasers = [];
// var song;

function setup() {
    createCanvas(windowWidth, windowHeight); //laver vinduet
    // song = loadSound("zap.mp3", loaded);
    ship = new Ship();
    for (var i = 0; i < 5; i++){
        asteroids.push(new Asteroid());
    }
}

function loaded() {
    song.play();
}

function draw() {
    background(0);//baggrunds farven


    for (var i = 0; i < asteroids.length; i++) {
        // if (ship.hits(asteroids[i])) {
        //     console.log('ooops!');
        // }
        asteroids[i].render();
        asteroids[i].update();
        asteroids[i].edges();
    }

    for (var i = lasers.length - 1; i >= 0; i--) {
        lasers[i].render();
        lasers[i].update();
        if (lasers[i].offscreen()) {
            lasers.splice(i, 1);
        } else {
            for (var j = asteroids.length - 1; j >= 0; j--){
                if (lasers[i].hits(asteroids[j])) {
                    if (asteroids[j].r > 10) {
                        var newAsteroids = asteroids[j].breakup();
                        console.log(newAsteroids);
                        asteroids = asteroids.concat(newAsteroids);
                        console.log(asteroids);
                    }
                    asteroids.splice(j, 1);
                    lasers.splice(i, 1);
                    break;

                }
            }
        }

    }
    


    ship.render();//tegner trekanten / skibet
    ship.turn();// får skibet til at dreje i programmet
    ship.update();// får skibet til at køre fremad
    ship.edges();// får skibet til at komme frem på den ene side hvis man køre ud over den anden side
}
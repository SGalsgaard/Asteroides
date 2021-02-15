function Asteroid(pos, r) {
  if (pos) {
    this.pos = pos.copy();
  } else {
    this.pos = createVector(random(width), random(height))
  }
  if (r) {
    this.r = r * 0.5;
  } else {
    this.r = random(15, 50);
  }

  this.vel = p5.Vector.random2D();
  this.total = floor(random(5, 15))//gør at der er en forsklig mængder af kanter på hver meteor
  this.offset = [];
  for (var i = 0; i < this.total; i++) {
    this.offset[i] = random(-this.r * 0.5, this.r * 0.5);//hvor meget siderne er offset
  }

  this.update = function () {
    this.pos.add(this.vel);
  }

  this.render = function () {
    push();//gør så disse indstilingerer alene og ikke det samme som skibets
    stroke(255);//giver farve
    noFill();//går så den ikke fyldes med farve
    translate(this.pos.x, this.pos.y);
    beginShape();
    for (var i = 0; i < this.total; i++) {
      var angle = map(i, 0, this.total, 0, TWO_PI);//gør at cirklen bliver labet af prikker der er melle m0 og 360 grader
      var r = this.r + this.offset[i];
      var x = r * cos(angle);
      var y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);

    pop();
  }

  this.breakup = function () {
    var newA = [];
    newA[0] = new Asteroid(this.pos, this.r);
    newA[1] = new Asteroid(this.pos, this.r);
    return newA;
  }

  this.edges = function () {
    if (this.pos.x > width + this.r) { // sørger for at asteroiderne kommer frem på venstre side, hvis man køre ud over højre side
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) { // sørger for at asteroiderne kommer frem på højre side, hvis man køre ud over venstre side
      this.pos.x = width + this.r;
    }

    if (this.pos.y > height + this.r) { // sørger for at asteroiderne kommer frem i toppen, hvis man køre ud i bunden
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) { // sørger for at asteroiderne kommer frem i bunden, hvis man køre ud i toppen
      this.pos.y = height + this.r;
    }

  }

}
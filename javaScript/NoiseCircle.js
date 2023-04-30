class NoiseCircle {
  constructor(_x, _y, _br, zoffUpdate, noiseMax) {
    this.location = new createVector(_x, _y);
    this.br = _br;
    this.color = color(27, 89, 31);
    this.coreColor = color(255, 0, 0);
    this.velocity = new createVector(random(-0.7, 0.7), random(-0.7, 0.7))
    this.zoffUpdate = zoffUpdate;
    this.noiseMax = noiseMax;

    this.originalSize = this.br; // the basic core radius
    this.desired = new createVector(0,0); //desired the food location
    this.friction = new createVector(0, 0);
    this.speedLimit = random(1, this.originalSize);

    this.creatureState = "hungry";
    this.hungryThreshold = 3;
    this.fullThreshold = 5;

    this.isFull = function () {
      return this.creatureState === 'full';
    }
  }

  update() {
    // 更新生物大小和状态
    if (this.creatureState === 'hungry' && this.br >= this.fullThreshold) {
      this.changeState('full');
    } else if (this.creatureState === 'full' && this.br <= this.hungryThreshold) {
      this.changeState('hungry');
    }

    // 缩小到初始大小
    if (this.creatureState === 'full' && this.br > this.originalSize) {
      this.br -= 0.1;
    }

    // 判断生物状态
    if (this.br < this.hungryThreshold) {
      this.changeState('hungry');
    } else if (this.br > this.fullThreshold) {
      this.changeState('full');
    }
  }

  findFood(x, y) { //return a bool, whether they find the food

    this.desired.x = x;
    this.desired.y = y;
    let direction = p5.Vector.sub(this.desired, this.location); // gets vector between these two points

    // mag / magnitude is the length of the distance between the two points
    if (direction.mag() < this.br * 5) {
      return true; //stops moving as it returns before adding direction to velocity below
    }

    //only move if they are close to the target x & y locations
    if (direction.mag() < 50) {
      direction.normalize(); //normalize gives us the unit vector of length 1 (i.e. just the direction )
      this.velocity.add(direction);

      //crawling zigzaggy
      let angle = noise(this.location.x / 500, this.location.y / 500, frameCount / 20) * TWO_PI * 2; //0-2PI

      this.friction.x = this.velocity.x * -1;
      this.friction.y = this.velocity.y * -1;
      this.friction.normalize();
      this.friction.mult(0.1);
      this.velocity.add(this.friction);

      this.velocity.limit(this.speedLimit);
      this.location.x += this.velocity.x * sin(angle) * 5;
      this.location.y += this.velocity.y * cos(angle) * 5;
      this.location.add(this.velocity);
    }
    return false;
  }

  changeState(newState) {
    this.creatureState = newState;
    // if (newState === "full") {
    //   this.br = min(this.br, this.maxSize); // 限制半径大小不超过最大值
    // }
    // this.creatureState = newState;
    // this.stateStart = millis();
  }

  firction() {
    //if(this.moveToFood){
    // add friction to velocity
    this.friction.x = this.velocity.x * -1;
    this.friction.y = this.velocity.y * -1;
    this.friction.normalize();
    this.friction.mult(0.1);
    this.velocity.add(this.friction);

    this.velocity.limit(this.speedLimit);
    this.location.add(this.velocity);
    //}
  }

  crawling() {

    let angle = noise(this.location.x / 500, this.location.y / 500, frameCount / 20) * TWO_PI * 2; //0-2PI

    // this.velocity = p5.Vector.fromAngle(angle);
    // //this.velocity.mult(3);

    // this.location.add(this.velocity);

    // let direction = p5.Vector.fromAngle(angle);
    // direction.mult(3);

    // this.location.add(direction);

    //let randomAngle = random(TWO_PI)/100;
    //angle += randomAngle;
    this.location.x += this.velocity.x * cos(angle) * 3;
    this.location.y += this.velocity.y * sin(angle) * 3;
    
  }

  bouncing() {
    //bouncing
    if (this.location.x < 0 || this.location.x > width) this.velocity.x *= -1;
    if (this.location.y < 0 || this.location.y > height) this.velocity.y *= -1;
    //this.direction.normalize();
    //this.velocity.mult(this.direction);
    ///this.location.add(this.velocity);

  }


  communication(other) {
    let d = dist(this.location.x, this.location.y, other.location.x, other.location.y);
    return d < this.br * 50 + other.br * 50;
  }

  contains(px, py) {
    let d = dist(px, py, this.location.x, this.location.y);
    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  }

  changeColor(c) {
    this.color = c;
  }

  changeCoreColor(c) {
    this.coreColor = c;
    //console.log(c0);
  }

  Draw(r) {
    push();
    translate(this.location.x, this.location.y);
    //stroke(255, 255, 200,50);
    stroke(255, 100);
    strokeWeight(1);

    //let alpha1 = map(sin(zoff), -1,1,0,255);
    let alpha1 = 5;

    fill(this.color, alpha1);
    beginShape();

    //this.noiseMax = map(r, 0, 0.5, 1, 5);
    for (let a = 0; a < TWO_PI; a += radians(5)) {
      let xoff = map(cos(a + phase), -1, 1, 0, this.noiseMax + r);
      let yoff = map(sin(a + phase), -1, 1, 0, this.noiseMax + r);
      let rad = r + map(noise(xoff, yoff, zoff), 0, 1, r, this.br * 100);
      let x = rad * cos(a);
      let y = rad * sin(a);
      curveVertex(x, y);
    }
    endShape(CLOSE);

    phase += 0.001;
    zoff += this.zoffUpdate;

    //draw core

    let alpha2 = map(r, 0, 0.5, 20, 255);

    fill(255, 255, 200, alpha1);
    ellipse(0, 0, r + this.br * 30);

    fill(this.coreColor, alpha2);
    ellipse(0, 0, r + this.br * 20);

    pop();
  }
}

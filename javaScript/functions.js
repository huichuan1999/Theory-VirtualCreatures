function randomPoints() {
    fogBackground.noStroke();
    fogBackground.fill(0, random(0, 200), random(0, 200),10);
    fogBackground.ellipse(random(width), random(height), random(2, width));
}

function soundThreshod() {
  let vol = mic.getLevel();
  let threshold1 = 0.03;
  if (vol > threshold1) {
    fill(255, 255, 0);
    strokeWeight(1);
    stroke(255);
    ellipse(random(width), random(height), vol * 100);
  }

  let threshold2 = 0.4;
  if (vol > threshold2) {
    fill(0);
    ellipse(width / 2, height / 2, height, height);
  }
}  

function updateBG() {
    noStroke();
    //fill(210,210,255,20);
    fill(0, 100, 30, 5);
    rect(0, 0, width, height);
}

function addAmoebas(x,y){
    let r2 = random(0.2, 1.2);
    let zoffUpdate2 = random(0.05, 0.0001);
    let noiseMax2 = random(0, 1.5);
    let n = new NoiseCircle(x,y, r2, zoffUpdate2, noiseMax2);
    noiseCircles.push(n);
}

function removeAmoebas(){
  if (noiseCircles.length>0){
    let lastAmoeba = noiseCircles[noiseCircles.length - 1];
    lastAmoeba.br *= 2;
    lastAmoeba.noiseMax *= 7; 
    setTimeout(() => {
      noiseCircles.pop();
    }, 500);
  }
}

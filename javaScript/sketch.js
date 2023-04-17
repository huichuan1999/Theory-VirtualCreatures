//Amoebas - HTML
//1-14-2023,Huichuan Wang
/*
It is a array of amoebas shapes like fried eggs, so at first I named it egg amoeba.
I want to show it like real amoebas crawling zigzaggy. It will react to your sound, like a biological stress response. They also would like to communicate to each other,when they get close they will change color and concat together, exchange pheromones.
When you make a sound, yellow dots are generated at random positions, and their radius is your volume.When your sound is higher than the threshold, the background change.
*/
//Acknowledgements (references, links, inspirations, etc:
//noise loop references:https://editor.p5js.org/codingtrain/sketches/sy1p1vnQn
//mic threshold : https://editor.p5js.org/p5/sketches/Sound:_Mic_Threshold
//particle system: https://p5js.org/examples/simulate-particles.html
//Genetic Algorithms and Evolutionary Computing :https://natureofcode.com/book/chapter-9-the-evolution-of-code/ 

let mic;
let vol;
let phase = 0;
let zoff = 0;

let noiseCircles = [];
let newFoods = [];

let clearing = false;

let canvas;
let foodPG;

let buttonClear;
let buttonAddACreature;
let buttonKillACreature;
let buttonRestart;

let redSlider, greenSlider, blueSlider;

let disableDrawing = false;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-container");//

  fogBackground = createGraphics(windowWidth, windowHeight);
  fogBackground.parent("sketch-container");

  foodPG = createGraphics(windowWidth, windowHeight);
  foodPG.parent("sketch-container");

  mic = new p5.AudioIn();
  mic.start();

  for (let i = 0; i < 12; i++) {
    let zoffUpdate1 = random(0.001, 0.0001);
    let noiseMax1 = random(0, 1.5);

    noiseCircles[i] = new NoiseCircle(random(width), random(height),
      random(0.2, 1.2),// the original size
      zoffUpdate1, noiseMax1);
  }
  addGUI();

}

function draw() {
  foodPG.clear();
  foodPG.background(0, 0, 0, 0);
  vol = mic.getLevel() * 7;
  //console.log(vol);
  
  if (frameCount % 2 == 0)randomPoints();//the background color
  //soundThreshod();
  //image(fogBackground, 0, 0);

  for (let i = 0; i < noiseCircles.length; i++) {
    noiseCircles[i].Draw(vol);
    noiseCircles[i].crawling();
    noiseCircles[i].bouncing();

    //managing the state changing
    let currentSize = noiseCircles[i].br;
    let hungryThreshold = 2;
    let fullThreshold = 5;

    if (currentSize < hungryThreshold) {
      //noiseCircles[i].changeState("hungry");
    } else if (currentSize >= fullThreshold) {
      noiseCircles[i].changeState("full");
    }

    if (noiseCircles[i].creatureState == "full") {
      //console.log("i am full");
      if (currentSize > noiseCircles[i].originalSize) {

        noiseCircles[i].br -= 0.1;
        noiseCircles[i].changeColor(color(255, 128));
        noiseCircles[i].crawling();
      }
    }

    for (let f = 0; f < newFoods.length; f++) {

      clearing = false;
      if (!clearing && noiseCircles[i].findFood(newFoods[f].location.x, newFoods[f].location.y)) {
        //when it eat, it become bigger HUNGRY // 在这里执行生物处于饥饿状态时的操作
        //console.log("Arrived");
        noiseCircles[i].br += 0.1; //吃东西 变大
        if (noiseCircles[i].creatureState == "full") {
          break;
        }

      }
      newFoods[f].display();
    }
    //console.log(clearing);
    //communication
    let overlapping = false;
    for (let j = 0; j < noiseCircles.length; j++) {
      if (i != j) {
        if (noiseCircles[j] != noiseCircles[i] && noiseCircles[i].communication(noiseCircles[j])) {
          overlapping = true;
          //stroke(230, 238, 156, 100);
          stroke(255, 255, 200, 170);
          strokeWeight(4);
          line(noiseCircles[i].location.x, noiseCircles[i].location.y,
            noiseCircles[j].location.x, noiseCircles[j].location.y);
        }
      }
      //change color
      if (overlapping) {
        noiseCircles[i].changeColor(color(255, 152, 0, 20));
        noiseCircles[i].changeCoreColor(color(255, 200, 0));
      } else {
        noiseCircles[i].changeColor(color(230, 238, 156, 25));
        noiseCircles[i].changeCoreColor(color(255, 0, 0));
      }
    }
  }

  image(foodPG, 0, 0);
  

}

function mousePressed() {
  if (!disableDrawing) {
    pressOnCanvas();
  }
}

function pressOnCanvas() {
  if (mouseX < width && mouseY < height) {
    newFood = new Food(mouseX, mouseY, random(10, 20), foodPG);
    newFoods.push(newFood);
    clearing = false;
  }
  //console.log(newFoods);
}

function addGUI() {
  buttonClear = new Button("Clear A Food", buttonClearPress);
  buttonAddACreature = new Button("Add A Creature", buttonAddACreaturePress);
  buttonKillACreature = new Button("Kill A Creature", buttonKillACreaturePress);
  buttonRestart = new Button("Restart", buttonRestartPress);
  //buttonRestart.parent("restart-button-container");
  //RGBSlider();
}


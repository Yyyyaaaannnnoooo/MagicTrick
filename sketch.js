const SIZE = 75;
const DEPTH = 370;
const START_VALUE = 100;
const SPIN = 0.05;
const RANGE = 0.25;
let FormName = '';
let formIndex = 0;
let firstSentence = false;
let start = false;
let startCount = 0;
let cnv;
function setup() {
  cnv = createCanvas(innerWidth, innerHeight, WEBGL);
  cnv.parent('p5Sketch');
  noStroke();
}

function draw() {
  background(0);
  var locY = (mouseY / height - 0.5) * (-2);
  var locX = (mouseX / width - 0.5) * 2;

  ambientLight(100, 80, 80);
  pointLight(200, 200, 200, locX, locY, 0);
  normalMaterial();
  let x = map(sx, -9, 9, -width * 0.85, width * 0.85);
  // let x = map(mouseX, 0, width, -width * 0.85, width * 0.85);
  if (start) {
    push();
    rotateZ(PI / 2);
    rotateX(sx);
    cylinder(SIZE, DEPTH, 24, 1, false, false);
    translate(0, x, 0);
    rotateZ(frameCount * SPIN);
    rotateX(frameCount * SPIN);
    rotateY(frameCount * SPIN);
    theMagic3DForm(formIndex);
    pop();
  } else {
    let w = map(startCount, 0, START_VALUE, 0, width);
    fill(0, 0, 255);
    rect(-width / 2, -height / 2, w, height);
  }
  /******************
   * THE MAGIC TEXT *
   ******************/
  if (x < (-DEPTH / 2) + 50 || x > (DEPTH / 2) - 50) {
    document.getElementById('trick').innerHTML = "...IT'S A " + FormName + "!";
    firstSentence = true;
  }
  else if (firstSentence) {
    document.getElementById('trick').innerHTML = "IT GOES INSIDE AND...";
  }
  else {
    document.getElementById('trick').innerHTML = "";
  }
  if (RANGE > sx && -RANGE < sx && start) formIndex = updateFormIndex(formIndex);
  /**
   * LOADING PAGE CONTROLLER
   */
  if (mouseIsPressed) {
    startCount++;
    if (!start && startCount > START_VALUE) {
      document.getElementById('intro').style.display = 'none';
      document.getElementById('trick').style.display = 'block';
      start = true;
    }
  }
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight, WEBGL);
}

function theMagic3DForm(val) {
  if (val === 0) {
    sphere(SIZE - 10);
    FormName = 'BALL'
  } else if (val == 1) {
    box(SIZE * 1.15);
    FormName = 'CUBE';
  } else if (val == 2) {
    torus(SIZE * 0.55, SIZE / 3);
    FormName = 'TORUS';
  } else if (val == 3) {
    cone(SIZE / 2, SIZE * 1.5);
    FormName = 'CONE';
  }
}

function updateFormIndex(val) {
  let prev = val;
  while (true) {
    val = floor(random(4));
    if (val != prev) break;
  }
  return val;
}

/**
 * DEVICE MOTION
 */

/* PREFS */
const easing = 0.05; // set between 0 - 1

/* VARS */
let rx, ry, rz, sx, sy, sz;
rx = ry = rz = sx = sy = sz = 0;

/* ONDEVICEMOTION */
// https://developer.mozilla.org/en-US/docs/Web/Events/devicemotion
window.ondevicemotion = event => {
  /* RAW VALUES */
  rx = event.accelerationIncludingGravity.x;
  ry = event.accelerationIncludingGravity.y;
  rz = event.accelerationIncludingGravity.z;

  /* SMOOTHED VALUES */
  sx = smoothVal(rx, sx);
  sy = smoothVal(ry, sy);
  sz = smoothVal(rz, sz);
};

/* VALUE MAPPING */
function mapVal(value, istart, istop, ostart, ostop) {
  return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}

/* VALUE SMOOTHING */
function smoothVal(inputVal, outputVal) {
  let tarVal = inputVal;
  let calcVal = tarVal - outputVal;
  outputVal += calcVal * easing;
  return outputVal;
}
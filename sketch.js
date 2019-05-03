let is_mobile = false; //initiate as false
// device detection
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
  || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
  is_mobile = true;
}


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
let val = 0;
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
  // pointLight(200, 200, 200, locX, locY, 0);
  normalMaterial();

  if (is_mobile) {
    val = sx;
  } else {
    val = map(mouseX, 0, width, -9, 9);
  }

  let x = map(val, -9, 9, -width * 0.85, width * 0.85);
  if (start) {
    push();
    rotateZ(PI / 2);
    rotateX(val);
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
  if (RANGE > val && -RANGE < val && start) formIndex = updateFormIndex(formIndex);
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
let faceapi;
let detections = [];

let video;
let canvas;

let textX;
let textY;

let clearButton;

function setup() {
  canvas = createCanvas(480, 360);
  canvas.id("canvas");

  video = createCapture(VIDEO);
  video.id("video");
  video.size(width, height);

    // Create the button
  clearButton = createButton("But who am I?");
  clearButton.style("color", "#fff");
  clearButton.style("padding", "5px 8px");
  clearButton.style("text-decoration", "none");
  clearButton.style("font-size", "0.9em");
  clearButton.style("font-weight", "normal");
  clearButton.style("border-radius", "3px");
  clearButton.style("border", "none");
  clearButton.style("text-shadow", "0 -1px 0 rgba(0, 0, 0, .2)");
  clearButton.style("background", "blue");
  clearButton.position(20, height + 20);
  clearButton.mousePressed(clearCanvas);
  
  // from here: https://justadudewhohacks.github.io/face-api.js/docs/index.html
  const faceOptions = {
    withLandmarks: true,
    withExpressions: false,
    withDescriptors: true,
    minConfidence: 0.5
  };

  //Initialize the model
  faceapi  = ml5.faceApi(video, faceOptions, faceReady);
}

function faceReady() {
  faceapi.detect(gotFaces);
}

// Got faces
function gotFaces(error, result) {
  if (error) {
    console.log(error);
    return;
  }

  detections = result;　//Now all the data in this detections
  // console.log(detections);
  draw();
}

  function draw() {
    // Draw blue background
    background('blue');
  

  //clear();//Draw transparent background -> close clear to make blue background appear
  //drawBoxs(detections);//Draw detection box:
  drawLandmarks(detections);// Draw all the face points:
  //drawExpressions(detections, 20, 250, 14);//Draw face expression: 

  // Draw floating text
  fill(173, 216, 230); // Light blue color
  noStroke();
  textAlign(CENTER);
  textFont('Courier New', 10); 
  textSize(20);
  text("Here is a person LIKE 'you'", textX, textY);
  text("But is there anything ABOUT you?", textX, textY + 30);

  faceapi.detect(gotFaces);// Call the function again at here: 
    
    
}

function drawBoxs(detections){
  if (detections.length > 0) {//If at least 1 face is detected: 
    for (f=0; f < detections.length; f++){
      let {_x, _y, _width, _height} = detections[f].alignedRect._box;
      stroke(44, 169, 225);
      strokeWeight(1);
      noFill();
      rect(_x, _y, _width, _height);
    }
  }
}

function drawLandmarks(detections){
  if (detections.length > 0) {//If at least 1 face is detected:
    for (f=0; f < detections.length; f++){
      let points = detections[f].landmarks.positions;
      for (let i = 0; i < points.length; i++) {
        stroke(255, 255, 225);
        strokeWeight(3);
        point(points[i]._x, points[i]._y);
      }
    }
  }
}


function displayRandomText() {
  textX = random(width);
  textY = random(height);
}

// Call displayRandomText every 5 seconds
setInterval(displayRandomText, 5000);

// Initial display of text(delete:start random twice)
// displayRandomText();


function clearCanvas() {
  window.alert('I am vast and complex.');
  

  // Remove the canvas
  canvas.remove();

}
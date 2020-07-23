var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext('2d');
console.log(canvas);

let zLevel = 0;
let girdScaleDivider = 10;
let xResolutionGLOBAL = canvas.width / (girdScaleDivider * 2);
let yResolutionGLOBAL = canvas.height / (girdScaleDivider * 2);



function displayGrid(xResolution, yResolution, theArray) {
    for (var xi = 0; xi < xResolution; xi++) {
        for (var yi = 0; yi < yResolution; yi++) {
            console.log(theArray[xi][yi]);
            drawCircle(xi * girdScaleDivider*2, yi * girdScaleDivider*2, 4, "rgb("+theArray[xi][yi]*255+","+theArray[xi][yi]*255+","+theArray[xi][yi]*255+")");
        }
    }
}
function drawLine(x1, y1, x2, y2, lineWidth = 3, strokeStyle = "rgb(99,0,0)") {
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.strokeStyle = strokeStyle;
    c.lineWidth = lineWidth;
    c.stroke();
}
function drawCircle(centerX, centerY, radius = 5, strokeStyle = "rgb(99,0,0)") {
    c.beginPath();
    c.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    c.strokeStyle = strokeStyle;
    c.stroke();
}
function randomArray(){

    myLocalArray = makeArray(canvas.width, canvas.height);

    
    for(var x = 0; x < canvas.width; x++){
        for(var y = 0; y < canvas.height; y++){
            myLocalArray[x][y] = Math.random();
        }
    }
    return myLocalArray;


}

function makeArray(x,y){
    let myArray = new Array(x)
    for(var i = 0; i<y; i++){
         myArray[i] = [];
    }
    return myArray;
}

function processArray(){
    
}

displayGrid(xResolutionGLOBAL, yResolutionGLOBAL, randomArray());
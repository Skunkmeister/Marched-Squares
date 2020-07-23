var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext('2d');
console.log(canvas);

let zLevel = 0;
let girdScaleDivider = 20;
let xResolutionGLOBAL = canvas.width / (girdScaleDivider * 2);
let yResolutionGLOBAL = canvas.height / (girdScaleDivider * 2);



function displayGrid(xResolution, yResolution, theArray) {
    for (var xi = 0; xi < xResolution; xi++) {
        for (var yi = 0; yi < yResolution; yi++) {
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

    var myLocalArray = makeArray(canvas.height, canvas.width);
    for(var row = 0; row < canvas.height; row++){
        for(var column = 0; column < canvas.width; column++){
            myLocalArray[row][column] = Math.random();
        }
    }
    return myLocalArray;
}
function makeArray(rows,columns){
    let myArray = new Array(rows);
    for(var i = 0; i<rows; i++){
         myArray[i] = new Array(columns);
    }
    return myArray;
}
function processNoiseArray(myArray){   
    myProcessedArray = makeArray(myArray.length-2, myArray[0].length-2)
    
    console.log(myArray.length + "," + myArray[0].length)
    console.log(myProcessedArray.length + "," + myProcessedArray[0].length)
    for (var row = 1; row < myProcessedArray.length-1; row++) {
        for (var column = 1; column < myProcessedArray[0].length-1; column++) {
            myProcessedArray[row-1][column-1] = Math.round((myArray[row+1][column] + myArray[row-1][column] + myArray[row][column+1] + myArray[row][column-1] + myArray[row][column])/5);
        }
    }
    console.log(myProcessedArray)
    return myProcessedArray;
}


let heightField = processNoiseArray(randomArray());
displayGrid(xResolutionGLOBAL, yResolutionGLOBAL, heightField);


let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext('2d');
console.log(canvas);

let gridScaleDivider = 20;
let xResolutionGLOBAL = Math.ceil(canvas.width / (gridScaleDivider * 2));
let yResolutionGLOBAL = Math.ceil(canvas.height / (gridScaleDivider * 2));
console.log("xResolutionGLOBAL: " + xResolutionGLOBAL);
console.log("yResolutionGLOBAL: " + yResolutionGLOBAL);



function displayGrid(xResolution, yResolution, theArray) {
    for (let xi = 0; xi < xResolution; xi++) {
        for (let yi = 0; yi < yResolution; yi++) {
            drawCircle(xi * gridScaleDivider * 2, yi * gridScaleDivider * 2, 4, "rgb(" + theArray[xi][yi] * 255 + "," + theArray[xi][yi] * 255 + "," + theArray[xi][yi] * 255 + ")", theArray[xi][yi]);
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
function drawCircle(centerX, centerY, radius = 5, strokeStyle = "rgb(99,0,0)", isFull) {
    c.beginPath();
    c.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    c.strokeStyle = strokeStyle;
    c.fillStyle = "rgb(255,255,255)";
    if(isFull){
        c.fill()
    }
    c.stroke();
}
function randomArray(buffer) {

    let myLocalArray = makeArray(yResolutionGLOBAL+buffer, xResolutionGLOBAL
        +buffer);

    for (let row = 0; row < yResolutionGLOBAL+buffer; row++) {
        for (let column = 0; column < xResolutionGLOBAL+buffer; column++) {
            myLocalArray[row][column] = Math.random();
        }
    }

    console.log("The RandomArray:")
    console.log(myLocalArray)
    return myLocalArray;
}
function makeArray(rows, columns) {
    let myArray = new Array(rows);
    for (let i = 0; i < rows; i++) {
        myArray[i] = new Array(columns);
    }
    return myArray;
}
function processNoiseArray(myArray, power=1.2) {
    myProcessedArray = makeArray(yResolutionGLOBAL-2, xResolutionGLOBAL-2);
    console.log("myArray in processNoiseArray(): ")
    console.log(myArray);
        for (let row = 1; row < myArray.length - 1; row++) {
            for (let column = 1; column < myArray[0].length - 1; column++) {
                myProcessedArray[row - 1][column - 1] = Math.round(Math.pow((myArray[row + 1][column] + myArray[row - 1][column] + myArray[row][column + 1] + myArray[row][column - 1] + myArray[row][column]) / 5, power));
            }
        }
    return myProcessedArray;
}
// Void, resamples at set scale
class vector2D {
    constructor(definedX, definedY) {
        this.x = definedX;
        this.y = definedY;
    }
}
function displaySquareMarch(myHeightField) {
    let canCoord = new vector2D();
    let pos1 = new vector2D();
    let pos2 = new vector2D();
    let pos3 = new vector2D();
    let pos4 = new vector2D();
    for (let row = 0; row < myHeightField.length; row++) {
        for (let column = 0; column < myHeightField.length; column++) {
            
            console.log(myHeightField);
            console.log(evaluateSquare(myHeightField, row, column));

            pos1.x = (canCoord.x + gridScaleDivider);
            pos1.y = (canCoord.y);
            pos2.x = (canCoord.x + 2*gridScaleDivider);
            pos2.y = (canCoord.y + gridScaleDivider);
            pos3.x = (canCoord.x + gridScaleDivider);
            pos3.y = (canCoord.y + 2 * gridScaleDivider);
            pos4.x = (canCoord.x)
            pos4.y = (canCoord.y + gridScaleDivider);

        }
    }
}
function evaluateSquare(theHeightField, row, column) {
    return (theHeightfield[row, column] * 1 + theHeightfield[row, column + 1] * 2 + theHeightfield[row + 1, column + 1] * 4 + theHeightfield[row + 1, column] * 8);

}




let heightField = processNoiseArray(randomArray(2),1);
displayGrid(xResolutionGLOBAL, yResolutionGLOBAL, heightField);
displaySquareMarch(heightField);


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
    for (let column = 0; column < xResolution; column++) {
        for (let row = 0; row < yResolution; row++) {
            drawCircle(column * gridScaleDivider * 2, row * gridScaleDivider * 2, 4, "rgb(" + theArray[row][column] * 255 + "," + theArray[row][column] * 255 + "," + theArray[row][column] * 255 + ")", theArray[row][column]);
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

    let myLocalArray = makeArray(yResolutionGLOBAL+buffer, xResolutionGLOBAL+buffer);

    for (let row = 0; row < yResolutionGLOBAL+buffer; row++) {
        for (let column = 0; column < xResolutionGLOBAL+buffer; column++) {
            myLocalArray[row][column] = Math.random();
        }
    }
    return myLocalArray;
}
function makeArray(rows, columns) {
    let myArray = new Array(rows);
    for (let i = 0; i < rows; i++) {
        myArray[i] = new Array(columns);
    }
    return myArray;
}
function processNoiseArray(processMe, power=1.2) {
    myProcessedArray = makeArray(yResolutionGLOBAL, xResolutionGLOBAL);
    for (let row = 1; row < processMe.length - 1; row++) {
        for (let column = 1; column < processMe[0].length - 1; column++) {
                myProcessedArray[row - 1][column - 1] = Math.round(Math.pow((processMe[row + 1][column] + processMe[row - 1][column] + processMe[row][column + 1] + processMe[row][column - 1] + processMe[row][column]) / 5, power));
        }   
    }
    return myProcessedArray;
}
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



let myRandomArray = randomArray(2); //Successfully produces a field of length/width globalResolutionX/Y, with a buffe of 2 columns and rows
console.log("The RandomArray: ");
console.log(myRandomArray);
myRandomArray = processNoiseArray(myRandomArray,1.4); //Returns an array 2 rows and columns smaller (hence buffer), blurring the input array and raising it to a power
console.log("The randomArray after processing: ")
console.log(myRandomArray); 
displayGrid(xResolutionGLOBAL, yResolutionGLOBAL, myRandomArray); //SUCCESS
displaySquareMarch(heightField);


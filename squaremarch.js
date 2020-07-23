var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
console.log(canvas);


let girdScaleDivider = 10;
let xResolutionGLOBAL = canvas.width / (girdScaleDivider * 2);
let yResolutionGLOBAL = canvas.height / (girdScaleDivider * 2);



function displayGrid(xResolution, yResolution) {
    for (var xi = 0; xi < xResolution; xi++) {
        for (var yi = 0; yi < yResolution; yi++) {
            drawCircle(xi * girdScaleDivider*2, yi * girdScaleDivider*2, girdScaleDivider-3);
            console.log("Stinky")
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
function drawCircle(centerX, centerY, radius = 5) {
    c.beginPath();
    c.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    c.stroke();
}


displayGrid(xResolutionGLOBAL, yResolutionGLOBAL);
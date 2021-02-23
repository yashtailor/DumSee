function drawFromStream(message) {
    if(!message) return;        

    ctx.beginPath();
    drawOnCanvas(message.plots);
}
  var canvas = document.getElementById('drawCanvas');
  var ctx = canvas.getContext('2d');

  ctx.lineWidth = '2';
  
canvas.addEventListener('mousedown', startDraw, false);
canvas.addEventListener('mousemove', draw, false);
canvas.addEventListener('mouseup', endDraw, false);

var isActive = false;

// array to collect coordinates
var plots = [];

function draw(e) {
  if(!isActive) return;

  // cross-browser canvas coordinates
  var x = e.offsetX || e.layerX - canvas.offsetLeft;
  var y = e.offsetY || e.layerY - canvas.offsetTop;
  plots.push({'x': x, 'y': y});

  drawOnCanvas(plots);
}


function drawOnCanvas(plots) {
  // console.log('plots',plots)
  if(plots.length == 0)return;
  ctx.beginPath();
  ctx.moveTo(plots[0].x, plots[0].y);

  for(var i=1; i<plots.length; i++) {
    ctx.lineTo(plots[i].x, plots[i].y);
  }
  ctx.stroke();
}


function startDraw(e) {
  isActive = true;
}

function endDraw(e) {
if(plots == [])return;
  isActive = false;
  pubnub.publish({
    channel: 'draw',
    message: { 
        plots: plots // your array goes here
    } 
})
  // empty the array
  plots = [];

}
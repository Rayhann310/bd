// ===== Carousel Configuration =====
var radius = 180;
var autoRotate = true;
var rotateSpeed = -60;
var imgWidth = 140;
var imgHeight = 190;

// ===== Elements =====
var odrag = document.getElementById('drag-container');
var ospin = document.getElementById('spin-container');
var aEle = [...ospin.getElementsByTagName('img'), ...ospin.getElementsByTagName('video')];

// Size setup
ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";
var ground = document.getElementById('ground');

function init(delayTime) {
  for (var i = 0; i < aEle.length; i++) {
    aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
    aEle[i].style.transition = "transform 0.5s ease-out";
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
  }
}

// Initial setup
setTimeout(init, 1000);

// ===== Interaction Logic =====
var nX, nY, sX, sY, desX = 0, desY = 0, tX = 0, tY = 10;
var initialPinchDist = null;
var zoomTarget = radius;

function applyTranform(obj) {
  if (tY > 180) tY = 180;
  if (tY < 0) tY = 0;
  obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + tX + "deg)";
}

function playSpin(yes) {
  ospin.style.animationPlayState = yes ? 'running' : 'paused';
}

if (autoRotate) {
  var animationName = rotateSpeed > 0 ? 'spin' : 'spinRevert';
  ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}

// Global Pointer Events (Handles Mouse & Touch)
document.onpointerdown = function(e) {
  clearInterval(odrag.timer);
  sX = e.clientX;
  sY = e.clientY;
  playSpin(false);

  this.onpointermove = function(e) {
    // Handle Drag (Single Touch/Mouse)
    nX = e.clientX;
    nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.15;
    tY += desY * 0.15;
    applyTranform(ospin);
    sX = nX;
    sY = nY;
  };

  this.onpointerup = function() {
    odrag.timer = setInterval(function() {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.1;
      tY += desY * 0.1;
      applyTranform(ospin);
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(odrag.timer);
        playSpin(true);
      }
    }, 17);
    this.onpointermove = this.onpointerup = null;
  };
};

// Zoom Logic
function handleZoom(delta) {
  zoomTarget += delta;
  if (zoomTarget < 120) zoomTarget = 120;
  if (zoomTarget > 700) zoomTarget = 700;
  radius = radius + (zoomTarget - radius) * 0.1;
  ground.style.width = radius * 3 + "px";
  ground.style.height = radius * 3 + "px";
  init(0.05);
}

// Mouse Wheel Zoom
window.addEventListener('wheel', function(e) {
  handleZoom(e.deltaY * -0.5);
}, { passive: false });

// Touch Pinch Zoom
document.addEventListener('touchmove', function(e) {
  if (e.touches.length === 2) {
    var dist = Math.hypot(
      e.touches[0].pageX - e.touches[1].pageX,
      e.touches[0].pageY - e.touches[1].pageY
    );
    if (initialPinchDist === null) {
      initialPinchDist = dist;
    } else {
      handleZoom((dist - initialPinchDist) * 0.6);
      initialPinchDist = dist;
    }
  }
}, { passive: false });

document.addEventListener('touchend', function() {
  initialPinchDist = null;
});
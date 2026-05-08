// ===== Carousel Configuration =====
var radius = 300;
var autoRotate = true;
var rotateSpeed = -60;
var imgWidth = 140;
var imgHeight = 190;

var bgMusicURL = null; // Music handled separately
var bgMusicControls = false;

// ===== Init Carousel =====
setTimeout(init, 1000);

var odrag = document.getElementById('drag-container');
var ospin = document.getElementById('spin-container');
var aImg = ospin.getElementsByTagName('img');
var aVid = ospin.getElementsByTagName('video');
var aEle = [...aImg, ...aVid];

ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";

var ground = document.getElementById('ground');
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";

function init(delayTime) {
  for (var i = 0; i < aEle.length; i++) {
    aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
    aEle[i].style.transition = "transform 0.5s ease-out";
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
    aEle[i].style.willChange = "transform";
  }
}

function applyTranform(obj) {
  if (tY > 180) tY = 180;
  if (tY < 0) tY = 0;
  obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + tX + "deg)";
  obj.style.transition = "transform 0.1s ease-out";
}

function playSpin(yes) {
  ospin.style.animationPlayState = yes ? 'running' : 'paused';
}

var desX = 0, desY = 0, tX = 0, tY = 10;

if (autoRotate) {
  var animationName = rotateSpeed > 0 ? 'spin' : 'spinRevert';
  ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}

// ===== Drag to Rotate =====
document.onpointerdown = function(e) {
  clearInterval(odrag.timer);
  e = e || window.event;
  var sX = e.clientX, sY = e.clientY;

  this.onpointermove = function(e) {
    e = e || window.event;
    var nX = e.clientX, nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1;
    tY += desY * 0.1;
    applyTranform(odrag);
    sX = nX;
    sY = nY;
  };

  this.onpointerup = function() {
    odrag.timer = setInterval(function() {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.1;
      tY += desY * 0.1;
      applyTranform(odrag);
      playSpin(false);
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(odrag.timer);
        playSpin(true);
      }
    }, 17);
    this.onpointermove = this.onpointerup = null;
  };

  return false;
};

// ===== Zoom (Mouse Wheel + Pinch) =====
var initialPinchDistance = null;
var zoomTarget = radius;

function handleZoom(delta) {
  zoomTarget += delta;
  if (zoomTarget < 150) zoomTarget = 150;
  if (zoomTarget > 800) zoomTarget = 800;
  radius = radius + (zoomTarget - radius) * 0.2;
  ground.style.width = radius * 3 + "px";
  ground.style.height = radius * 3 + "px";
  init(0.05);
}

window.addEventListener('wheel', function(e) {
  handleZoom(e.deltaY * -0.5);
}, { passive: false });

document.addEventListener('touchmove', function(e) {
  if (e.touches.length === 2) {
    var dist = Math.hypot(
      e.touches[0].pageX - e.touches[1].pageX,
      e.touches[0].pageY - e.touches[1].pageY
    );
    if (initialPinchDistance === null) {
      initialPinchDistance = dist;
    } else {
      handleZoom((dist - initialPinchDistance) * 0.5);
      initialPinchDistance = dist;
    }
  }
}, { passive: false });

document.addEventListener('touchend', function(e) {
  if (e.touches.length < 2) initialPinchDistance = null;
});
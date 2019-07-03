function Chronometer (){
  this.currentTime = 0;
  this.intervalId = 0;
  this.minutes =0;
  this.seconds =0;
  this.minString = ''
  this.secString = ''
  this.startClick = function () {
    this.intervalId = setInterval(()  => {
      this.currentTime++;
      printTime();
      console.log(this.currentTime);
    }, 1000);
  },
  this.setMinutes = function () {
    this.minutes = Math.floor(this.currentTime / 60);
    console.log(this.minutes)
    return this.minutes
  },
  this.setSeconds = function () {
    return this.seconds = this.currentTime % 60;
  },
  this.twoDigitsNumber = function (number) {
    if(number < 10){
      number =  '0' + number;
      return number.toString();
    } else {
      // number = ' ' + number
      return number.toString();
    }
  },
  this.setTime = function () {
    this.minString = this.twoDigitsNumber(this.setMinutes())
    this.secString = this.twoDigitsNumber(this.setSeconds())
    console.log(this.minString, this.secString)
  },
  this.stopClick = function (){
    clearInterval(this.intervalId);
  },
  this.resetClick = function (){
    clearInterval(this.intervalId)
    this.currentTime = 0;
  }
}


var chronometer = new Chronometer();

var btnLeft     = document.getElementById('btnLeft');
var btnRight    = document.getElementById('btnRight');
var minDec      = document.getElementById('minDec');
var minUni      = document.getElementById('minUni');
var secDec      = document.getElementById('secDec');
var secUni      = document.getElementById('secUni');
var milDec      = document.getElementById('milDec');
var milUni      = document.getElementById('milUni');



function printTime() {
  printSeconds();
  printMinutes();
}
console.log(printTime())

function printMinutes() {
  chronometer.setTime()
  minDec.innerHTML = chronometer.minString[0];
  minUni.innerHTML = chronometer.minString[1]
}


function printSeconds() {
  chronometer.setTime()
  let secString = chronometer.twoDigitsNumber(chronometer.setSeconds())
  secDec.innerHTML = chronometer.secString[0];
  secUni.innerHTML = chronometer.secString[1];
}

function printMilliseconds() {
  let milString = chronometer.twoDigitsNumber(chronometer)
}



function printSplit() {
  let oList = document.querySelector("#splits")
  let newLine = document.createElement('li');
  oList.appendChild(newLine);
  newLine.innerHTML = (minDec.innerHTML + minUni.innerHTML + ":" + secDec.innerHTML + secUni.innerHTML).toString();
}

function clearSplits() {
  let orderedList = document.querySelector("#splits");
  let listCollection = document.querySelectorAll("li");
  let listArray = Array.from(listCollection);
  listCollection.forEach(function(el){
    orderedList.removeChild(el);
  });
}

function setStopBtn() {
  document.getElementById('btnRight').addEventListener('click', stopClick);
}

function setSplitBtn() {
  let newLine = document.createElement('li');
  oList.appendChild(newLine)
  newLine.innerHTML = (minDec.innerHTML + minUni.innerHTML + ":" + secDec.innerHTML + secUni.innerHTML).toString();
}

function setStartBtn() {
  let startButton = document.getElementById('btnLeft').addEventListener('click', startClick )
  
  startButton.addEventListener('click', printTime);
}

function setResetBtn() {
  chronometer.resetClick();
  minDec.innerHTML = "0";
  minUni.innerHTML = "0";
  secDec.innerHTML = "0";
  secUni.innerHTML = "0";
}

// Start/Stop Button
btnLeft.addEventListener('click', function () {

    btnLeft.classList.toggle('stop');
    if (btnLeft.innerHTML === 'STOP') {
      btnLeft.innerHTML = 'START';
      btnRight.innerHTML = 'RESET';
      chronometer.stopClick();
    } else {
      btnLeft.innerHTML = 'STOP';
      btnRight.innerHTML = 'SPLIT';
      chronometer.startClick();
    }
  });

// Reset/Split Button
btnRight.addEventListener('click', function () {
  if (btnRight.innerHTML === 'RESET') {
    clearSplits();
    setResetBtn();
  }else {
    printSplit()
  }
});

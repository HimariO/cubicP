const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const fs = require('fs')


var AudioContext = AudioContext || webkitAudioContext
var context = new AudioContext()
var myAudio = document.createElement('audio');

myAudio.src = './file.mp3'

var analyser = context.createAnalyser();
console.log(myAudio)

myAudio.oncanplaythrough = ()=>{
  var source = context.createMediaElementSource(myAudio);
  source.connect(analyser);
  analyser.connect(context.destination);       // connect the source to the context's destination (the speakers)
  myAudio.play()
}

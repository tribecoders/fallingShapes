/* global PIXI */

import Game from './game.js'

const app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor : 0x00cc00});
document.body.appendChild(app.view);

let currentTime = 0;
const game = new Game(app.stage);
app.ticker.add(function(delta) {
  currentTime += delta;

  if (currentTime >= 30) {
    currentTime = 0;
    game.mainLoop();
  }
});

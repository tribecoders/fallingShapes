/* global PIXI */

import Game from './game.js'

const app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor : 0x00cc00});
document.body.appendChild(app.view);

const game = new Game(app.stage);

let mainLoop = (delta) => {
  game.mainLoop(delta);
};

//app.ticker.stop();
app.ticker.stop();
app.ticker.add(mainLoop);

window.addEventListener(Game.GAME_EVENTS.gameStart, () => {
  app.ticker.start();
});

window.addEventListener(Game.GAME_EVENTS.gameEnd, () => {
  app.ticker.stop();
});



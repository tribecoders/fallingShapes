/* global PIXI */

import Game from './game.js'

const app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor : 0x00cc00});
document.body.appendChild(app.view);

const game = new Game(app.stage);

let mainLoop = (delta) => {
  game.mainLoop(delta);
};

app.ticker.add(mainLoop);

window.addEventListener(Game.GAME_EVENTS.gameStart, () => {
  game.reset();
  game.goMainGame();
});

window.addEventListener(Game.GAME_EVENTS.gameEnd, () => {
  game.goResults();
});



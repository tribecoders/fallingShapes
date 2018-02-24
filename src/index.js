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
  game.state = Game.GAME_STATES.main;
  game.initialScreen.hide();
  //game.scoreScreen.hide();
});

window.addEventListener(Game.GAME_EVENTS.gameEnd, () => {
  console.log('stop_event');
  game.mainScreen.hide();
});



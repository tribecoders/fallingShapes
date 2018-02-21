
/* global PIXI */


import Game from './game.js'


const app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor : 0x00cc00});
document.body.appendChild(app.view);



/*let test = new Test();
app.stage.addChild(background);
app.stage.addChild(test.presentation);
let test2 = new Test();
test2.presentation.x = 100;
app.stage.addChild(test2.presentation);*/




const game = new Game();
app.ticker.add(function() {
  game.display(app.stage);
  game.mainLoop();
});

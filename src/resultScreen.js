/* global PIXI */

class ResultScreen {

  constructor(container) {
    this.container = container;

    this.bestScores = new PIXI.Text('Best Results', {
      fill: '#ffffff'
    });
    this.bestScores.anchor.set(0.5, 0.5);
    this.bestScores.x = window.innerWidth/2;
    this.bestScores.y = 100;

    this.playAgain = new PIXI.Text('Press up to play again...', {
      fill: '#ffffff'
    });
    this.playAgain.anchor.set(0.5, 0.5);
    this.playAgain.x = window.innerWidth/2;
  }

  display(bestResults, playerScore) {
    this.container.addChild(this.bestScores);
    let i;
    const resultsLength = bestResults.length;
    for (i = 0; i <= resultsLength - 1 ; i++) {
      let score = new PIXI.Text(bestResults[i], {
        fill: '#ffffff'
      });
      score.anchor.set(0.5, 0.5);
      score.x = window.innerWidth / 2;
      score.y = 140 + 40 * i;
      this.container.addChild(score);

      let currentScore = new PIXI.Text('Your current score is: ' + (playerScore - 1), {
        fill: '#ffffff'
      });
      currentScore.anchor.set(0.5, 0.5);
      currentScore.x = window.innerWidth/2;
      currentScore.y = 100 + 40 * (resultsLength + 1);
      this.container.addChild(currentScore);

      this.playAgain.y = 100 + 40 * (resultsLength + 2);
      this.container.addChild(this.playAgain);
    }
  }

  hide() {
    for (let i  = this.container.children.length - 1; i >= 0; i--) {
      this.container.removeChild(this.container.children[i]);
    }
  }
}

export default ResultScreen;
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
  }

  display(bestResults) {
    this.container.addChild(this.bestScores);
    let i;
    const resultsLength = bestResults.length - 1;
    for (i = 0; i <= resultsLength; i++) {
      let score = new PIXI.Text(bestResults[i], {
        fill: '#ffffff'
      }) ;
      score.anchor.set(0.5, 0.5);
      score.x = window.innerWidth/2;
      score.y = 140 + 40*i;
      this.container.addChild(score);
    }
  }

  hide() {
    for (let i  = this.container.children.length - 1; i >= 0; i--) {
      this.container.removeChild(this.container.children[i]);
    }
  }
}

export default ResultScreen;
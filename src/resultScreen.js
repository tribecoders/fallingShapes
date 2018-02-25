/* global PIXI */

class ResultScreen {

  constructor(container) {
    this.container = container;

    this.results = new PIXI.Text('Best Results', {
      fill: '#ffffff'
    });
    this.results.anchor.set(0.5, 0.5);
    this.results.x = window.innerWidth/2;
    this.results.y = 100;
  }

  display() {
    this.container.addChild(this.results);
  }

  hide() {
    for (let i  = this.container.children.length - 1; i >= 0; i--) {
      this.container.removeChild(this.container.children[i]);
    }
  }
}

export default ResultScreen;
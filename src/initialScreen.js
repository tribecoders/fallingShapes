/* global PIXI */

class InitialScreen {

  constructor(container) {
    this.container = container;

    this.titleText = new PIXI.Text('Falling Shapes', {
      fontFamily: 'Arial',
      fontSize: 36,
      fontStyle: 'italic',
      fontWeight: 'bold',
      fill: ['#ffffff', '#00ff99'], // gradient
      stroke: '#4a1850',
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6
    });
    this.titleText.anchor.set(0.5, 0.5);
    this.titleText.x = window.innerWidth/2;
    this.titleText.y = window.innerHeight/2;

    this.pressStart = new PIXI.Text('Press up to begin ...', {
      fill: '#ffffff'
    });
    this.pressStart.anchor.set(0.5, 0.5);
    this.pressStart.x = window.innerWidth/2;
    this.pressStart.y = window.innerHeight/2 + 40;
  }

  display() {
    this.container.addChild(this.titleText);
    this.container.addChild(this.pressStart);
  }

  hide() {
    for (let i  = this.container.children.length - 1; i >= 0; i--) {
      this.container.removeChild(this.container.children[i]);
    }
  }
}

export default InitialScreen;
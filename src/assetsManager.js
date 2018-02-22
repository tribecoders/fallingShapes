/* global PIXI */

class AssetManager {

  constructor() {
    this.background = PIXI.Texture.fromImage('assets/images/background.png');
    this.singlesBlocks = [];
    this.singlesBlocks['blue'] = PIXI.Texture.fromImage('assets/images/block_blue.png');
    this.singlesBlocks['cyan'] = PIXI.Texture.fromImage('assets/images/block_cyan.png');
    this.singlesBlocks['green'] = PIXI.Texture.fromImage('assets/images/block_green.png');
    this.singlesBlocks['orange'] = PIXI.Texture.fromImage('assets/images/block_orange.png');
    this.singlesBlocks['purple'] = PIXI.Texture.fromImage('assets/images/block_purple.png');
    this.singlesBlocks['red'] = PIXI.Texture.fromImage('assets/images/block_red.png');
    this.singlesBlocks['yellow'] = PIXI.Texture.fromImage('assets/images/block_yellow.png');
  }
}

export default AssetManager;
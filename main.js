import TitleScene from './scenes/titleScene.js';
import OverworldScene from './scenes/overworldScene.js';
import HomeScene from './scenes/homeScene.js';
import LibraryScene from './scenes/libraryScene.js';
import CoffeeShopScene from './scenes/coffeeshopScene.js';
import HomeInteractScene from './scenes/homeInteractScene.js';
import LibraryInteractScene from './scenes/libraryInteractScene.js';
import CoffeeshopInteractScene from './scenes/coffeeshopInteractScene.js';
import SkeevSkuzScene from './scenes/skeevSkuzScene.js';
import ThriftShopScene from './scenes/thriftshopScene.js';
import ThriftShopInteractScene from './scenes/thriftshopInteractScene.js';
import GameOverScene from './scenes/gameOver.js';
import EndGameScene from './scenes/endGame.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    pixelArt: true,
    physics: { default: 'arcade' },
    scene: [TitleScene, OverworldScene, HomeScene, LibraryScene, 
            CoffeeShopScene, HomeInteractScene, LibraryInteractScene,
            CoffeeshopInteractScene, SkeevSkuzScene, ThriftShopScene, ThriftShopInteractScene,
            GameOverScene, EndGameScene],
};

new Phaser.Game(config);
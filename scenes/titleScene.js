import {toggleMusic} from "./functions.js";

export default class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'titleScene', active: true });
    }

    preload() {
        this.load.image('bg', 'assets/images/background.png');
        this.load.spritesheet('coffeecup', 'assets/tileset.png', { frameWidth: 16, frameHeight: 16 });
        this.load.audio('titleMusic', 'assets/songs/title_loop.ogg');
    }

    create() {
        this.bg = this.add.image(400, 300, 'bg');
        this.coffeecup = this.add.sprite(700, 300, 'coffeecup', 3).setScale(15);
        this.loop = this.sound.add('titleMusic', { loop: true, volume: 0.5 });

        let title = this.add.text(300, 300, 'CAN WE COFFEE??', { fontFamily: 'myFont', fontSize: '32px', color: '#ffffff' }).setOrigin(0.5);
        this.add.text(300, 400, 'Press E to Play / Perform Actions', { fontFamily: 'myFont', fontSize: '16px', color: '#ffffff' }).setOrigin(0.5);
        this.add.text(300, 450, 'W A S D to move', { fontFamily: 'myFont', fontSize: '16px', color: '#ffffff' }).setOrigin(0.5);
        this.add.text(300, 500, 'Press Q to toggle music', { fontFamily: 'myFont', fontSize: '16px', color: '#ffffff' }).setOrigin(0.5);

        this.tweens.add({
            targets: title,
            scaleX: 1.1,
            scaleY: 1.1,
            yoyo: true,
            repeat: -1,
            duration: 800
        });
        
        this.eKey = this.input.keyboard.addKey('E');
        this.qKey = this.input.keyboard.addKey('Q');
        
        this.eKey.on('down', () => this.scene.start('homeScene'));
        this.qKey.on('down', () => toggleMusic(this, 0.5));

        this.events.on("shutdown", () => {
            if (this.loop.isPlaying) {
                this.loop.stop();
            }
        });
    }
}
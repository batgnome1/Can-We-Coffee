import ui from './ui.js';
import {toggleMusic, driving} from "./functions.js";
import { persistentBattery } from './persistent.js';

export default class OverworldScene extends Phaser.Scene {
    constructor() {
        super({ key: 'overworldScene', active: false });
    }

    preload() {
        this.load.image('tiles', 'assets/tileset/city.png');
        this.load.image('cafesign', 'assets/images/cafe_sign.png');
        this.load.image('librarysign', 'assets/images/library_sign.png');
        this.load.image('thriftsign', 'assets/images/thriftshop_sign.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemap/overworld.json');
        this.load.spritesheet('player', 'assets/sprite/player.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('avatar', 'assets/sprite/avatar.png', { frameWidth: 32, frameHeight: 32});
        this.load.audio('overworldTheme', 'assets/songs/overworld_theme.ogg');
    }

    create(data) {

        this.mymap = this.make.tilemap({ key: 'map' });
        
        let mytileset = this.mymap.addTilesetImage('overworld', 'tiles');
        

        let secretLayer = this.mymap.createLayer('secret_layer', mytileset, 0, 0);
        let belowLayer = this.mymap.createLayer('below_layer', mytileset, 0, 0);
        let worldLayer = this.mymap.createLayer('world_layer', mytileset, 0, 0);
        let aboveLayer = this.mymap.createLayer('above_layer', mytileset, 0, 0);
        
        this.loop = this.sound.add('overworldTheme');
        this.loop.play({loop: true, volume: 0.1});

        this.ui = new ui(this);
        let x = data.x;
        let y = data.y;
        
        this.player = this.physics.add.sprite(x, y, 'player').setFrame(5);
        this.player.setCollideWorldBounds(true);

        this.add.image(3583, 3406, 'cafesign' );
        this.add.image(3423, 3406, 'librarysign');
        this.add.image(3583, 3515, 'thriftsign');

        this.physics.world.setBounds(0, 0, this.mymap.widthInPixels, this.mymap.heightInPixels - 100);
        console.log(this.mymap.widthInPixels, this.mymap.heightInPixels);

        let mycamera = this.cameras.main;
        mycamera.startFollow( this.player );
    
        mycamera.setBounds( 0, 0, this.mymap.widthInPixels, this.mymap.heightInPixels ); 


        belowLayer.setCollisionByProperty({Collides: true});
        this.physics.add.collider(this.player, belowLayer)

        secretLayer.setCollisionByProperty({ enter_library: true, enter_cafe: true, enter_thrift: true });
        this.physics.add.collider( this.player, secretLayer, (player, tile) =>
        {
            if (tile.properties.enter_library)
                    {
                        this.scene.start('libraryScene');
                    }
            else if (tile.properties.enter_cafe)
                    {
                        this.scene.start('coffeeshopScene');
                    }
            else if (tile.properties.enter_thrift)
                    {
                        this.scene.start('thriftshopScene');
                    }
        } 
            );

        this.qKey = this.input.keyboard.addKey('Q');
        this.qKey.on('down', () => toggleMusic(this, 0.1));
        this.events.on("shutdown", () => {
            if (this.loop.isPlaying) {
                this.loop.stop();
            }
        });


    }

    update() {

        driving(this);
        if (persistentBattery.batteryLevel <= 0 && !this.sceneSwitched) {
            this.sceneSwitched = true;
            this.scene.start('endGame');
        }
        console.log(this.player.x, this.player.y);

    }

}
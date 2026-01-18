import {toggleMusic, walking} from "./functions.js";
export default class ThriftShopScene extends Phaser.Scene
    {
        constructor() 
            {
                super({key: 'thriftshopScene', active: false});
            }

            preload()
            {
                this.load.image('thrift_tiles', 'assets/tileset/home.png');
                this.load.tilemapTiledJSON('thrift_map', 'assets/tilemap/thriftshop.json');
                this.load.spritesheet('character', 'assets/sprite/character.png', { frameWidth: 16, frameHeight: 17 });
                this.load.spritesheet('thrifty', 'assets/sprite/thrifty.png', { frameWidth: 16, frameHeight: 17 });
                this.load.audio('thriftTheme', 'assets/songs/thrift_theme.ogg');
            }
        
        create()
            {
                let x, y;
                this.mymap = this.make.tilemap({ key: 'thrift_map' });
                let mytileset = this.mymap.addTilesetImage('thriftshop', 'thrift_tiles');
                
                let belowLayer = this.mymap.createLayer('below_layer', mytileset, 0, 0);
                let worldLayer = this.mymap.createLayer('world_layer', mytileset, 0, 0);
                let aboveLayer = this.mymap.createLayer('above_layer', mytileset, 0, 0);
                let secretLayer = this.mymap.createLayer('secret_layer', mytileset, 0, 0);
    
                belowLayer.setScale(2);
                worldLayer.setScale(2);
                aboveLayer.setScale(2);
                secretLayer.setScale(2);
    
                                this.loop = this.sound.add('thriftTheme');
                                this.loop.play({loop: true, volume: 0.2});
                                this.qKey = this.input.keyboard.addKey('Q');
                                this.qKey.on('down', () => toggleMusic(this, 0.2));
                                    this.events.on("shutdown", () => {
                                        if (this.loop.isPlaying) {
                                                this.loop.stop();
                                                }
                                        });
                
                this.character = this.physics.add.sprite(431, 251, 'character').setFrame(2);
                this.character.setScale(2.5);
                this.character.setCollideWorldBounds(true);
                this.physics.add.collider(this.character, belowLayer);
                this.physics.add.collider(this.character, worldLayer);
                this.physics.add.collider(this.character, aboveLayer);
    
                this.thrifty = this.physics.add.sprite(678, 293, 'thrifty').setFrame(0);
                this.thrifty.setScale(2.5);
                this.thrifty.setCollideWorldBounds(true);
    
                let mycamera = this.cameras.main;
                mycamera.startFollow( this.character );
    
                this.anims.create({
                    key: 'walkUp',
                    frames: this.anims.generateFrameNumbers('character', {frames: [ 2, 6, 10 ] }),
                    frameRate: 5,
                    repeat: -1
                });
    
                this.anims.create({
                    key: 'walkDown',
                    frames: this.anims.generateFrameNumbers('character', {frames: [ 0, 4, 8 ] }),
                    frameRate: 5,
                    repeat: -1
                });
    
                this.anims.create({
                    key: 'walkLeft',
                    frames: this.anims.generateFrameNumbers('character', {frames: [ 3, 7, 11 ] }),
                    frameRate: 5,
                    repeat: -1
                });
    
                this.anims.create({
                    key: 'walkRight',
                    frames: this.anims.generateFrameNumbers('character', {frames: [ 1, 5, 9 ] }),
                    frameRate: 5,
                    repeat: -1
                });
                
                secretLayer.setCollisionByProperty({ overlap: true, exit: true });
    
                this.physics.add.overlap(this.character, secretLayer, (player, tile) => {
                    if (tile.properties.overlap) {
                        this.scene.start('thriftshopInteractScene');
                    }
                    else if (tile.properties.exit)
                    {
                        this.scene.start('overworldScene', {x: 918, y: 4307});
                    }
                });
    
            }
    
        update()
            {
                walking(this);
                
            }


    }


import {toggleMusic, walking} from "./functions.js";
import {barista} from "./barista.js";

export default class CoffeeShopScene extends Phaser.Scene
    {
        constructor() 
            {
                super({key: 'coffeeshopScene', active: false});
                this.walk = 50;
            }
    

    preload()
        {
            this.load.image('cafe_tiles', 'assets/tileset/home.png');
            this.load.tilemapTiledJSON('cafe_map', 'assets/tilemap/cafe.json');
            this.load.spritesheet('barista', 'assets/sprite/barista.png', { frameWidth: 16, frameHeight: 17 });
            this.load.spritesheet('character', 'assets/sprite/character.png', { frameWidth: 16, frameHeight: 17 });
            this.load.audio('cafeTheme', 'assets/songs/cafe_theme.ogg');

        }
    
    create()
        {
            let x, y;
            this.mymap = this.make.tilemap({ key: 'cafe_map' });
            let mytileset = this.mymap.addTilesetImage('cafe', 'cafe_tiles');
            
            let belowLayer = this.mymap.createLayer('below_layer', mytileset, 0, 0);
            let worldLayer = this.mymap.createLayer('world_layer', mytileset, 0, 0);
            let aboveLayer = this.mymap.createLayer('above_layer', mytileset, 0, 0);
            let secretLayer = this.mymap.createLayer('secret_layer', mytileset, 0, 0);

            belowLayer.setScale(2);
            worldLayer.setScale(2);
            aboveLayer.setScale(2);
            secretLayer.setScale(2);

                            this.loop = this.sound.add('cafeTheme');
                            this.loop.play({loop: true, volume: 0.2});
                            this.qKey = this.input.keyboard.addKey('Q');
                            this.qKey.on('down', () => toggleMusic(this, 0.2));
                                this.events.on("shutdown", () => {
                                    if (this.loop.isPlaying) {
                                            this.loop.stop();
                                            }
                                    });
            
            this.character = this.physics.add.sprite(350, 400, 'character').setFrame(2);
            this.character.setScale(2.5);
            this.physics.add.collider(this.character, belowLayer);
            this.physics.add.collider(this.character, worldLayer);

            this.barista = this.physics.add.sprite(300, 230, 'barista').setFrame(0);
            this.barista.setScale(2.5);
            this.barista.setCollideWorldBounds(true);
            belowLayer.setCollisionByProperty({ collides: true });
            this.physics.add.collider(this.barista, belowLayer);
            worldLayer.setCollisionByProperty({ collides: true });
            this.physics.add.collider(this.barista, worldLayer);

            //this.physics.world.setBounds(0, 0, this.mymap.widthInPixels, this.mymap.heightInPixels);
            this.physics.world.setBounds(208, 128, 224, 176);
            
               // this.character.setCollideWorldBounds(true);

               switch ( Phaser.Math.Between(1, 2) ) {
                case 1:
                  this.barista.custom_state = 'walk';
                  break;
                case 2:
                  this.barista.custom_state = 'idle';
                  break;
              }

              this.barista.custom_state_timer = 0;

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
                frames: this.anims.generateFrameNumbers('barista', {frames: [ 1, 5, 9 ] }),
                frameRate: 5,
                repeat: -1
            });

            this.anims.create({
                key: 'baristaWalkUp',
                frames: this.anims.generateFrameNumbers('barista', {frames: [ 2, 6, 10 ] }),
                frameRate: 5,
                repeat: -1
            });

            this.anims.create({
                key: 'baristaWalkDown',
                frames: this.anims.generateFrameNumbers('barista', {frames: [ 0, 4, 8 ] }),
                frameRate: 5,
                repeat: -1
            });

            this.anims.create({
                key: 'baristaWalkLeft',
                frames: this.anims.generateFrameNumbers('barista', {frames: [ 3, 7, 11 ] }),
                frameRate: 5,
                repeat: -1
            });

            this.anims.create({
                key: 'baristaWalkRight',
                frames: this.anims.generateFrameNumbers('barista', {frames: [ 1, 5, 9 ] }),
                frameRate: 5,
                repeat: -1
            });

           aboveLayer.setCollisionByProperty({ exit: true });
            this.physics.add.collider( this.character, aboveLayer, (player, tile) =>
            {
                if (tile.properties.exit)
                        {
                            this.scene.start('overworldScene', {x: 3876, y: 1486});
                        }
            } 
                ); 

                let interactTrigger = secretLayer.setCollisionByProperty({ overlap: true })

              /*  this.physics.add.overlap(this.character, interactTrigger, () => {
                    this.scene.start('coffeeshopInteractScene');
                }); */


                secretLayer.setCollisionByProperty({ overlap: true });

                this.physics.add.overlap(this.character, secretLayer, (player, tile) => {
                    if (tile.properties.overlap) {
                        this.scene.start('coffeeshopInteractScene');
                    }
                });

        }

    update()
        {
            walking(this);
            barista(this);
           // console.log(this.character.x, this.character.y);
        }

    }
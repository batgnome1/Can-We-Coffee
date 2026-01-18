import {toggleMusic, walking} from "./functions.js";
import {librarian} from "./librarian.js";

export default class LibraryScene extends Phaser.Scene
    {
        constructor() 
            {
                super({key: 'libraryScene', active: false});
                this.walk = 50;
                this.walkSlow = 25;
            }
        

        preload()
            {
                this.load.image('library_tiles', 'assets/tileset/home.png');
                this.load.tilemapTiledJSON('library_map', 'assets/tilemap/library.json');
                this.load.spritesheet('character', 'assets/sprite/character.png', { frameWidth: 16, frameHeight: 17 });
                this.load.spritesheet('librarian', 'assets/sprite/librarian.png', { frameWidth: 16, frameHeight: 17 });
                this.load.audio('libraryTheme', 'assets/songs/library_theme.ogg');
            }
    
        create()
            {
                let x, y;
                this.mymap = this.make.tilemap({ key: 'library_map' });
                let mytileset = this.mymap.addTilesetImage('library', 'library_tiles');

                let belowLayer =  this.mymap.createLayer('below_layer', mytileset, 0, 0);
                let worldLayer = this.mymap.createLayer('world_layer', mytileset, 0, 0);
                let aboveLayer = this.mymap.createLayer('above_layer', mytileset, 0, 0);

                belowLayer.setScale(2);
                worldLayer.setScale(2);
                aboveLayer.setScale(2);

                this.loop = this.sound.add('libraryTheme');
                this.loop.play({loop: true, volume: 0.2});
                this.qKey = this.input.keyboard.addKey('Q');
                this.qKey.on('down', () => toggleMusic(this, 0.2));
                    this.events.on("shutdown", () => {
                        if (this.loop.isPlaying) {
                                this.loop.stop();
                                }
                        });

                let character = this.character = this.physics.add.sprite(960, 1070, 'character').setFrame(2);
                this.character.setScale(2.5);

                switch ( Phaser.Math.Between(1, 4) ) {
                    case 1: // top left quad
                      x = Phaser.Math.Between(385, 890);
                      y = Phaser.Math.Between(185, 375);
                      break;
                    case 2: // top right quad
                      x = Phaser.Math.Between(1100, 1500);
                      y = Phaser.Math.Between(185, 375);
                      break;
                    case 3: // bottom left quad
                      x = Phaser.Math.Between(385, 890);
                      y = Phaser.Math.Between(600, 1080);
                      break;
                    case 4: // bottom right quad
                      x = Phaser.Math.Between(385, 890);
                      y = Phaser.Math.Between(600, 1080);
                      break;
                  } 

                this.librarian = this.physics.add.sprite(x, y, 'librarian').setFrame(0);
                this.librarian.setScale(2.5);
                this.librarian.setCollideWorldBounds(true);

                this.physics.world.setBounds(0, 0, this.mymap.widthInPixels, this.mymap.heightInPixels);
                console.log(this.mymap.widthInPixels, this.mymap.heightInPixels);
               // this.character.setCollideWorldBounds(true);
        
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

                this.anims.create({
                    key: 'librarianWalkUp',
                    frames: this.anims.generateFrameNumbers('librarian', {frames: [ 2, 6, 10 ] }),
                    frameRate: 5,
                    repeat: -1
                });

                this.anims.create({
                    key: 'librarianWalkDown',
                    frames: this.anims.generateFrameNumbers('librarian', {frames: [ 0, 4, 8 ] }),
                    frameRate: 5,
                    repeat: -1
                });

                this.anims.create({
                    key: 'librarianWalkLeft',
                    frames: this.anims.generateFrameNumbers('librarian', {frames: [ 3, 7, 11 ] }),
                    frameRate: 5,
                    repeat: -1
                });

                this.anims.create({
                    key: 'librarianWalkRight',
                    frames: this.anims.generateFrameNumbers('librarian', {frames: [ 1, 5, 9 ] }),
                    frameRate: 5,
                    repeat: -1
                });

                belowLayer.setCollisionByProperty({ collides: true });
                this.physics.add.collider(character, belowLayer);
                this.physics.add.collider(this.librarian, belowLayer);
                
                worldLayer.setCollisionByProperty({ collides: true });
                this.physics.add.collider(character, worldLayer);
                this.physics.add.collider(this.librarian, worldLayer);

                switch ( Phaser.Math.Between(1, 3) ) {
                    case 1:
                      this.librarian.custom_state = 'wander';
                      break;
                    case 2:
                      this.librarian.custom_state = 'meander';
                      break;
                    case 3:
                      this.librarian.custom_state = 'idle';
                      break;
                  }
                  console.log('Initial state:', this.librarian.custom_state);

                  this.librarian.custom_state_timer = 0;

                
                aboveLayer.setCollisionByProperty({ exit: true });
                this.physics.add.collider( this.character, aboveLayer, (player, tile) =>
                {
                    if (tile.properties.exit)
                            {
                                this.scene.start('overworldScene', {x: 2133, y: 2933});
                            }
                } 
                    );

                    this.physics.add.overlap(this.character, this.librarian, () => {
                        this.scene.start('libraryInteractScene');
                    });

            }


        update()
            {
                walking(this);
                librarian(this);
              //  console.log(`${this.character.x}, Y=${this.character.y}`);
            }
    }


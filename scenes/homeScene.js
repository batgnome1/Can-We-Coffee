
import {toggleMusic, walking} from "./functions.js";
import {cat} from "./cat.js"

export default class HomeScene extends Phaser.Scene
    {
        constructor() 
            {
                super({key: 'homeScene', active: false});
                this.catWalk = 70;
                this.zoomies = 170;
            }

            preload()
            {
                this.load.image('home_tiles', 'assets/tileset/home.png');
                this.load.image('letter', 'assets/images/letter.png');
                this.load.image('envelope', 'assets/images/envelope.png');
                this.load.tilemapTiledJSON('home_map', 'assets/tilemap/home.json');
                this.load.spritesheet('character', 'assets/sprite/character.png', { frameWidth: 16, frameHeight: 17 });
                this.load.spritesheet('cat', 'assets/sprite/cat.png', { frameWidth: 32, frameHeight: 32 });
                this.load.audio('homeTheme', 'assets/songs/home_theme.ogg');
            }



        create()
            {
                let x, y;
                this.mymap = this.make.tilemap({ key: 'home_map' });
                let mytileset = this.mymap.addTilesetImage('home', 'home_tiles');
                
                let belowLayer = this.mymap.createLayer('below_layer', mytileset, 0, 0);
                let worldLayer = this.mymap.createLayer('world_layer', mytileset, 0, 0);
                let aboveLayer = this.mymap.createLayer('above_layer', mytileset, 0, 0);

                belowLayer.setScale(2);
                worldLayer.setScale(2);
                aboveLayer.setScale(2);

                this.loop = this.sound.add('homeTheme');
                this.loop.play({loop: true, volume: 0.2});
                this.qKey = this.input.keyboard.addKey('Q');
                this.qKey.on('down', () => toggleMusic(this, 0.2));
                this.events.on("shutdown", () => {
                    if (this.loop.isPlaying) {
                        this.loop.stop();
                    }
                });

                let envelope = this.physics.add.image(384, 422, 'envelope');
                // envelope.setCollideWorldBounds(true);
                 envelope.setScale(0.75);

                let character = this.character = this.physics.add.sprite(400, 300, 'character').setFrame(0);
                this.character.setCollideWorldBounds(true);



                this.eKey = this.input.keyboard.addKey('E');

                this.physics.add.overlap(this.character, envelope, () => {
                   if (!this.letter)
                        {
                            this.letter = this.add.image(350, 350, 'letter');
                            this.skuzLetter = this.add.text(250, 250,
                                [
                                 'Hey Skeev',
                                 '',
                                 'Im bummed. Lets meet',
                                 '',
                                 'up today at 3. I',
                                 '',
                                 'dropped & broke my',
                                 '',
                                 'favorite sasquatch',
                                 '',
                                 'mug so I havent had',
                                 '',
                                 'any coffee. Im so',
                                 '',
                                 'depressed, I miss ',
                                 '',
                                 'my mug and drinking',
                                 '',
                                 'black, bold coffee!',
                                 '',
                                 ':( - Skuz ',
                                 '',
                                 '(Press "E" To Drop)'  
                                ], { fontFamily: 'myFont', fontSize: '10px', color: '#000000' }).setOrigin(0);
                                this.skuzLetter.setAngle(-5);
                             

                        } 
                    this.eKey.once('down', () => {
                        this.letter.destroy();
                        this.skuzLetter.destroy();

                        const popupContainer = this.add.container(0, 0);

                        let r1 = this.add.rectangle(165, 120, 300, 200, 0x000000);
                        r1.setStrokeStyle(1, 0xFFFFFF);
                        r1.setOrigin(0, 0);; 
                        let openingText = this.add.text(195, 135,
                            ['', 
                             'Poor Skuz.',
                             '',
                             'You Should Make Him',
                             '',
                             'Some Coffee! If',
                             '',
                             'Only You Knew How',
                             '',
                             'To Brew A Cup!',
                             '',
                             'Travel Around The',
                             '',
                             'City To Learn!'  
                            ], { fontFamily: 'myFont', fontSize: '12px', color: '#ffffff' }).setOrigin(0); 

                        popupContainer.add([r1, openingText]);

                        this.time.delayedCall(10000, () => {
                            popupContainer.destroy();
                            });
        
                    }); 
                });

                character.setScale(2.5);

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

                switch ( Phaser.Math.Between(1, 4) ) {
                    case 1: // top left quad
                      x = Phaser.Math.Between(180, 300);
                      y = Phaser.Math.Between(160, 240);
                      break;
                    case 2: // top right quad
                      x = Phaser.Math.Between(310, 450);
                      y = Phaser.Math.Between(160, 240);
                      break;
                    case 3: // bottom left quad
                      x = Phaser.Math.Between(180, 320);
                      y = Phaser.Math.Between(370, 460);
                      break;
                    case 4: // bottom right quad
                      x = Phaser.Math.Between(180, 320);
                      y = Phaser.Math.Between(370, 460);
                      break;
                  }
                  

                this.cat = this.physics.add.sprite(x, y, 'cat').setFrame(15);
                this.cat.body.setSize(20, 20);
                this.cat.body.setImmovable(true);
                this.cat.setCollideWorldBounds(true);

                this.anims.create({
                    key: 'catWalkUp',
                    frames: this.anims.generateFrameNumbers('cat', {start: 28, end: 30, first: 28 }),
                    frameRate: 5,
                    repeat: -1
                });

                this.anims.create({
                    key: 'catWalkDown',
                    frames: this.anims.generateFrameNumbers('cat', {start: 44, end: 46, first: 44 }),
                    frameRate: 5,
                    repeat: -1
                });

                this.anims.create({
                    key: 'catWalkLeft',
                    frames: this.anims.generateFrameNumbers('cat', {start: 60, end: 62, first: 60 }),
                    frameRate: 5,
                    repeat: -1
                });

                this.anims.create({
                    key: 'catWalkRight',
                    frames: this.anims.generateFrameNumbers('cat', {start: 12, end: 14, first: 12 }),
                    frameRate: 5,
                    repeat: -1
                });

                belowLayer.setCollisionByProperty({ collides: true });
                this.physics.add.collider(character, belowLayer);
                this.physics.add.collider(this.cat, belowLayer);

                worldLayer.setCollisionByProperty({ collides: true });
                this.physics.add.collider(character, worldLayer);
                this.physics.add.collider(this.cat, worldLayer)

               // this.physics.add.collider(character, this.cat);
                this.physics.add.collider(this.cat, aboveLayer)

                switch ( Phaser.Math.Between(1, 3) ) {
                    case 1:
                      this.cat.custom_state = 'wander';
                      break;
                    case 2:
                      this.cat.custom_state = 'zoomies';
                      break;
                    case 3:
                      this.cat.custom_state = 'nap';
                      break;
                  }
                  console.log('Initial cat state:', this.cat.custom_state);

                  this.cat.custom_state_timer = 0;
                
                aboveLayer.setCollisionByProperty({ exit: true });
                this.physics.add.overlap(this.character, this.cat, () => {
                    this.scene.start('homeInteractScene');
                });
                this.physics.add.collider( this.character, aboveLayer, (player, tile) =>
                {
                    if (tile.properties.exit)
                            {
                                this.scene.start('overworldScene', {x: 4048, y: 4048});
                            }
                } 
                    );
        
            }
    
        update()
            {
                walking(this);
                cat(this);    
                //console.log(this.character.x, this.character.y);
            }

        }

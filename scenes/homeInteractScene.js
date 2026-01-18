
export default class HomeInteractScene extends Phaser.Scene
    {
        constructor() 
            {
                super({key: 'homeInteractScene', active: false});

            }

            preload()
                {
                    this.load.spritesheet('avatar', 'assets/sprite/avatar.png', { frameWidth: 32, frameHeight: 32});
                    this.load.image('catAvatar', 'assets/sprite/cat_avatar3.png'); 
                    this.load.audio('dialogueTheme', 'assets/songs/dialogue.ogg');
                    this.load.audio('hungry', 'assets/sfx/cat_hungry.ogg');
                    this.load.audio('hiss', 'assets/sfx/cat_hiss.ogg');
                    this.load.audio('spit', 'assets/sfx/cat_spit.ogg');
                    this.load.audio('merr', 'assets/sfx/cat_merr.ogg');
                    this.load.audio('growl', 'assets/sfx/cat_growl.ogg');
                    this.load.audio('purr', 'assets/sfx/cat_purr.ogg');
                }

            create()
                {

                   let skeev = this.add.sprite(70, 100, 'avatar').setFrame(0);
                    skeev.setScale(5);
                   let pimple = this.add.image(700, 500, 'catAvatar');
                   pimple.setScale(0.5);

                  this.hungry = this.sound.add('hungry');
                  this.hiss = this.sound.add('hiss');
                  this.spit = this.sound.add('spit');
                  this.merr = this.sound.add('merr');
                  this.growl = this.sound.add('growl');
                  this.purr = this.sound.add('purr');

                   this.hungry.play({loop: true, volume: 0.2});
                    this.loop = this.sound.add('dialogueTheme');
                    this.loop.play({loop: true, volume: 0.2});
                    this.qKey = this.input.keyboard.addKey('Q');
                    this.qKey.on('down', () => toggleMusic(this, 0.2));
                        this.events.on("shutdown", () => {
                            if (this.loop.isPlaying) {
                                    this.loop.stop();
                                    }
                            });

                  let catMeow = this.add.text(500, 500, 'Meow', { fontFamily: 'myFont', fontSize: '20px', color: '#ffffff' }).setOrigin(0.5);
                  this.add.text(700, 575, 'Pimple', { fontFamily: 'myFont', fontSize: '16px', color: '#ffffff' }).setOrigin(0.5);
                  let skeevTalk = this.add.text(460, 125, 'What do you want?', { fontFamily: 'myFont', fontSize: '20px', color: '#ffffff' }).setOrigin(0.5);
                  let pets = this.add.text(360, 225, '1. Pets', { fontFamily: 'myFont', fontSize: '16px', color: '#ffffff' }).setOrigin(0.5);
                  let food = this.add.text(560, 225, '2. Food', { fontFamily: 'myFont', fontSize: '16px', color: '#ffffff' }).setOrigin(0.5);
                  this.add.text(65, 200, 'Skeev', { fontFamily: 'myFont', fontSize: '16px', color: '#ffffff' }).setOrigin(0.5);

                  this.tweens.add({
                    targets: catMeow,
                    scaleX: 1.5,
                    scaleY: 1.5,
                    yoyo: true,
                    repeat: -1,
                    duration: 500
                });

                this.tweens.add({
                    targets: skeevTalk,
                    scaleX: 1.1,
                    scaleY: 1.1,
                    yoyo: true,
                    repeat: -1,
                    duration: 700
                });

                    this.exitKey = this.input.keyboard.addKey('ESC');
                    this.exitKey.on('down', () => {
                        this.sound.stopAll();
                        this.scene.start('homeScene')});

                    this.petsKey = this.input.keyboard.addKey('ONE');
                    this.petsKey.on('down', () => {
                        let reaction = Phaser.Math.Between(1, 5);

                        if (this.hungry.isPlaying) {
                            this.hungry.stop();
                        }

                        switch(reaction)
                            {
                                case 1: catMeow.setText('Hisss');
                                        this.hiss.play();
                                        this.time.delayedCall(1000, () => {
                                        this.scene.start('homeScene');
                                        });
                                break;

                                case 2: catMeow.setText('Spit');
                                this.spit.play();
                                this.time.delayedCall(1000, () => {
                                    this.scene.start('homeScene');
                                    });
                                break;

                                case 3: catMeow.setText('Growl');
                                this.growl.play();
                                this.time.delayedCall(1000, () => {
                                    this.scene.start('homeScene');
                                    });
                                break;

                                case 4: catMeow.setText('Merrr');
                                this.merr.play();
                                this.time.delayedCall(1000, () => {
                                    this.scene.start('homeScene');
                                    });
                                break;

                                case 5: catMeow.setText('Purr');
                                this.purr.play();
                                this.time.delayedCall(5000, () => {
                                    catMeow.setText('Meow');
                                    this.hungry.play({loop: true, volume: 0.2});
                                    });
                                break;
                            }
                        
                    });

                    this.foodKey = this.input.keyboard.addKey('TWO');
                    this.foodKey.on('down', () => {
                        if (this.hungry.isPlaying) {
                            this.hungry.stop();
                        }
                        catMeow.setText('Purr');
                        this.purr.play({loop: false});
                        this.time.delayedCall(5000, () => {
                            catMeow.setText('Meow');
                            this.hungry.play({loop: true, volume: 0.2});
                            });
                        
                        
                    });

                }

            update()
                {

                }









    }
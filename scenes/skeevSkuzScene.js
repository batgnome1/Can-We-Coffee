export default class SkeevSkuzScene extends Phaser.Scene 
    {
        constructor() 
            {
                super({key: 'skeevSkuzScene', active: false});
            }

            preload()
            {
                this.load.spritesheet('avatar', 'assets/sprite/avatar.png', { frameWidth: 32, frameHeight: 32});
                this.load.json('dialogueData', 'scenes/dialogue.json');
            }
        
        create()
            {
                let skeev = this.add.sprite(700, 450, 'avatar').setFrame(0);
                skeev.flipX = true;
                skeev.setScale(5);
    
                let skuz = this.add.sprite(70, 100, 'avatar').setFrame(1);
                skuz.setScale(5);
    
                this.add.text(700, 560, 'Skeev', { fontFamily: 'myFont', fontSize: '16px', color: '#ffffff' }).setOrigin(0.5);
                this.add.text(65, 200, 'Skuz', { fontFamily: 'myFont', fontSize: '16px', color: '#ffffff' }).setOrigin(0.5);

                const dialogue = this.cache.json.get('dialogueData');
                const skuzLines = dialogue.skeevSkuzScene.skuz;
                const skeevLines = dialogue.skeevSkuzScene.skeev;
                let skeevTalk = this.add.text(300, 485, skeevLines.text[0], { fontFamily: 'myFont', fontSize: '20px', color: '#ffffff' }).setOrigin(0.5);;
                let skuzTalk = this.add.text(360, 125, skuzLines.text[0], { fontFamily: 'myFont', fontSize: '20px', color: '#ffffff' }).setOrigin(0.5);


                let index = 1;


                    this.time.addEvent(
                        {
                            delay: 3000,
                            callback: conversation,
                            callbackScope: this,
                            loop: true
                        }
                    );



                function conversation()
                    {
                        
                            switch(index)
                        {
                        case 1: 
                            skuzTalk.setText(skuzLines.text[1]);
                            skeevTalk.setText(skeevLines.text[1]);
                            
                        break;

                        case 2: 
                            skuzTalk.setText(skuzLines.text[2]);
                            skeevTalk.setText('');
                            
                        break;

                        case 3: 
                            skuzTalk.setText(skuzLines.text[3]);
                            skeevTalk.setText(skeevLines.text[2]);
                            
                        break;

                        case 4: 
                            skuzTalk.setText(skuzLines.text[7]);
                            skeevTalk.setText('');
                            
                        break;

                        case 5: 
                            skuzTalk.setText(skuzLines.text[4]);
                            skeevTalk.setText('');
                            this.time.delayedCall(2000, () => {
                                this.scene.start('gameOver');
                            }), null, this
                            
                        break;
                        }
                    
                    index++;

                    } 

                this.tweens.add({
                    targets: [skeevTalk, skuzTalk],
                    scaleX: 1.1,
                    scaleY: 1.1,
                    yoyo: true,
                    repeat: -1,
                    duration: 700
                });


            }
    
        update()
            {
                
            }


    }



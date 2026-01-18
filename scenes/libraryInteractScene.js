import { persistentInventory } from './persistent.js';
import { endGame} from './functions.js';
export default class LibraryInteractScene extends Phaser.Scene
    {
        constructor() 
            {
                super({key: 'libraryInteractScene', active: false});

            }

        preload()
            {
                this.load.spritesheet('avatar', 'assets/sprite/avatar.png', { frameWidth: 32, frameHeight: 32});
                this.load.json('dialogueData', 'scenes/dialogue.json');

            }

        create()
            {
                let textSlotOne, textSlotTwo, textSlotThree;
                let skeev = this.add.sprite(700, 450, 'avatar').setFrame(0);
                skeev.flipX = true;
                skeev.setScale(5);

                let polyp = this.add.sprite(70, 100, 'avatar').setFrame(6);
                polyp.setScale(5);

                this.add.text(700, 560, 'Skeev', { fontFamily: 'myFont', fontSize: '16px', color: '#ffffff' }).setOrigin(0.5);
                this.add.text(65, 200, 'Polyp', { fontFamily: 'myFont', fontSize: '16px', color: '#ffffff' }).setOrigin(0.5);

                const currentSceneKey = 'libraryScene';
                const previousScene = 'libraryScene';
                const currentNPC = 'polyp';
                const dialogue = this.cache.json.get('dialogueData')[currentSceneKey][currentNPC];
                const startLines = dialogue.start;
                this.currentState = 'initial';

                let npcTalks = this.add.text(460, 125, startLines.text[0], { fontFamily: 'myFont', fontSize: '20px', color: '#ffffff' }).setOrigin(0.5);
                if (npcTalks.text == startLines.text[0])
                        {
                            this.time.delayedCall(3000, () => {
                                npcTalks.setText(startLines.text[1]);
                             textSlotOne = this.add.text(260, 225, '1. Yes', { fontFamily: 'myFont', fontSize: '16px', color: '#ffffff' }).setOrigin(0.5);
                             textSlotTwo = this.add.text(460, 225, '2. No', { fontFamily: 'myFont', fontSize: '16px', color: '#ffffff' }).setOrigin(0.5);
                             textSlotThree = this.add.text(660, 225, "", { fontFamily: 'myFont', fontSize: '16px', color: '#ffffff' }).setOrigin(0.5);
                                });
                        }

                        this.oneKey = this.input.keyboard.addKey('ONE');
                        this.oneKey.on('down', () => {
                            if (this.currentState === 'initial')
                            {
                                npcTalks.setText(startLines.text[2]);
                                textSlotOne.setText("1. " + startLines.topics[0].name);
                                textSlotTwo.setText("2. " + startLines.topics[1].name);
                                textSlotThree.setText("3. " + startLines.topics[2].name);
                                this.currentState = 'topicSelection';
                            }

                            else if (this.currentState === 'topicSelection')
                                    {
                                        npcTalks.setText(startLines.text[3]);
                                        textSlotOne.setText('1. ' + startLines.topics[0].options[0]);
                                        textSlotTwo.setText('2. ' + startLines.topics[0].options[1]);
                                        textSlotThree.setText('3. ' + startLines.topics[0].options[2]);
                                        this.currentState = 'optionSelection';
                                        this.topicChoice = 0;
                                    }

                            else if (this.currentState === 'optionSelection')
                                        {
                                            this.optionChoice = 0;
                                            npcTalks.setText(startLines.text[4]);
                                            textSlotOne.setText("");
                                            textSlotTwo.setText("");
                                            textSlotThree.setText("");
                                            persistentInventory.slotOne = startLines.topics[this.topicChoice].options[this.optionChoice];
                                            endGame(this, previousScene);
                                        }

                        });

                           this.twoKey = this.input.keyboard.addKey('TWO');
                           this.twoKey.on('down', () => {
                            if (textSlotOne.text == '1. Yes')
                                    {
                                        npcTalks.setText(startLines.text[5]);
                                        this.time.delayedCall(3000, () => {
                                            this.scene.start(currentSceneKey)
                                        })
                                    }
                            else if (this.currentState === 'topicSelection')
                                    {
                                        npcTalks.setText(startLines.text[3]);
                                        textSlotOne.setText('1. ' + startLines.topics[1].options[0]);
                                        textSlotTwo.setText('2. ' + startLines.topics[1].options[1]);
                                        textSlotThree.setText('3. ' + startLines.topics[1].options[2]);
                                        this.currentState = 'optionSelection';
                                        this.topicChoice = 1;
                                    }
                            else if (this.currentState === 'optionSelection')
                                {
                                    this.optionChoice = 1;
                                    npcTalks.setText(startLines.text[4]);
                                    textSlotOne.setText("");
                                    textSlotTwo.setText("");
                                    textSlotThree.setText("");
                                    persistentInventory.slotOne = startLines.topics[this.topicChoice].options[this.optionChoice];
                                    endGame(this, previousScene);
                                }

                              });


                              this.threeKey = this.input.keyboard.addKey('THREE');
                              this.threeKey.on('down', () => {

                               if (this.currentState === 'topicSelection')
                                       {
                                           npcTalks.setText(startLines.text[3]);
                                           textSlotOne.setText('1. ' + startLines.topics[2].options[0]);
                                           textSlotTwo.setText('2. ' + startLines.topics[2].options[1]);
                                           textSlotThree.setText('3. ' + startLines.topics[2].options[2]);
                                           this.currentState = 'optionSelection';
                                           this.topicChoice = 2;
                                       }
                               else if (this.currentState === 'optionSelection')
                                   {
                                       this.optionChoice = 2;
                                       npcTalks.setText(startLines.text[4]);
                                       textSlotOne.setText("");
                                       textSlotTwo.setText("");
                                       textSlotThree.setText("");
                                       persistentInventory.slotOne = startLines.topics[this.topicChoice].options[this.optionChoice];
                                       endGame(this, previousScene);
                                   }
   
                                 });


                           this.tweens.add({
                            targets: npcTalks,
                            scaleX: 1.1,
                            scaleY: 1.1,
                            yoyo: true,
                            repeat: -1,
                            duration: 700
                        });

                this.exitKey = this.input.keyboard.addKey('ESC');
                this.exitKey.on('down', () => this.scene.start('libraryScene'));


            }

        update()
            {

            }

    }
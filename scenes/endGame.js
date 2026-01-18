export default class EndGameScene extends Phaser.Scene 
    {
        constructor() 
            {
                super({key: 'endGame', active: false});
            }


        preload ()
            {

            }

        create ()
            {
                this.add.text(400, 200, 'ITS 3:00PM!', { fontFamily: 'myFont', fontSize: '32px', color: '#ffffff' }).setOrigin(0.5);
                this.add.text(400, 300, 'TIME TO HANG OUT', { fontFamily: 'myFont', fontSize: '32px', color: '#ffffff' }).setOrigin(0.5);
                this.add.text(400, 400, 'WITH SKUZ!!!', { fontFamily: 'myFont', fontSize: '32px', color: '#ffffff' }).setOrigin(0.5);

                this.time.delayedCall(5000, () => {
                this.scene.start('skeevSkuzScene');
            }, null, this);
            }

        update ()
            {

            }

        }
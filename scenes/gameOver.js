export default class gameOverScene extends Phaser.Scene 
    {
        constructor() 
            {
                super({key: 'gameOver', active: false});
            }


        preload ()
            {

            }

        create ()
            {
                this.add.text(400, 300, 'GAME OVER', { fontFamily: 'myFont', fontSize: '64px', color: '#ffffff' }).setOrigin(0.5);
                this.add.text(400, 500, 'Press E to return to Title Screen', { fontFamily: 'myFont', fontSize: '16px', color: '#ffffff' }).setOrigin(0.5);

                this.eKey = this.input.keyboard.addKey('E');
                this.eKey.on('down', () => location.reload());
            }

        update ()
            {

            }

        }
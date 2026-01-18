import {currentBattery, currentInventory} from "./functions.js";
export default class ui {

    constructor(scene) 
        {
            this.scene = scene;
            this.batteryLevel = currentBattery();
            this.r1 = this.scene.add.rectangle(1, 499, 799, 100, 'black');
            this.r1.setStrokeStyle(1, 0xFFFFFF);
            this.r1.setOrigin(0, 0);
            this.r1.setScrollFactor(0);
            this.r1.setDepth(2);
    
            this.battery = this.scene.add.text( 700, 520, 'Battery', { fontFamily: 'myFont', fontSize: '12px', color: '#ffffff' });
            this.battery.setScrollFactor(0);
            this.battery.setDepth(2);
    
            this.batteryLevelText = this.scene.add.text( 715, 550, '1000', { fontFamily: 'myFont', fontSize: '12px', color: '#ffffff' });

        this.batteryLevelText.setScrollFactor(0);
        this.batteryLevelText.setDepth(2);

        this.clock = this.scene.add.text( 600, 520, 'Clock', { fontFamily: 'myFont', fontSize: '12px', color: '#ffffff' });
        this.clock.setScrollFactor(0);
        this.clock.setDepth(2);

        this.clockTimeText = this.scene.add.text( 605, 550, '10:00', { fontFamily: 'myFont', fontSize: '12px', color: '#ffffff' });

             this.clockTimeText.setScrollFactor(0);
             this.clockTimeText.setDepth(2);

        this.r2 = this.scene.add.graphics();
        this.r2.lineStyle(1, 0xffffff, 1);
        this.r2.strokeRect(700, 540, 75, 45);
        this.r2.setScrollFactor(0);
        this.r2.setDepth(2);

        this.r3 = this.scene.add.graphics();
        this.r3.lineStyle(1, 0xffffff, 1);
        this.r3.strokeRect(600, 540, 75, 45);
        this.r3.setScrollFactor(0);
        this.r3.setDepth(2);  
        
        this.r4 = this.scene.add.graphics();
        this.r4.lineStyle(1, 0xffffff, 1);
        this.r4.strokeRect(200, 520, 375, 65);
        this.r4.setScrollFactor(0);
        this.r4.setDepth(2);
        
        this.r4a = this.scene.add.graphics();
        this.r4a.lineStyle(1, 0xffffff, 1);
        this.r4a.strokeRect(220, 540, 55, 35);
        this.r4a.setScrollFactor(0);
        this.r4a.setDepth(2);  

        this.bookTitleText = this.scene.add.text( 230, 530, 'Book', { fontFamily: 'myFont', fontSize: '8px', color: '#ffffff' });

        this.bookTitleText.setScrollFactor(0);
        this.bookTitleText.setDepth(2);

        this.bookText = this.scene.add.text( 230, 550, ' ', { fontFamily: 'myFont', fontSize: '8px', color: '#ffffff' });
        this.bookText.setScrollFactor(0);
        this.bookText.setDepth(2);

        this.r4b = this.scene.add.graphics();
        this.r4b.lineStyle(1, 0xffffff, 1);
        this.r4b.strokeRect(285, 540, 55, 35);
        this.r4b.setScrollFactor(0);
        this.r4b.setDepth(2);

        this.beansTitleText = this.scene.add.text( 295, 530, 'Beans', { fontFamily: 'myFont', fontSize: '8px', color: '#ffffff' });

        this.beansTitleText.setScrollFactor(0);
        this.beansTitleText.setDepth(2);

        this.beansText = this.scene.add.text( 295, 550, ' ', { fontFamily: 'myFont', fontSize: '8px', color: '#ffffff' });
        this.beansText.setScrollFactor(0);
        this.beansText.setDepth(2);

        this.r4c = this.scene.add.graphics();
        this.r4c.lineStyle(1, 0xffffff, 1);
        this.r4c.strokeRect(350, 540, 55, 35);
        this.r4c.setScrollFactor(0);
        this.r4c.setDepth(2);

        this.mugTitleText = this.scene.add.text( 365, 530, 'Mug', { fontFamily: 'myFont', fontSize: '8px', color: '#ffffff' });

        this.mugTitleText.setScrollFactor(0);
        this.mugTitleText.setDepth(2);

        this.mugText = this.scene.add.text( 360, 550, ' ', { fontFamily: 'myFont', fontSize: '8px', color: '#ffffff' });
        this.mugText.setScrollFactor(0);
        this.mugText.setDepth(2);
    
            this.avatar = this.scene.physics.add.sprite(50, 550, 'avatar').setFrame(0);
            this.avatar.setScrollFactor(0);
            this.avatar.setScale(2.5);
            this.avatar.setDepth(2);
        }

    update() 
        {
            this.batteryLevel = currentBattery(); 
            this.batteryLevelText.setText(this.batteryLevel.toFixed(0));
            this.inventory = currentInventory();
            this.bookText.setText(this.inventory.slotOne);
            this.beansText.setText(this.inventory.slotTwo);
            this.mugText.setText(this.inventory.slotThree);
        }

}


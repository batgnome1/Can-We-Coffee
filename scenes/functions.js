import { persistentBattery, persistentInventory } from './persistent.js';

export function toggleMusic(scene, volume = 0.5) {
    if (scene.loop.isPlaying) {
        scene.loop.stop();
    } else {
        scene.loop.play({ volume: volume, loop: true });
    }
}

export function driving (scene)
    {
        scene.player.setVelocity(0);
        let inMotion = false;
        if (!persistentBattery.batteryLevel <= 0){
            if (scene.input.keyboard.addKey('W').isDown) scene.player.setFrame(3), scene.player.setVelocityY(-300), drainBattery(scene, 0.1), inMotion = true;
            if (scene.input.keyboard.addKey('S').isDown) scene.player.setFrame(7), scene.player.setVelocityY(300), drainBattery(scene, 0.1), inMotion = true;
            if (scene.input.keyboard.addKey('A').isDown) scene.player.setFrame(1), scene.player.setVelocityX(-300), drainBattery(scene, 0.1), inMotion = true;
            if (scene.input.keyboard.addKey('D').isDown) scene.player.setFrame(5), scene.player.setVelocityX(300), drainBattery(scene, 0.1), inMotion = true;
        }

        if (!inMotion)
            {
                drainBattery(scene, 0.01);  
            }

        scene.ui.update();
    }

export function walking (scene)
    {
        scene.character.setVelocity(0);
        if (scene.input.keyboard.addKey('W').isDown)
                {
                    scene.character.setVelocityY(-100);
                    scene.character.anims.play('walkUp', true);
                } 
        else if (scene.input.keyboard.addKey('S').isDown) 
            {
                scene.character.setVelocityY(100);
                scene.character.anims.play('walkDown', true);
            }
        else if (scene.input.keyboard.addKey('A').isDown)
            {
                scene.character.setVelocityX(-100);
                scene.character.anims.play('walkLeft', true);
            } 
        else if (scene.input.keyboard.addKey('D').isDown) 
            {
                scene.character.setVelocityX(100);
                scene.character.anims.play('walkRight', true);
            }
        else 
            {
                scene.character.anims.stop();
                scene.character.setFrame(0); 
            }

    }

export function drainBattery(scene, amount)
    {
        persistentBattery.batteryLevel -= amount;
        if (persistentBattery.batteryLevel < 0) 
            {
                persistentBattery.batteryLevel = 0;
            }
        currentBattery(persistentBattery.batteryLevel);
    }

export function currentBattery()
    {
        return persistentBattery.batteryLevel;   
    }

export function currentInventory()
    {
        return persistentInventory;
    }

export function endGame(scene, previousScene)
    {
        if (persistentInventory.slotThree != 'Empty' && persistentInventory.slotTwo != 'Empty' && persistentInventory.slotOne != 'Empty')
             {
                 scene.scene.start('endGame')
             }
         else 
             {
                 scene.time.delayedCall(3000, () => {
                     scene.scene.start(previousScene)
                 })
             }
    }
        
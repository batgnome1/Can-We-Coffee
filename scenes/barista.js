
export function barista(scene)
    {
        switch(scene.barista.custom_state)
            {
                case 'walk': 
                    if (scene.barista.custom_state_timer > 0 )

                            {
                                scene.barista.custom_state_timer--;
                            }

                    else 
                            {
                                scene.barista.custom_state_timer = 30 * 5;
                                        scene.barista.setVelocity(0, 0); 
                                            let direction = Phaser.Math.Between(1, 4);
                                                    
                                                switch (direction) {
                                                    case 1: // Left
                                                        scene.barista.setVelocityX(-scene.walk);
                                                        scene.barista.anims.play('baristaWalkLeft', true);
                                                            break;
                                                    case 2: // Right
                                                        scene.barista.setVelocityX(scene.walk);
                                                        scene.barista.anims.play('baristaWalkRight', true);
                                                            break;
                                                    case 3: // Up
                                                        scene.barista.setVelocityY(-scene.walk);
                                                        scene.barista.anims.play('baristaWalkUp', true);
                                                            break;
                                                    case 4: // Down
                                                        scene.barista.setVelocityY(scene.walk);
                                                        scene.barista.anims.play('baristaWalkDown', true);
                                                            break;
                                                            }
                                }
                                break;

                case 'idle':
                    scene.barista.setVelocity(0, 0);
                    scene.barista.anims.stop(); 
                        if (scene.barista.custom_state_timer > 0) 
                            {
                                scene.barista.custom_state_timer--;
                            }
                        else 
                            {
                                scene.barista.custom_state_timer = 30 * 5;
                                if (Phaser.Math.Between(1, 3) == 1) {
                                    scene.barista.setFrame(0);
                                    } 
                                else if (Phaser.Math.Between(1, 3) == 2) {
                                    scene.barista.setFrame(1);
                                    } 
                                else {
                                        scene.barista.setFrame(3);
                                        }
                                            }
                                            break;
            }

            if (scene.barista.custom_state_timer == 0)
                    {
                        switchMode(scene);
                    }
        }

        function switchMode(scene)
        {
            switch (Phaser.Math.Between(1, 2)) {
                case 1:
                    scene.barista.custom_state = 'walk';
                        break;

                case 2:
                    scene.barista.custom_state = 'idle';
                        break;
                }
        }
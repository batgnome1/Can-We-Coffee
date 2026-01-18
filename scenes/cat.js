export function cat (scene)
    {
        switch (scene.cat.custom_state)
            {
                case 'wander':
                    if (scene.cat.custom_state_timer > 0) {
                        scene.cat.custom_state_timer--;
                        } else {
                            scene.cat.custom_state_timer = 30 * 5;
                            scene.cat.setVelocity(0, 0); 
                                let direction = Phaser.Math.Between(1, 4);
                                                            
                                    switch (direction) {
                                        case 1: // Left
                                                scene.cat.setVelocityX(-scene.catWalk);
                                                scene.cat.anims.play('catWalkLeft', true);
                                        break;
                                        case 2: // Right
                                                scene.cat.setVelocityX(scene.catWalk);
                                                scene.cat.anims.play('catWalkRight', true);
                                        break;
                                        case 3: // Up
                                                scene.cat.setVelocityY(-scene.catWalk);
                                                scene.cat.anims.play('catWalkUp', true);
                                        break;
                                        case 4: // Down
                                                scene.cat.setVelocityY(scene.catWalk);
                                                scene.cat.anims.play('catWalkDown', true);
                                            break;
                                                        }
                                    }
                                    break;
        
                case 'nap':
                    scene.cat.setVelocity(0, 0);
                    scene.cat.anims.stop(); 
                        if (scene.cat.custom_state_timer > 0) 
                                {
                                    scene.cat.custom_state_timer--;
                                }
                        else 
                                {
                                    scene.cat.custom_state_timer = 30 * 10;
                                        if (Phaser.Math.Between(1, 2) == 1) 
                                                {
                                                    scene.cat.setFrame(15);
                                                } 
                                        else 
                                                {
                                                    scene.cat.setFrame(63);
                                                }
                                }
                                break;
        
                case 'zoomies':
                    if (scene.cat.custom_state_timer > 0) 
                            {
                                scene.cat.custom_state_timer--;
                            } 
                    else 
                            {
                                scene.cat.custom_state_timer = 30 * 5;
                                scene.cat.setVelocity(0, 0); 
                                let direction = Phaser.Math.Between(1, 4);
                                                            
                                    switch (direction) 
                                    
                                    {
                                        case 1: // Left
                                                scene.cat.setVelocityX(-scene.zoomies);
                                                scene.cat.anims.play('catWalkLeft', true);
                                        break;
                                        case 2: // Right
                                                scene.cat.setVelocityX(scene.zoomies);
                                                scene.cat.anims.play('catWalkRight', true);
                                        break;
                                        case 3: // Up
                                                scene.cat.setVelocityY(-scene.zoomies);
                                                scene.cat.anims.play('catWalkUp', true);
                                        break;
                                        case 4: // Down
                                                scene.cat.setVelocityY(scene.zoomies);
                                                scene.cat.anims.play('catWalkDown', true);
                                        break;
                                    }
                            }
                            break;
                                                                
            }
                                            
                if (scene.cat.custom_state_timer == 0)
                        {
                            switchCatMode(scene);
                        }

        function switchCatMode(scene)
            {
                switch (Phaser.Math.Between(1, 3)) {
                    case 1:
                            scene.cat.custom_state = 'wander';
                    break;
                    case 2:
                            scene.cat.custom_state = 'zoomies';
                    break;
                    case 3:
                            scene.cat.custom_state = 'nap';
                    break;
                            }
                console.log(scene.cat.custom_state);
            }
    }
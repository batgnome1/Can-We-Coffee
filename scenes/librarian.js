

export function librarian (scene)
        {
            switch (scene.librarian.custom_state)
                        {
                            case 'wander':
                                if (scene.librarian.custom_state_timer > 0) {
                                    scene.librarian.custom_state_timer--;
                                    } else {
                                        scene.librarian.custom_state_timer = 30 * 5;
                                        scene.librarian.setVelocity(0, 0); 
                                            let direction = Phaser.Math.Between(1, 4);
                                                    
                                                switch (direction) {
                                                    case 1: // Left
                                                        scene.librarian.setVelocityX(-scene.walk);
                                                        scene.librarian.anims.play('librarianWalkLeft', true);
                                                            break;
                                                    case 2: // Right
                                                        scene.librarian.setVelocityX(scene.walk);
                                                        scene.librarian.anims.play('librarianWalkRight', true);
                                                            break;
                                                    case 3: // Up
                                                        scene.librarian.setVelocityY(-scene.walk);
                                                        scene.librarian.anims.play('librarianWalkUp', true);
                                                            break;
                                                    case 4: // Down
                                                        scene.librarian.setVelocityY(scene.walk);
                                                        scene.librarian.anims.play('librarianWalkDown', true);
                                                            break;
                                                            }
                                        }
                                        break;

                            case 'idle':
                                scene.librarian.setVelocity(0, 0);
                                scene.librarian.anims.stop(); 
                                    if (scene.librarian.custom_state_timer > 0) 
                                        {
                                            scene.librarian.custom_state_timer--;
                                        }
                                    else 
                                        {
                                            scene.librarian.custom_state_timer = 30 * 10;
                                            if (Phaser.Math.Between(1, 3) == 1) {
                                                scene.librarian.setFrame(0);
                                            } 
                                            else if (Phaser.Math.Between(1, 3) == 2) {
                                                scene.librarian.setFrame(1);
                                            } 
                                            else {
                                                        scene.librarian.setFrame(3);
                                                    }
                                        }
                                        break;

                            case 'meander':
                                if (scene.librarian.custom_state_timer > 0) {
                                        scene.librarian.custom_state_timer--;
                                } else {
                                            scene.librarian.custom_state_timer = 30 * 5;
                                            scene.librarian.setVelocity(0, 0); 
                                            let direction = Phaser.Math.Between(1, 4);
                                                    
                                                switch (direction) {
                                                    case 1: // Left
                                                        scene.librarian.setVelocityX(-scene.walkSlow);
                                                        scene.librarian.anims.play('librarianWalkLeft', true);
                                                        break;
                                                    case 2: // Right
                                                        scene.librarian.setVelocityX(scene.walkSlow);
                                                        scene.librarian.anims.play('librarianWalkRight', true);
                                                        break;
                                                    case 3: // Up
                                                        scene.librarian.setVelocityY(-scene.walkSlow);
                                                        scene.librarian.anims.play('librarianWalkUp', true);
                                                        break;
                                                    case 4: // Down
                                                        scene.librarian.setVelocityY(scene.walkSlow);
                                                        scene.librarian.anims.play('librarianWalkDown', true);
                                                        break;
                                                            }
                                        }
                                        break;
                                                        
                            }
                                    
                            if (scene.librarian.custom_state_timer == 0)
                                    {
                                        switchMode(scene);
                                    }

                                }     
    
function switchMode(scene)
        {
            switch (Phaser.Math.Between(1, 3)) {
                case 1:
                    scene.librarian.custom_state = 'wander';
                        break;
                case 2:
                    scene.librarian.custom_state = 'meander';
                        break;
                case 3:
                    scene.librarian.custom_state = 'idle';
                        break;
                }
            console.log(scene.librarian.custom_state);
        }
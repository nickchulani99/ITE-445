var playState = {
    
    create: function(){
        
        //Add background
        tilesprite = game.add.tileSprite(0, 0, 360, 640, 'skyfield1');
        
       
        //Add player
        
        this.player = game.add.sprite(game.width/2, game.height/2 ,'player');
        this.player.anchor.setTo(0.5, 0.5);

        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 200;
        
        //Created the Wall
        
        var leftWall = game.add.sprite(0, 0);
        var rightWall = game.add.sprite(360, 0);
        
        game.physics.arcade.enable(leftWall);
        leftWall.body.immovable = true;
        
        game.physics.arcade.enable(rightWall);
        rightWall.body.immovable = true;
        

        this.cursor = game.input.keyboard.createCursorKeys();
        
        // Display the score
        this.scoreLabel = game.add.text(30, 30, 'score: 0',{ font: '18px Arial', fill: '#ffffff' });
        
        // Initialize the score variable
        this.score = 0;
        
        this.ground = game.add.sprite(0, 515 ,'ground');
        this.ground.scale.setTo(2, 1);
        this.ground.anchor.setTo(0, 0);
        game.physics.arcade.enable(this.ground);
        this.ground.body.immovable = true;
        this.ground.alpha = 0;
        
        this.wall1 = game.add.sprite(-10,0, 'wall');
        this.wall1.scale.setTo(1,2);
        
        },
    
        
    
    
    update: function(){
        game.physics.arcade.collide(this.player, this.ground);
        this.moveBackground();
        this.movePlayer();
        
        if(!this.player.inWorld){
            this.playerDie();
        }
    
    },
    
    playerDie: function() {
            game.state.start('menu');
        
    },
    
    moveBackground: function(){
              if (this.cursor.left.isDown)    {
            tilesprite.tilePosition.x += 1;
            }

            else if (this.cursor.right.isDown) {
            tilesprite.tilePosition.x -= 1;
            }
        
        
    },
    
    
    movePlayer: function() {

			if (this.cursor.left.isDown) {
				this.player.body.velocity.x = -200;
                this.player.animations.play('left'); //Left animation
			}

			else if (this.cursor.right.isDown) {
				this.player.body.velocity.x = 200;
                this.player.animations.play('right'); //Right animation
			}

			else {
				this.player.body.velocity.x = 0;
                
                
			}

			if (this.cursor.up.isDown && this.player.body.touching.down){
				this.player.body.velocity.y = -320;
			}
    },
}
var playState = {

	create: function(){
		game.add.image(0,0,'background');



		//player
		this.player = game.add.sprite(game.width/1.5, game.height/1.5, 'player');
		this.player.anchor.setTo(0.5, 0.5);
		game.physics.arcade.enable(this.player);
		




		//player control
		this.cursor = game.input.keyboard.createCursorKeys();

		//walls
		this.walls = game.add.group();
		this.walls.enableBody = true;
		

		


		
		

		this.scoreLabel = game.add.text(30, 30, 'score: 0',
			{font: '18px Arial', fill: '#ffffff'});
		game.global.score = 0;

	





this.fruit = game.add.group();
		this.fruit.enableBody = true;
		//create 10 enemies
		this.fruit.createMultiple(1, 'fruit');
		//call add enemy every 2.2 second
		this.time.events.loop(2200, this.fruitFromTop, this);









		//sound
		this.jumpSound = game.add.audio('jump');
		this.coinSound = game.add.audio('coin');
		this.deadSound = game.add.audio('dead');

		//animation
		this.player.animations.add('right',[1,2],8,true);
		//left anim
		this.player.animations.add('left',[3,4],8,true);


		
	},

	update: function(){
		//player
		game.physics.arcade.collide(this.player, this.walls);
		this.movePlayer();
		if (!this.player.inWorld){
			this.playerDie();
		}

		//coin
		game.physics.arcade.overlap(this.player, this.fruit, this.takefruit, null, this);

		//enemies
		game.physics.arcade.collide(this.fruit, this.walls);
		game.physics.arcade.overlap(this.player, this.fruit, this.playerDie, null, this);

		if(!this.player.alive){
			return;
		}
	},

	movePlayer: function(){
		if (this.cursor.left.isDown){

			this.player.body.velocity.x = -200;
			this.player.animations.play('left');
		}
		else if (this.cursor.right.isDown){
			this.player.body.velocity.x = 200;
			this.player.animations.play('right');
			
		}
		else {

			this.player.body.velocity.x = 0;
			this.player.animations.stop();//stop anim
			this.player.frame=0;//stand still
		}

		if (this.cursor.up.isDown && this.player.body.touching.down){
			this.jumpSound.play();
			this.player.body.velocity.y = -320;
		}
	}
	
	,
	startMenu: function(){
		game.state.start('menu');
	},

	playerDie: function(){
		this.player.kill();
		this.deadSound.play();

		
		
	
	
	 game.camera.shake(0.02,300);


	},

	

	takefruit: function(player, fruit){
		// this.coin.kill();
		this.fruit.scale.setTo(0,0);
		game.add.tween(this.fruit.scale).to({x:1,y:1},1000).start();
		game.add.tween(this.player.scale).to({x:1.3,y:1.3},100).yoyo(true).start();
		game.global.score += 5;
		this.scoreLabel.text = 'score: ' + game.global.score;
		
		this.coinSound.play();
	},

fruitFromTop: function() {
		//get 1st dead enemy of group
		var fruit = this.fruit.getFirstDead();
		//do nothing if no enemy
		if (!fruit) {
			return;
		}

		
		fruit.anchor.setTo(0.5, 1);
		fruit.reset(game.width/2, 0);
		//add gravity
		fruit.body.gravity.y = 500;
		fruit.body.velocity.x = 100 * game.rnd.pick([-1, 1]);
		
		fruit.body.bounce.x = 1;
		fruit.checkWorldBounds = true;
		fruit.outOfBoundsKill = true;
	},


	
};